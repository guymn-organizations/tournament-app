import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { AdvertService } from '../service/advert.service';
import { Advert } from '../model/advert';
import { Tournament } from '../model/tournament';
import { NavbarComponent } from '../navbar/navbar.component';

import { LeaugesService } from '../service/leauges.service';
import { async } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  
  @ViewChild('AdvertContenter', { static: false })
  nav: NavbarComponent = inject(NavbarComponent);
  public messageProfileElement: ElementRef | undefined;
  public totalCount = 0;
  public pageIndex = 0;
  public pageSize = 10;
  loading: boolean = false;

  allTournament: undefined | Tournament[];
  trendyTournament: Tournament | undefined;

  image: string | undefined; //trendyimage

  adverts: Advert[] = [];

  constructor(
    private advertService: AdvertService,
    private tournament: LeaugesService
  ) {}

  async ngOnInit(): Promise<void> {
    (await this.tournament.getAllTournament()).subscribe(
      async (tournaments) => {
        this.allTournament = tournaments;

        this.trendyTournament = this.gettrendytour();
        await this.setImage();
      }
    );

    await this.fetchAdverts();
    await this.loadAdverts();
  }

  async fetchAdverts(): Promise<void> {
    try {
      const pageIndex = this.pageIndex; // Set your desired pageIndex
      const pageSize = this.pageSize; // Set your desired pageSize

      const adverts = await (
        await this.advertService.getAllAdvert(pageIndex, pageSize)
      ).toPromise();
      this.adverts = adverts || [];
      console.log(adverts);
    } catch (error) {
      // Handle errors here, e.g., display an error message.
      console.error('Error fetching adverts:', error);
      this.adverts = [];
    }
  }

  @HostListener('scroll', ['$event'])
  async onScrollScrimsContenter(): Promise<void> {
    const nativeElement = this.messageProfileElement?.nativeElement;

    if (
      nativeElement.clientHeight + Math.round(nativeElement.scrollTop) ===
      nativeElement.scrollHeight
    ) {
      // await this.loadTeamScrims();
    }
  }

  async loadAdverts() {
    this.loading = true;

    (
      await this.nav.advertService.getAllAdvert(
        this.pageIndex,
        this.pageSize
      )
      ).subscribe(async(data)=>{
        await this.fetchAdverts();
        this.loading=false;
      })
    
  }

  gettrendytour(): Tournament | undefined {
    if (!this.allTournament) {
      return undefined;
    }

    // เรียงลำดับรางวัลจากมากไปน้อย
    const sortedTournaments = this.allTournament.sort((a, b) => {
      if (a.reward === undefined) return 1; // Place undefined values at the end
      if (b.reward === undefined) return -1; // Place undefined values at the end
      return b.reward - a.reward;
    });

    // คืนรายการที่มีรางวัลมากที่สุด (อันดับแรกในอาร์เรย์)
    return sortedTournaments[0];
  }

  //trendy image
  async setImage() {
    if (!this.trendyTournament) {
      return;
    }

    (
      await this.nav.service.getImage(
        this.trendyTournament.imageTourUrl as string
      )
    ).subscribe(
      (res) => {},
      (error) => {
        console.log(error);
        this.image = error.error.text;
      }
    );
  }
}
