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
  leaguesService: LeaugesService = inject(LeaugesService);
  tour: Tournament | undefined;
  constructor(private router: Router) {}

  async ngOnInit(): Promise<void> {
    const currentUrl = this.router.url;

    const urlArray: string[] = currentUrl.split('/').filter((el) => el !== '');

    await this.loadTournament(urlArray[1]);
  }
  async loadTournament(id: string) {
    (await this.leaguesService.getTournamentById(id)).subscribe((res) => {
      this.tour = res;
    });
  }
}
