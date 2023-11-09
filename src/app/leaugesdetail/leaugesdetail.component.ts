import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tournament } from '../model/tournament';
import { LeaugesService } from '../service/leauges.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { TeamService } from '../service/team.service';
import { Team } from '../model/team';
import { TeamInTournament } from '../model/team-in-tournament';
import { Match } from '../model/match';

@Component({
  selector: 'app-leaugesdetail',
  templateUrl: './leaugesdetail.component.html',
  styleUrls: ['./leaugesdetail.component.css'],
})
export class LeaugesdetailComponent implements OnInit {
  leaugesService: LeaugesService = inject(LeaugesService);
  nav: NavbarComponent = inject(NavbarComponent);
  tournament: Tournament | undefined;
  imageTournamrnt: string = '';

  isOverview: boolean = true;
  isMatching: boolean = false;
  isTeamJoin: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router) {}

  async ngOnInit() {
    let data = localStorage.getItem('isOverview');
    this.isOverview = data == 'true';
    
    
    this.route.paramMap.subscribe(async (params) => {
      const id = params.get('id');
      await this.loadTournament(id as string);
    });
  }

  async loadTournament(id: string) {
    (await this.leaugesService.getTournamentById(id)).subscribe(async (res) => {
      await this.setTournament(res);
      await this.setImage(res);
    });
  }

  async setTournament(tour: Tournament) {
    this.tournament = tour;
  }

  async setImage(tour: Tournament) {
    if (!tour.imageTourUrl) {
      return;
    }
    (await this.nav.service.getImage(tour.imageTourUrl)).subscribe(
      (res) => {},
      (err) => {
        if (err.status == 200) {
          this.imageTournamrnt = err.error.text;
        }
      }
    );
  }

  showTeamjoin() {
    this.isOverview = false;
    this.isMatching = false;
    this.isTeamJoin = true;
  }
  
  showOverview() {
    this.isOverview = true;
    this.isMatching = false;
    this.isTeamJoin = false;
  }
  
  showMatching() {
    this.isOverview = false;
    this.isMatching = true;
    this.isTeamJoin = false;
  }
}
