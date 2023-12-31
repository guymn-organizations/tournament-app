import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Gender, Profile } from '../model/profile';
import { ProfileService } from '../service/profile.service';
import { ProfileGame } from '../model/profile-game';
import { Image } from '../model/image';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile-game',
  templateUrl: './profile-game.component.html',
  styleUrls: [
    './profile-game.component.css',
    '../profile/profile.component.css',
  ],
})
export class ProfileGameComponent implements OnInit {
  nav: NavbarComponent = inject(NavbarComponent);
  profileService: ProfileService = inject(ProfileService);

  selectedImageURL: string | ArrayBuffer | null = null;

  profileGameData = {
    name: '',
    openid: '',
  };

  toEdit = false;

  loadding: boolean = false;

  profileGame: ProfileGame | undefined;

  errorMessage = '';

  constructor() {}

  async ngOnInit(): Promise<void> {
    await this.nav.ngOnInit();
    await this.setImageGame();
  }

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
    this.errorMessage = '';
    this.toEdit = !this.toEdit;
  }

  async onSubmitConnectForm() {
    await this.setProfileGame();
  }

  async setProfileGame() {
    this.loadding = true;
    const profileData: Partial<ProfileGame> = {
      name: this.profileGameData.name,
      openId: this.profileGameData.openid,
      imageGameUrl: this.selectedImageURL as string,
    };

    (
      await this.nav.profileService.editProfileGame(
        this.nav.getProfile().id,
        profileData as ProfileGame
      )
    ).subscribe(
      (respon) => {
        this.nav.getProfile().profileGame = respon;
        this.nav.setTeam();
        this.toEdit = false;
        this.loadding = false;
      },
      (error) => {
        this.errorMessage = error.error;
        this.loadding = false;
      }
    );
  }

  getGenderIcon(): string {
    if (this.nav.profile?.gender == Gender.Female) {
      return ' bi h1 m-2 bi-gender-female';
    } else {
      return ' bi h1 m-2 bi-gender-male';
    }
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

  async setImageGame() {
    (
      await this.nav.service.getImage(
        this.nav.getProfile()?.profileGame?.imageGameUrl as string
      )
    ).subscribe(
      (res) => {},
      (result) => {
        this.selectedImageURL = result.error.text;
      }
    );
  }

  goMessage() {
    this.nav.service.toPage('profile/game/message');
  }
}
