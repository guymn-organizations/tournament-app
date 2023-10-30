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

  selectedImageURL: string | ArrayBuffer | null = null;

  isCreateTeam = false;
  isFindTeam = false;

  teamData = {
    id: '',
    name: '',
    position: '',
  };

  position = [
    {
      name: 'DARK SLAYER LANE',
      value: 'DSL',
      player: this.nav.getMyTeam().DSL,
    },
    {
      name: 'JUNGLE',
      value: 'JG',
      player: this.nav.getMyTeam().JG,
    },
    {
      name: 'MID LANE',
      value: 'MID',
      player: this.nav.getMyTeam().MID,
    },
    {
      name: 'ABYSSAL DRAGON LANE',
      value: 'ADL',
      player: this.nav.getMyTeam().ADL,
    },
    {
      name: 'SUPPORT',
      value: 'SUP',
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
      imageTeamUrl: this.selectedImageURL as string,
      leader: this.nav.getProfile(),
    };

    switch (this.teamData.position) {
      case 'DSL': {
        newTeamData.DSL = this.nav.getProfile();
        break;
      }
      case 'JG': {
        newTeamData.JG = this.nav.getProfile();
        break;
      }
      case 'MID': {
        newTeamData.DSL = this.nav.getProfile();
        break;
      }
      case 'ADL': {
        newTeamData.ADL = this.nav.getProfile();
        break;
      }
      case 'SUP': {
        newTeamData.SUP = this.nav.getProfile();
        break;
      }
      default: {
        newTeamData.teamReserve?.push(this.nav.getProfile());
        break;
      }
    }

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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.saveImage(file);
    }
  }

  saveImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        this.selectedImageURL = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  }
}
