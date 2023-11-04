import { Component, Input, OnInit, inject } from '@angular/core';
import { Team } from '../model/team';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../model/message';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  nav: NavbarComponent = inject(NavbarComponent);
  message_team: Message[] = [];
  message_profile: Message[] = [];

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.setMessageProfile();
    this.setMessageTeam();
  }

  async setMessageTeam() {
    (
      await this.nav.teamService.getMessage(
        localStorage.getItem('team') as string
      )
    ).subscribe((res) => {
      console.log(res);
    });
  }

  async setMessageProfile() {
    (
      await this.nav.profileService.getMessage(
        localStorage.getItem('profile') as string
      )
    ).subscribe((res) => {
      console.log(res);
    });
  }
}
