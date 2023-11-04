import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Message } from '../model/message';
import { NavbarComponent } from '../navbar/navbar.component';
import { Team } from '../model/team';
import { MessageService } from '../service/message.service';

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
  message: MessageService = inject(MessageService);

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

    (await this.message.getMessage(slicedMessages)).subscribe((res) => {
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

    (await this.message.getMessage(slicedMessages)).subscribe((res) => {
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
}
