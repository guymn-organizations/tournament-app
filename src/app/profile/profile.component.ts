import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { GobalServiceService } from '../service/gobal-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit{
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
      name: 'Profile Game',
      path: 'game',
    },
    {
      name: 'Profile Team',
      path: 'team',
    },
  ];

  checkTab: string = '';

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.checkTab = this.router.url;
  } 

  isActive(router: string): boolean {
    this.ngOnInit();
    return `/profile/${router}` === this.checkTab;
  }
}
