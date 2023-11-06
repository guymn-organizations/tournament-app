import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tournament } from '../model/tournament';
import { LeaugesService } from '../service/leauges.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-leaugesdetail',
  templateUrl: './leaugesdetail.component.html',
  styleUrls: ['./leaugesdetail.component.css'],
})
export class LeaugesdetailComponent implements OnInit {
  tournamentService: LeaugesService = inject(LeaugesService);
  nav: NavbarComponent = inject(NavbarComponent);
  checkTab: string = '';
  checked_id: string = '';
  tournament: Tournament | undefined;
  image: string | undefined;

  isOverview: boolean = true;

  touritems: any[] = Array(10).fill({});

  constructor(private route: ActivatedRoute, private router: Router) {
    this.ngOnInit();
  }

  async ngOnInit() {
    let data = localStorage.getItem('isOverview');
    this.isOverview = data == 'true';

    this.checkTab = this.router.url;
    this.route.paramMap.subscribe(async (params) => {
      const id = params.get('id');
      this.checked_id = id as string;
      await this.setImage();
      await this.setTournament();
    });
  }

  async setTournament() {
    (await this.tournamentService.getTournamentById(this.checked_id)).subscribe(
      async (res) => {
        this.tournament = res;

        console.log(res);
      }
    );
  }

  async setImage() {
    if (!this.tournament) {
      return;
    }
   
    (
      await this.nav.service.getImage(this.tournament.imageTourUrl as string)
    ).subscribe(
      (res) => {},
      (error) => {
        console.log('error');
      }
    );
  }

  showTeamjoin() {
    localStorage.setItem('isOverview', 'false');
    this.isOverview = false;
  }

  showOverview() {
    localStorage.setItem('isOverview', 'true');
    this.isOverview = true;
  }
}
