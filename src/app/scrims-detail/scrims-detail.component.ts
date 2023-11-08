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
import { DatePipe } from '@angular/common';
import { MessageService } from '../service/message.service';

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
  messageService: MessageService = inject(MessageService);

  team: Team | undefined;
  myTeamName: string = '';
  image_team: string | undefined;
  images_player: string[] = [];
  scrims: Scrims[] = [];

  team_id: string | undefined;

  constructor(private route: ActivatedRoute, public datepipe: DatePipe) {
    this.route.params.subscribe((params) => {
      this.team_id = params['id'];
    });

    this.route.queryParams.subscribe((queryParams) => {
      this.myTeamName = queryParams['myTeam'];
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
        await this.setFirstLoad();
      }
    );
  }

  getUnImageTeam() {
    return this.team?.name[0];
  }

  async setFirstLoad() {
    const nativeElement = this.messageProfileElement?.nativeElement;

    while (
      nativeElement.clientHeight + Math.round(nativeElement.scrollTop) ==
        nativeElement.scrollHeight &&
      this.pageSize === this.pageTotal
    ) {
      await this.loadScrims();
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  private pageIndex: number = 0;
  public pageSize: number = 5;
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

  inviteScrims(scrim: Scrims) {
    let date = this.datepipe.transform(scrim.startDate, 'dd/MM/yyyy');
    let time = this.datepipe.transform(scrim.startDate, 'HH:mm');

    let text = `You want to invite team ${this.team?.name} to scrims on ${date} at ${time}.`;
    if (confirm(text)) {
      this.senIniteScrims(scrim);
    }
  }

  async senIniteScrims(scrim: Scrims) {
    (
      await this.messageService.sendToScrims(
        this.myTeamName,
        scrim.id,
        this.team?.name as string
      )
    ).subscribe(
      (res) => {},
      (error) => {
        if (error.status == 200) {
          alert(error.error.text);
        }
      }
    );
  }
}
