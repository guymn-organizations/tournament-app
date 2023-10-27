import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Profile } from '../model/profile';

@Component({
  selector: 'app-profile-profile',
  templateUrl: './profile-profile.component.html',
  styleUrls: ['./profile-profile.component.css'],
})
export class ProfileProfileComponent {
  constructor(private nav: NavbarComponent) {}

  getProfile(): Profile {
    if (this.nav.profile) {
      return this.nav.profile;
    }

    return new Profile();
  }
}
