import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tournament } from '../model/tournament';
import { LeaugesService } from '../service/leauges.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { TeamService } from '../service/team.service';
import { Team } from '../model/team';
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
  checked_id: string = '';
  check_date: string = '';

  isOverview: boolean = true;
  isMatching: boolean = false;
  isTeamJoin: boolean = false;
  teamsInTour!: Team[];
  matches!: Match[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teamService: TeamService,
    private tournamentService: LeaugesService
  ) {}

  async ngOnInit() {
    let data = localStorage.getItem('isOverview');
    this.isOverview = data == 'true';

    this.route.paramMap.subscribe(async (params) => {
      const id = params.get('id');
      this.checked_id = id as string;

      const date = params.get('startDateMatch');
      this.check_date = date as string;
      await this.loadTournament(id as string);
      await this.AllTeamInTournament(this.checked_id);
      await this.getMatchesForTournament(this.checked_id);
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

  async confirmTeamJoin() {
    // if(this.teamsInTour.length){
    try {
      const tourid = this.checked_id;
      const teamId = localStorage.getItem('team') as string;

      const team: Team | undefined = await (
        await this.teamService.getTeamById(teamId)
      ).toPromise();

      if (team) {
        const response = await (
          await this.tournamentService.addTeamToTournament(tourid, teamId, team)
        ).toPromise();

        console.log('Success:', response);
      } else {
        console.error('Team not found');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    // }
  }

  async AllTeamInTournament(tournamentId: string) {
    (
      await this.tournamentService.getAllTeamInTournament(tournamentId)
    ).subscribe(
      async (data: any[]) => {
        this.teamsInTour = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  showalert() {
    alert('full team');
  }

  async getMatchesForTournament(tournamentId: string): Promise<void> {
    (
      await this.tournamentService.getAllMatchesForTournament(tournamentId)
    ).subscribe((matches) => (this.matches = matches));
  }
}
