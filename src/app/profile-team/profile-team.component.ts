import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Team } from '../model/team';
import { Profile } from '../model/profile';

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

  position = [
    {
      name: 'DARK SLAYER LANE',
      player: this.nav.getMyTeam().DSL,
    },
    {
      name: 'JUNGLE',
      player: this.nav.getMyTeam().JG,
    },
    {
      name: 'MID LANE',
      player: this.nav.getMyTeam().MID,
    },
    {
      name: 'ABYSSAL DRAGON LANE',
      player: this.nav.getMyTeam().ADL,
    },
    {
      name: 'SUPPORT',
      player: this.nav.getMyTeam().SUP,
    },
  ];

  errorMessageCreate = '';
  errorMessageFind = '';

  constructor() {}

  clickCreateTeam() {
    this.errorMessageCreate = '';
    this.isCreateTeam = !this.isCreateTeam;
  }

  clickFindTeam() {
    this.errorMessageFind = '';
    this.isFindTeam = !this.isFindTeam;
  }

  async createTeam() {
    const newTeamData: Partial<Team> = {
      name: this.teamData.name,
    };
    (await this.nav.teamService.createTeam(newTeamData as Team)).subscribe(
      (response) => {
        // Handle the response here
        this.nav.getProfile().profileGame.myTeam = response;
        this.nav.updateProfile();
      },
      (error) => {
        this.errorMessageCreate = error.error;
        // Handle the error
      }
    );
  }

  async getTeamByCode() {
    (await this.nav.teamService.getTeamById(this.teamData.id)).subscribe(
      (response) => {
        // Handle the response here
        this.nav.getProfile().profileGame.myTeam = response;
        this.nav.updateProfile();
      },
      (error) => {
        this.errorMessageFind = error.error;
        // Handle the error
      }
    );
  }

  toLeavTeam() {
    this.nav.getProfileGame().myTeam = null;
    this.nav.updateProfile();
  }
}
