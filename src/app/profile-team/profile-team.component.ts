import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Team } from '../model/team';

@Component({
  selector: 'app-profile-team',
  templateUrl: './profile-team.component.html',
  styleUrls: ['./profile-team.component.css'],
})
export class ProfileTeamComponent {
  nav: NavbarComponent = inject(NavbarComponent);

  isCreateTeam = false;
  isFindTeam = false;

  teamData = {
    id: '',
    name: '',
  };

  constructor() {}

  clickCreateTeam() {
    this.isCreateTeam = !this.isCreateTeam;
  }

  clickFindTeam() {
    this.isFindTeam = !this.isFindTeam;
  }

  async createTeam() {
    try {
      const newTeamData: Partial<Team> = {
        name: this.teamData.name,
      };
      await (
        await this.nav.teamService.createTeam(newTeamData as Team)
      ).subscribe(
        (response) => {
          // Handle the response here
          console.log(response);
          this.nav.getProfile().profileGame.myTeam = response;
        },
        (error) => {
          console.log(error);
          // Handle the error
        }
      );
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }
}
