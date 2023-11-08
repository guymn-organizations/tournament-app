import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { Team } from '../model/team';
import { NavbarComponent } from '../navbar/navbar.component';
import { Match } from '../model/match';
import { MatchService } from '../service/match.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css', '../scrims/scrims.component.css'],
})
export class TournamentComponent implements OnInit {
  title: string = 'Tournament';
  discription: string = 'The competition you have to face';

  nav: NavbarComponent = inject(NavbarComponent);
  matchService: MatchService = inject(MatchService);

  team?: Team;
  match_list: Match[] = [];

  private pageIndex: number = 0;
  public pageSize: number = 7;
  public pageTotal: number = 7;
  public loadding: boolean = false;

  constructor(private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.team = this.nav.team;
    if (!this.team) {
      await this.setTeam();
    }
  }

  async setTeam() {
    try {
      const teamId = localStorage.getItem('team') as string;
      this.team = await (
        await this.nav.teamService.getTeamById(teamId)
      ).toPromise();
    } catch (teamError) {}
  }

  async loadMatching() {
    this.loadding = true;
    const team_id = localStorage.getItem('team') as string;
    (
      await this.matchService.getMatchList(
        team_id,
        this.pageIndex,
        this.pageSize
      )
    ).subscribe(
      async (res) => {
        await this.setMatchList(res);
        await this.setImageTeamA();
        await this.setImageTeamB();
        this.pageTotal = res.length;
        this.pageIndex++;
        this.loadding = false;
      },
      (err) => {
        this.pageTotal = -1;
      }
    );
  }

  @ViewChild('MatchingContenter', { static: false })
  public messageProfileElement: ElementRef | undefined;

  @HostListener('scroll', ['$event'])
  async onScrollMatchingContenter(): Promise<void> {
    const nativeElement = this.messageProfileElement?.nativeElement;

    if (
      nativeElement.clientHeight + Math.round(nativeElement.scrollTop) >=
        nativeElement.scrollHeight - 10 &&
      !this.loadding
    ) {
      await this.loadMatching();
    }
  }

  async setMatchList(matchList: Match[]) {}

  async setImageTeamA() {}

  async setImageTeamB() {}
}
