import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-profile-team',
  templateUrl: './profile-team.component.html',
  styleUrls: ['./profile-team.component.css'],
})
export class ProfileTeamComponent {
  nav: NavbarComponent = inject(NavbarComponent);

  isCreateTeam = false;
  isFindTeam = false;

  team = {
    name: ';',
  };

  constructor() {}

  clickCreateTeam() {
    this.isCreateTeam = !this.isCreateTeam;
  }

  clickFindTeam() {
    this.isFindTeam = !this.isFindTeam;
  }

  createTeam() {}
}
