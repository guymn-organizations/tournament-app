import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Profile } from '../model/profile';
import { GobalServiceService } from '../service/gobal-service.service';

@Component({
  selector: 'app-profile-profile',
  templateUrl: './profile-profile.component.html',
  styleUrls: ['./profile-profile.component.css'],
})
export class ProfileProfileComponent {
  selectedImageURL: string | ArrayBuffer | null = null;
  nav: NavbarComponent = inject(NavbarComponent);

  constructor() {}

  getProfile(): Profile {
    if (this.nav.profile) {
      return this.nav.profile;
    }

    return new Profile();
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
        this.uploadImage(this.selectedImageURL as string);
      }
    };
    reader.readAsDataURL(file);
  }

  async uploadImage(image: string) {
    this.nav.getProfile().imageProfileUrl = image;
    await this.nav.updateProfile();
  }
}
