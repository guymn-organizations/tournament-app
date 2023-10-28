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

  errorMessage = '';

  constructor() {}

  clickCreateTeam() {
    this.errorMessage = '';
    this.isCreateTeam = !this.isCreateTeam;
  }

  clickFindTeam() {
    this.errorMessage = '';
    this.isFindTeam = !this.isFindTeam;
  }

  async createTeam() {
    const newTeamData: Partial<Team> = {
      name: this.teamData.name,
    };
    (await this.nav.teamService.createTeam(newTeamData as Team)).subscribe(
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
  }

  async getTeamByCode() {
    (await this.nav.teamService.getTeamById(this.teamData.id)).subscribe(
      (response) => {
        // Handle the response here
        console.log(response);
        this.nav.getProfile().profileGame.myTeam = response;
        this.nav.updateProfile();
      },
      (error) => {
        this.errorMessage = error.error;
        // Handle the error
      }
    );
  }
}
