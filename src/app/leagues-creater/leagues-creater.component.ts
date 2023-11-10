import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MatchService } from '../service/match.service';
import { LeaugesService } from '../service/leauges.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Tournament } from '../model/tournament';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../service/team.service';
import { TournamentService } from '../service/tournament.service';

@Component({
  selector: 'app-leagues-creater',
  templateUrl: './leagues-creater.component.html',
  styleUrls: ['./leagues-creater.component.css'],
})
export class LeaguesCreaterComponent {
  leaugesService: LeaugesService = inject(LeaugesService);
  nav: NavbarComponent = inject(NavbarComponent);
  tournament: Tournament | undefined;
  imageTournamrnt: string = '';

  check_date: string = '';
  checked_id: string = '';

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

    this.checked_id = urlArray[1];
    await this.loadTournament(urlArray[1]);
  }
  async loadTournament(id: string) {
    (await this.leaugesService.getTournamentById(id)).subscribe(async (res) => {
      // await this.setTournament(res);
    });
  }
}
