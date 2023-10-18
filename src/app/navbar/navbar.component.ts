import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  menu = false;

  clickMenu() {
    this.menu = !this.menu;
  }

  checkTab() {
    return true;
  }
}
