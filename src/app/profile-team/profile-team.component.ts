import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Team } from '../model/team';
import { Profile } from '../model/profile';
import { GobalServiceService } from '../service/gobal-service.service';
import { Image } from '../model/image';

@Component({
  selector: 'app-profile-team',
  templateUrl: './profile-team.component.html',
  styleUrls: ['./profile-team.component.css'],
})
export class ProfileTeamComponent {
  nav: NavbarComponent = inject(NavbarComponent);
  gobal: GobalServiceService = inject(GobalServiceService);

  selectedImageURL: string | ArrayBuffer | null = null;

  isCreateTeam = false;
  isFindTeam = false;

  teamData = {
    id: '',
    name: '',
    position: '',
    url: '',
  };

  position = [];

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

  async postImage(imgUrl: string) {
    const newImageData: Partial<Image> = {
      url: imgUrl,
    };

    (await this.gobal.postImage(newImageData as Image)).subscribe(
      (response) => {
        this.teamData.url = response.id;
      },
      (error) => {
        if (error.status == 200) {
          this.teamData.url = error.error.text;
        }
      }
    );
  }

  async createTeam() {
    // await this.postImage(this.selectedImageURL as string);

    const newTeamData: Partial<Team> = {
      name: this.teamData.name,
      leader: this.nav.getProfile(),
      teamReserve: [],
    };


    console.log(newTeamData);

    (await this.nav.teamService.createTeam(newTeamData as Team)).subscribe(
      (response) => {
        // Handle the response here
        console.log(response);
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
