import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-leauges',
  templateUrl: './leauges.component.html',
  styleUrls: ['./leauges.component.css']
})
export class LeaugesComponent {
  nav: NavbarComponent = inject(NavbarComponent);
  
}
