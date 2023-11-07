import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../service/team.service';
import { ScrimsService } from '../service/scrims.service';
import { Team } from '../model/team';
import { Scrims } from '../model/scrims';
import { GobalServiceService } from '../service/gobal-service.service';

@Component({
  selector: 'app-scrims-detail',
  templateUrl: './scrims-detail.component.html',
  styleUrls: [
    './scrims-detail.component.css',
    '../profile/profile.component.css',
  ],
})
export class ScrimsDetailComponent implements OnInit {
  teamService: TeamService = inject(TeamService);
  scrimsService: ScrimsService = inject(ScrimsService);
  service: GobalServiceService = inject(GobalServiceService);

  team: Team | undefined;
  image_team: string | undefined;
  images_player: string[] = [];
  scrims: Scrims[] = [];

  team_id: string | undefined;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.team_id = params['id'];
    });
  }
  async ngOnInit(): Promise<void> {
    await this.setTeam();
  }

  async setImageTeam() {
    if (!this.team?.imageTeamUrl) {
      return;
    }

    (await this.service.getImage(this.team?.imageTeamUrl)).subscribe(
      (res) => {},
      (error) => {
        if (error.status == 200) {
          this.image_team = error.error.text;
        }
      }
    );
  }

  async setImagePlayer() {
    if (!this.team?.positions) {
      return;
    }
    for (let index = 0; index < this.team?.positions.length; index++) {
      if (this.team.positions[index].player?.imageProfileUrl) {
        (
          await this.service.getImage(
            this.team.positions[index].player?.imageProfileUrl as string
          )
        ).subscribe(
          (res) => {},
          (error) => {
            if (error.status == 200) {
              this.images_player[index] = error.error.text;
            }
          }
        );
      }
    }
  }

  async setTeam() {
    (await this.teamService.getTeamById(this.team_id as string)).subscribe(
      async (res) => {
        this.team = res;
        await this.setImageTeam();
        await this.setImagePlayer();
        await this.loadScrims();
      }
    );
  }

  getUnImageTeam() {
    return this.team?.name[0];
  }

  private pageIndex: number = 0;
  public pageSize: number = 20;
  public pageTotal: number = 5;
  public loadding: boolean = false;

  async loadScrims() {
    this.loadding = true;
    (
      await this.scrimsService.getScrimsByTeamNoOpponentLazy(
        this.team_id as string,
        this.pageIndex,
        this.pageSize
      )
    ).subscribe(
      (res) => {
        this.scrims = [...this.scrims, ...res];
        this.pageTotal = res.length;
        this.pageIndex++;
        this.loadding = false;
      },
      (err) => {
        this.pageTotal = -1;
      }
    );
  }

  @ViewChild('ListScrims', { static: false })
  public messageProfileElement: ElementRef | undefined;

  @HostListener('scroll', ['$event'])
  async onScrollListScrims(): Promise<void> {
    const nativeElement = this.messageProfileElement?.nativeElement;

    if (
      nativeElement.clientHeight + Math.round(nativeElement.scrollTop) >=
        nativeElement.scrollHeight - 50 &&
      !this.loadding
    ) {
      await this.loadScrims();
    }
  }
}
