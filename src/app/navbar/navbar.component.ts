import { Component, inject } from '@angular/core';
import { GobalServiceService } from '../service/gobal-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  service: GobalServiceService = inject(GobalServiceService);

  menu = false;
  navBarName = ['leauges', 'scrims', 'tournament', 'finder'];
  navBarImg = [
    'https://cdn.discordapp.com/attachments/1163138471196622918/1163140864357437570/370257351_657778326338320_3000149127718713003_n.png?ex=653e7e58&is=652c0958&hm=85b1d127e95ed383906c426ffc1b965388762b7319700229f4b62ec5f4826c21&',
    '../../assets/img/nav/SCRIMS.png',
    'https://cdn.discordapp.com/attachments/1163138471196622918/1163140863652794388/387344873_730245708930192_4520940304685637453_n.png?ex=653e7e58&is=652c0958&hm=456aceb3e92d9199bc83cd79393efc0a01d9ef9a597fa0b385041be350413d91&',
    'https://cdn.discordapp.com/attachments/1163138471196622918/1163140864139350148/387593649_2840731006069136_1036389285473139054_n.png?ex=653e7e58&is=652c0958&hm=260356779da873b2e5a45570cf89747f1c8935a2fc9e02316c5bad33096ed024&',
  ];

  constructor() {}

  navBarRow = this.navBarName.map((name, index) => ({
    name: name,
    img: this.navBarImg[index],
  }));

  clickMenu() {
    this.menu = !this.menu;
  }

  checkTab() {
    return true;
  }
  
  toProfile(page: string) {
    this.service.toPage(page);
  }

}
