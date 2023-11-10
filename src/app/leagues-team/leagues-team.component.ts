import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Match } from '../model/match';
import { Team } from '../model/team';
import { Tournament } from '../model/tournament';
import { NavbarComponent } from '../navbar/navbar.component';
import { LeaugesService } from '../service/leauges.service';
import { TeamService } from '../service/team.service';

@Component({
  selector: 'app-leagues-team',
  templateUrl: './leagues-team.component.html',
  styleUrls: ['./leagues-team.component.css'],
})
export class LeaguesTeamComponent implements OnInit {
  leaugesService: LeaugesService = inject(LeaugesService);
  nav: NavbarComponent = inject(NavbarComponent);
  tournament: Tournament | undefined;
  imageTournamrnt: string = '';
  checked_id: string = '';
  check_date: string = '';

  teamsInTour!: Team[];
  matches!: Match[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teamService: TeamService,
    private tournamentService: LeaugesService
  ) {
    const currentUrl = this.router.url;

    const urlArray: string[] = currentUrl.split('/').filter((el) => el !== '');

    console.log(urlArray[1]);
  }

  async ngOnInit(): Promise<void> {
    const currentUrl = this.router.url;

    const urlArray: string[] = currentUrl.split('/').filter((el) => el !== '');

    
    await this.AllTeamInTournament(urlArray[1]);
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


}
