import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { GobalServiceService } from '../service/gobal-service.service';
import { ProfileTeamComponent } from '../profile-team/profile-team.component';
import { Team } from '../model/team';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  title: string = 'Profile';
  discription: string = 'Manage data profile';

  nav: NavbarComponent = inject(NavbarComponent);
  service: GobalServiceService = inject(GobalServiceService);

  child = [
    {
      name: 'Profile',
      path: 'profile',
    },
    {
      name: 'Profile&nbsp;Game',
      path: 'game',
    },
    {
      name: 'Profile&nbsp;Team',
      path: 'team',
    },
    {
      name: 'Message',
      path: 'message',
    },
    {
      name: 'List&nbsp;Scrims',
      path: 'scrims',
    },
  ];

  checkTab: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkTab = this.router.url;
  }

  isActive(router: string): boolean {
    this.ngOnInit();
    return `/profile/${router}` === this.checkTab;
  }
}
