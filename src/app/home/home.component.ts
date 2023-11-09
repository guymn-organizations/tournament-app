import { Component, OnInit, inject } from '@angular/core';
import { AdvertService } from '../service/advert.service';
import { Advert } from '../model/advert';
import { Tournament } from '../model/tournament';
import { NavbarComponent } from '../navbar/navbar.component';

import { LeaugesService } from '../service/leauges.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  featuredTournament: Tournament | undefined;

  nav: NavbarComponent = inject(NavbarComponent);

  allTournament: undefined | Tournament[];
  trendyTournament: Tournament | undefined;
  image: string | undefined; //trendyimage

  adverts: Advert[] = [];

  constructor(
    private advertService: AdvertService,
    private tournament: LeaugesService
  ) {}

  async ngOnInit(): Promise<void> {
    (await this.tournament.getAllTournament(0, 15)).subscribe(
      async (tournaments) => {
        this.allTournament = tournaments;

        this.trendyTournament = this.gettrendytour();
        await this.setImage();
      }
    );

    this.advertService.getAllAdvert().subscribe(
      (adverts: Advert[]) => {
        this.adverts = adverts;
      },
      (error) => {
        console.error('Error fetching featured adverts:', error);
      }
    );
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
