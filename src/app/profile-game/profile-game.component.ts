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

  constructor() {}

  async setProfileGameData() {
    this.profileGameData.name = this.nav.getProfile().profileGame
      ?.name as string;
    this.profileGameData.openid = this.nav.getProfile().profileGame
      ?.openId as string;
  }

  isConnect(): boolean {
    return !!this.nav.getProfile().profileGame && !this.toEdit;
  }

  async clickEdit() {
    await this.setProfileGameData();
    this.toEdit = !this.toEdit;
  }

  async onSubmitConnectForm() {
    await this.setProfileGame();
    this.toEdit = false;
  }

  async setProfileGame() {
    this.nav.getProfile().profileGame = new ProfileGame();
    this.nav.getProfileGame().name = this.profileGameData.name;
    this.nav.getProfileGame().openId = this.profileGameData.openid;

    this.nav.updateProfile();
  }

  getGenderIcon(): string {
    if (this.nav.profile?.gender == Gender.Female) {
      return ' bi h1 m-2 bi-gender-female';
    } else {
      return ' bi h1 m-2 bi-gender-male';
    }
  }

  checkMessage(): boolean {
    return this.nav.getProfile().messages.length == 0;
  }
}
