import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Message, MessageType } from '../model/message';
import { NavbarComponent } from '../navbar/navbar.component';
import { PositionType, Team } from '../model/team';
import { MessageService } from '../service/message.service';
import { ScrimsService } from '../service/scrims.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css', '../profile/profile.component.css'],
})
export class MessageComponent implements OnInit {
  @ViewChild('messageProfileContenter', { static: false })
  public messageProfileElement: ElementRef | undefined;

  @ViewChild('messageTeamContenter', { static: false })
  public messageTeamElement: ElementRef | undefined;

  nav: NavbarComponent = inject(NavbarComponent);
  messageService: MessageService = inject(MessageService);
  scrimsService: ScrimsService = inject(ScrimsService);

  message_team: Message[] = [];
  message_profile: Message[] = [];

  public pageIndex_profile: number = 0;
  public pagePush_profile: number = 4;
  public pageSize_profile: number = 7;

  public pageIndex_team: number = 0;
  public pagePush_team: number = 4;
  public pageSize_team: number = 7;

  team: Team | undefined;

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.team = this.nav.team;
    if (!this.team) {
      await this.setTeam();
    }

    await this.loadMessageProfile();
    await this.loadMessageTeam();
  }

  async loadMessageProfile() {
    await this.setMessageProfile();
    this.pageIndex_profile = this.pageSize_profile;
    this.pageSize_profile += this.pagePush_profile;
  }

  async loadMessageTeam() {
    await this.setMessageTeam();
    this.pageIndex_team = this.pageSize_team;
    this.pageSize_team += this.pagePush_team;
  }

  async setMessageTeam() {
    const slicedMessages = (this.team?.messages as string[]).slice(
      this.pageIndex_team,
      this.pageSize_team
    );

    if (slicedMessages.length == 0) {
      return;
    }

    (await this.messageService.getMessage(slicedMessages)).subscribe((res) => {
      this.message_team = res;
    });
  }

  async setMessageProfile() {
    const slicedMessages = (this.nav.profile?.messages as string[]).slice(
      this.pageIndex_profile,
      this.pageSize_profile
    );
    if (slicedMessages.length == 0) {
      return;
    }

    (await this.messageService.getMessage(slicedMessages)).subscribe((res) => {
      this.message_profile = [...this.message_profile, ...res];
    });
  }

  @HostListener('scroll', ['$event'])
  async onScrollProfileMessage(): Promise<void> {
    const nativeElement = this.messageProfileElement?.nativeElement;

    if (
      nativeElement.clientHeight + Math.round(nativeElement.scrollTop) ===
        nativeElement.scrollHeight &&
      this.message_profile.length !== this.nav.profile?.messages.length
    ) {
      await this.loadMessageProfile();
    }
  }

  @HostListener('scroll', ['$event'])
  async onScrollTeamMessage(): Promise<void> {
    const nativeElement = this.messageTeamElement?.nativeElement;

    if (
      nativeElement.clientHeight + Math.round(nativeElement.scrollTop) ===
        nativeElement.scrollHeight &&
      this.message_team.length !== this.team?.messages.length
    ) {
      await this.loadMessageTeam();
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

  acceptMessage(message: Message, index: number) {
    if (message.messageType == MessageType.INVITE_TO_JOIN_TEAM) {
      this.acceptInviteToJoinTeam(message.scrimsId, message.positionType);
    } else if (message.messageType == MessageType.REQUEST_TO_JOIN_TEAM) {
      this.acceptRequestToJoinTeam(message.sender, message.positionType);
      this.readMessage(message.id, index);
    } else if (message.messageType == MessageType.INVITE_TO_SCRIMS) {
      this.acceptScrims(message.scrimsId, message.sender);
    }
  }

  async acceptScrims(scrims_id: string, team_name: string) {
    (await this.scrimsService.setTeamB(scrims_id, team_name)).subscribe();
  }

  async acceptRequestToJoinTeam(player: string, type: PositionType) {
    const team_id = localStorage.getItem('team') as string;
    (await this.nav.teamService.addTeamPlayer(team_id, player, type)).subscribe(
      (res) => {
        this.nav.service.toPage('/profile/team');
        this.nav.team = res;
      },
      (err) => {
        alert(err.error);
      }
    );
  }

  async acceptInviteToJoinTeam(scrims_id: string, type: PositionType) {
    const player = this.nav.profile?.profileGame.name as string;
    (
      await this.nav.teamService.addTeamPlayer(scrims_id, player, type)
    ).subscribe();
  }

  async readMessage(id: string, index_message: number) {
    (await this.messageService.readMessage(id)).subscribe(
      (res) => {
        this.message_team[index_message].isRead = res.isRead;
      },
      (err) => {}
    );
  }
}
