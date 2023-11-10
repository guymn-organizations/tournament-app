import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Match } from '../model/match';
import { Team } from '../model/team';
import { Tournament } from '../model/tournament';
import { NavbarComponent } from '../navbar/navbar.component';
import { LeaugesService } from '../service/leauges.service';
import { TeamService } from '../service/team.service';
import { TournamentService } from '../service/tournament.service';

@Component({
  selector: 'app-leagues-overview',
  templateUrl: './leagues-overview.component.html',
  styleUrls: ['./leagues-overview.component.css'],
})
export class LeaguesOverviewComponent implements OnInit {
  leaugesService: LeaugesService = inject(LeaugesService);
  nav: NavbarComponent = inject(NavbarComponent);
  tournament: Tournament | undefined;
  imageTournamrnt: string = '';

  check_date: string = '';
  checked_id: string = '';
  teamsInTour!: Team[];
  matches!: Match[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teamService: TeamService,
    private tournamentService: TournamentService
  ) {
    const currentUrl = this.router.url;

    const urlArray: string[] = currentUrl.split('/').filter((el) => el !== '');

  
  }

  async ngOnInit(): Promise<void> {
    const currentUrl = this.router.url;

    const urlArray: string[] = currentUrl.split('/').filter((el) => el !== '');

    this.checked_id=urlArray[1];
    await this.loadTournament(urlArray[1]);
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


  showalert() {
    alert('full team');
  }

  addTeamToTournament(): void {
    const tournamentId = localStorage.getItem('tournament') as string;
    const teamId = localStorage.getItem('team') as string;
    this.tournamentService.addTeamToTournament(tournamentId, teamId).subscribe(
      response => {
        console.log('Team added to tournament successfully', response);
        // Handle success, update UI, etc.
        alert('Team added to tournament successfully');
      },
      error => {
        console.error('Failed to add team to tournament', error);
        // Handle error, show error message, etc.
        if (error.status === 404) {
          alert('Tournament or team not found.');
        } else if (error.status === 400 && error.error.includes('Team is already part of the tournament.')) {
          alert('Team is already part of the tournament.');
        } else if (error.status === 400 && error.error.includes('Team must have at least 5 players to join the tournament.')) {
          alert('Team must have at least 5 players to join the tournament.');
        } else {
          alert('Failed to add team to tournament. Please try again later.');
        }
      }
    );
  }
  
}
