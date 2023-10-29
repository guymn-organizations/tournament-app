import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Gender, Profile } from '../model/profile';
import { ProfileProfileComponent } from '../profile-profile/profile-profile.component';
import { ProfileService } from '../service/profile.service';
import { ProfileGame } from '../model/profile-game';
import { connect } from 'rxjs';

@Component({
  selector: 'app-profile-game',
  templateUrl: './profile-game.component.html',
  styleUrls: ['./profile-game.component.css'],
})
export class ProfileGameComponent {
  nav: NavbarComponent = inject(NavbarComponent);
  profileService: ProfileService = inject(ProfileService);

  profileGameData = {
    name: '',
    openid: '',
  };

  toEdit = false;

  selectedImageURL: string | ArrayBuffer | null = null;

  constructor() {}

  async setProfileGameData() {
    this.profileGameData.name = this.nav.getProfile().profileGame.name;
    this.profileGameData.openid = this.nav.getProfile().profileGame.openId;
  }

  isConnect(): boolean {
    return !!this.nav.getProfile().profileGame && !this.toEdit;
  }

  async clickEdit() {
    this.selectedImageURL = this.nav.getProfileGame().imageGameUrl;
    await this.setProfileGameData();
    this.toEdit = !this.toEdit;
  }

  async onSubmitConnectForm() {
    await this.setProfileGame();
    this.clickEdit();
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

  async setProfileGame() {
    this.nav.getProfile().profileGame.imageGameUrl = this
      .selectedImageURL as string;
    this.nav.getProfile().profileGame.name = this.profileGameData.name;
    this.nav.getProfile().profileGame.openId = this.profileGameData.openid;

    this.nav.updateProfile();
  }

  getGenderIcon(): string {
    if (this.nav.profile?.gender == Gender.Female) {
      return ' bi h1 m-2 bi-gender-female';
    } else {
      return ' bi h1 m-2 bi-gender-male';
    }
  }
}
