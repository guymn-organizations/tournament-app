import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Profile } from '../model/profile';

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
    console.log('Save image function called with file:', file);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        this.selectedImageURL = e.target.result;
        console.log(this.selectedImageURL);
        this.uploadImage(this.selectedImageURL as string);
      }
    };
    reader.readAsDataURL(file);
  }

  async uploadImage(image: string) {
    try {
      const newProfileData: Partial<Profile> = {
        imageProfileUrl: image,
      };
      await (
        await this.nav.profileService.editProfile(
          this.nav.profile?.id as string,
          newProfileData as Profile
        )
      ).toPromise();
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }
}
