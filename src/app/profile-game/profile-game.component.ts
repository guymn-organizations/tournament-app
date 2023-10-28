import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Profile } from '../model/profile';
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

  selectedImageURL: string | ArrayBuffer | null = null;

  isConnect(): boolean {
    return !!this.nav.getProfile().profileGame;
  }

  async onSubmitConnectForm() {
    await this.setProfileGame();
    console.log(this.profileGameData);
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
        // this.uploadImage(this.selectedImageURL as string);
      }
    };
    reader.readAsDataURL(file);
  }

  async setProfileGame() {
    try {
      const newProfileData: Partial<ProfileGame> = {
        name: this.profileGameData.name,
        openId: this.profileGameData.openid,
        imageGameUrl: this.selectedImageURL as string,
      };
      await (
        await this.nav.profileService.setProfileGame(
          this.nav.profile?.id as string,
          newProfileData as ProfileGame
        )
      ).toPromise();
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }
}
