import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Tournament } from '../model/tournament';
import { LeaugesService } from '../service/leauges.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leauges',
  templateUrl: './leauges.component.html',
  styleUrls: [
    './leauges.component.css',
    '../scrims/scrims.component.css',
    '../tournament/tournament.component.css',
  ],
})
export class LeaugesComponent implements OnInit {
  title: string = 'Leauges';
  discription: string = 'All tournament';

  @ViewChild('TourContenter', { static: false })
  public messageProfileElement: ElementRef | undefined;

  nav: NavbarComponent = inject(NavbarComponent);
  leaugesService: LeaugesService = inject(LeaugesService);

  private pageIndex: number = 0;
  public pageSize: number = 5;
  public pageTotal: number = 5;
  public loadding: boolean = false;

  allTournament: Tournament[] = [];
  allTournamentFilter: Tournament[] = [];
  images: string[] = [];

  constructor(private tournament: LeaugesService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    await this.loadTournament();
  }

  filterTourList(text: string) {
    if (!text) {
      this.allTournamentFilter = this.allTournament;
    }

    this.allTournamentFilter = this.allTournament.filter((tour) =>
      tour.name?.toLowerCase().includes(text.toLowerCase())
    );
  }

  async setImages() {
    for (
      let index = this.pageIndex * this.pageSize;
      index < this.allTournament.length;
      index++
    ) {
      if (this.allTournament[index].imageTourUrl) {
        (
          await this.nav.service.getImage(
            this.allTournament[index].imageTourUrl as string
          )
        ).subscribe(
          (res) => {},
          (result) => {
            if (result.status == 200) {
              this.images[index] = result.error.text;
            }
          }
        );
      }
    }
  }

  async setAllTournament(tours: Tournament[]) {
    this.allTournament = [...this.allTournament, ...tours];
  }

  async loadTournament() {
    this.loadding = true;
    (
      await this.leaugesService.getAllTournament(this.pageIndex, this.pageSize)
    ).subscribe(
      async (res) => {
        await this.setAllTournament(res);
        await this.setImages();
        this.pageTotal = res.length;
        this.pageIndex++;
        this.loadding = false;
        this.allTournamentFilter = this.allTournament;
      },
      (err) => {
        this.pageTotal = -1;
      }
    );
  }

  @HostListener('scroll', ['$event'])
  async onScrollTourContenter(): Promise<void> {
    const nativeElement = this.messageProfileElement?.nativeElement;

    if (
      nativeElement.clientHeight + Math.round(nativeElement.scrollTop) >=
        nativeElement.scrollHeight - 10 &&
      !this.loadding
    ) {
      await this.loadTournament();
    }
  }

  goCreate() {
    this.router.navigate(['createtournament']);
  }
}
