import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Profile } from '../model/profile';
import { ProfileProfileComponent } from '../profile-profile/profile-profile.component';

@Component({
  selector: 'app-profile-game',
  templateUrl: './profile-game.component.html',
  styleUrls: ['./profile-game.component.css'],
})
export class ProfileGameComponent {
  nav: NavbarComponent = inject(NavbarComponent);

  profileGameData = {
    name: '',
    openid: '',
  };

  selectedImageURL: string | ArrayBuffer | null = null;

  isConnect(): boolean {
    return !!this.nav.getProfile().profileGame;
  }

  onSubmitConnectForm() {
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
}
