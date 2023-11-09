import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
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

  team_id?: string = '';
  match_list: { match: Match; imageA: string; imageB: string }[] = [];

  private pageIndex: number = 0;
  public pageSize: number = 7;
  public pageTotal: number = 7;
  public loadding: boolean = false;

  constructor(private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.team_id = localStorage.getItem('team') as string;
    await this.loadMatching();
  }

  async loadMatching() {
    this.loadding = true;
    (
      await this.matchService.getMatchList(
        this.team_id as string,
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

  async setMatchList(matchList: Match[]) {
    for (let index = 0; index < matchList.length; index++) {
      const dataToPush = {
        match: matchList[index],
        imageA: '',
        imageB: '',
      };
      this.match_list.push(dataToPush);
    }
  }

  async setImageTeamA() {
    for (
      let index = this.pageIndex * this.pageSize;
      index < this.match_list.length;
      index++
    ) {
      if (this.match_list[index].match.teamA.team.imageTeamUrl) {
        (
          await this.nav.service.getImage(
            this.match_list[index].match.teamA.team.imageTeamUrl
          )
        ).subscribe(
          (res) => {},
          (result) => {
            if (result.status == 200) {
              this.match_list[index].imageA = result.error.text;
            }
          }
        );
      }
    }
  }

  async setImageTeamB() {
    for (
      let index = this.pageIndex * this.pageSize;
      index < this.match_list.length;
      index++
    ) {
    //   if (this.match_list[index].match.teamB.team.imageTeamUrl) {
    //     (
    //       await this.nav.service.getImage(
    //         this.match_list[index].match.teamB.team.imageTeamUrl
    //       )
    //     ).subscribe(
    //       (res) => {},
    //       (result) => {
    //         if (result.status == 200) {
    //           this.match_list[index].imageB = result.error.text;
    //         }
    //       }
    //     );
    //   }
    }
  }

  checkTeamA(id: string): boolean {
    if (this.team_id != id) {
      return false;
    }
    return true;
  }

  async setResult(
    matchId: string,
    team: string,
    resultType: string,
    score: number,
    index: number
  ) {
    this.matchService
      .setMatchResult(matchId, team, resultType, score)
      .subscribe(
        (res) => {
          console.log(res);
          this.match_list[index].match = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  toTeamDetail(id: string, name: string) {
    if (id == this.team_id) {
      this.router.navigate(['/profile/team']);
    }

    this.router.navigate(['/scrims', id], {
      queryParams: { myTeam: name },
    });
  }
}
