import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Profile } from '../model/profile';

@Component({
  selector: 'app-profile-profile',
  templateUrl: './profile-profile.component.html',
  styleUrls: ['./profile-profile.component.css'],
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

  constructor() {}

  async setprofileData() {
    this.profileData.first_name = this.nav.profile?.firstName;
    this.profileData.last_name = this.nav.profile?.lastName;
    this.profileData.email = this.nav.profile?.email;
    this.profileData.birthday = this.nav.profile?.birthday;
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

  onSubmitEditForm() {
    if (this.profileData.password !== this.profileData.confirm_password) {
      this.errorMessage = 'Password and confirm do not math';
      return;
    }
    this.clickOutEdit();

    this.nav.getProfile().birthday = this.profileData.birthday as Date;
    this.nav.getProfile().firstName = this.profileData.first_name as string;
    this.nav.getProfile().lastName = this.profileData.last_name as string;
    this.nav.getProfile().email = this.profileData.email as string;
    this.nav.getProfile().password = this.profileData.password as string;
    this.nav.updateProfile();
  }
}
