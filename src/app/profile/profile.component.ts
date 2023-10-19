import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  child = [
    {
      name: 'Profile',
      path: 'profile',
    },
    {
      name: 'Profile Game',
      path: 'game',
    },
    {
      name: 'Profile Team',
      path: 'team',
    },
  ];
}
