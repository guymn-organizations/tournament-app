import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Match } from '../model/match';
import { Team } from '../model/team';
import { Tournament } from '../model/tournament';
import { NavbarComponent } from '../navbar/navbar.component';
import { LeaugesService } from '../service/leauges.service';
import { TeamService } from '../service/team.service';
import { TournamentService } from '../service/tournament.service';
import { Profile } from '../model/profile';

@Component({
  selector: 'app-leagues-detail',
  templateUrl: './leagues-detail.component.html',
  styleUrls: ['./leagues-detail.component.css'],
})
export class LeaguesDetailComponent {
  leaguesService: LeaugesService = inject(LeaugesService);

  checked_tab: string = '';
  tour: Tournament | undefined;
  profile: string | undefined;

  constructor(
    private router: Router,
  ) {}
  async ngOnInit(): Promise<void> {
    this.click();
    const currentUrl = this.router.url;

    const urlArray: string[] = currentUrl.split('/').filter((el) => el !== '');

    this.profile = localStorage.getItem('profile') as string;
    await this.loadTournament(urlArray[1]);
  }
  async loadTournament(id: string) {
    (await this.leaguesService.getTournamentById(id)).subscribe((res) => {
      this.tour = res;
    });
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
