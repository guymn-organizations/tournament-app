import { Component, Input, OnInit, inject } from '@angular/core';
import { Message } from '../model/message';
import { NavbarComponent } from '../navbar/navbar.component';
import { Team } from '../model/team';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  nav: NavbarComponent = inject(NavbarComponent);
  message: MessageService = inject(MessageService);

  message_team: Message[] = [];
  message_profile: Message[] = [];

  team: Team | undefined;

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.team = this.nav.team;
    if (!this.team) {
      await this.setTeam();
    }

    await this.setMessageTeam();
    await this.setMessageProfile();
  }

  async setMessageTeam() {
    if (!this.team?.messages) {
      return;
    }
    (await this.message.getMessage(this.team?.messages as string[])).subscribe(
      (res) => {
        this.message_team = res;
      }
    );
  }

  async setMessageProfile() {
    (
      await this.message.getMessage(this.nav.profile?.messages as string[])
    ).subscribe((res) => {
      this.message_profile = res;
    });
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
