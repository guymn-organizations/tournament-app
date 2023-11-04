import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Profile } from '../model/profile';
import { Image } from '../model/image';
import { map } from 'rxjs';

@Component({
  selector: 'app-profile-profile',
  templateUrl: './profile-profile.component.html',
  styleUrls: ['./profile-profile.component.css', '../profile/profile.component.css'],
})
export class ProfileProfileComponent {
  nav: NavbarComponent = inject(NavbarComponent);

  profileData = {
    first_name: this.nav.profile?.firstName,
    last_name: this.nav.profile?.lastName,
    email: this.nav.profile?.email,
    password: '',
    confirm_password: '',
    birthday: this.nav.profile?.birthday,
  };

  toEdit = false;
  errorMessage: string = '';

  selectedImageURL: string | ArrayBuffer | null = null;

  constructor() {}

  async setprofileData() {
    this.profileData.first_name = this.nav.profile?.firstName;
    this.profileData.last_name = this.nav.profile?.lastName;
    this.profileData.email = this.nav.profile?.email;
    this.profileData.birthday = this.nav.profile?.birthday;
    this.profileData.password = '';
    this.profileData.confirm_password = '';
  }

  isEdit(): boolean {
    return !!this.toEdit;
  }

  clickEdit() {
    this.setprofileData();
    this.toEdit = true;
  }

  clickOutEdit() {
    this.toEdit = false;
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

  async onSubmitEditForm() {
    if (this.profileData.password !== this.profileData.confirm_password) {
      this.errorMessage = 'Password and confirm do not math';
      return;
    }

    const profileData: Partial<Profile> = {
      firstName: this.profileData.first_name,
      lastName: this.profileData.last_name,
      email: this.profileData.email,
      password: this.profileData.password,
      birthday: this.profileData.birthday,
      imageProfileUrl: this.selectedImageURL as string,
    };

    (
      await this.nav.profileService.editProfile(
        this.nav.getProfile().id,
        profileData as Profile
      )
    ).subscribe((respon) => {
      this.nav.setProfileData(respon);
      this.nav.setProfileImage();
    });

    this.clickOutEdit();
  }
}
