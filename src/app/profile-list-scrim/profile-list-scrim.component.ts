import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-list-scrim',
  templateUrl: './profile-list-scrim.component.html',
  styleUrls: ['./profile-list-scrim.component.css'],
})
export class ProfileListScrimComponent {
  isScrims: boolean = false;

  postScrim() {
    this.isScrims = !this.isScrims;
  }

  getTextButtom(): string {
    return this.isScrims ? 'Show Scrims' : 'Post Scrims';
  }
}
