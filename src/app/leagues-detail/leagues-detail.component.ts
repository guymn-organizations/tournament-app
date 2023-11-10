import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Match } from '../model/match';
import { Team } from '../model/team';
import { Tournament } from '../model/tournament';
import { NavbarComponent } from '../navbar/navbar.component';
import { LeaugesService } from '../service/leauges.service';
import { TeamService } from '../service/team.service';
import { TournamentService } from '../service/tournament.service';

@Component({
  selector: 'app-leagues-detail',
  templateUrl: './leagues-detail.component.html',
  styleUrls: ['./leagues-detail.component.css'],
})
export class LeaguesDetailComponent {
  checked_tab: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teamService: TeamService
  ) {}
  async ngOnInit(): Promise<void> {
    this.click();
  }

  click() {
    const currentUrl = this.router.url;
    const urlArray: string[] = currentUrl.split('/').filter((el) => el !== '');
    this.checked_tab = urlArray[2];
  }

  checkTab(tab: string): boolean {
    this.click();
    return tab == this.checked_tab;
  }
}
