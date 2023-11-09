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
  styleUrls: ['./leauges.component.css', '../scrims/scrims.component.css'],
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
    this.loadTournament();
  }

  filterTourList(text: string) {
    if (!text) {
      this.allTournamentFilter = this.allTournament;
    }

    this.allTournamentFilter = this.allTournament.filter((tour) =>
      tour.name?.toLowerCase().includes(text.toLowerCase())
    );
  }

  async loadTournament() {
    (
      await this.leaugesService.getAllTournament(this.pageIndex, this.pageSize)
    ).subscribe(
      (res) => {
        console.log(res);

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
