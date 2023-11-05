import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scrims',
  templateUrl: './scrims.component.html',
  styleUrls: ['./scrims.component.css']
})
export class ScrimsComponent {
  nav: NavbarComponent = inject(NavbarComponent);
  title: string = 'Scrim';
  discription: string = 'Find scrim to practice';
  childName = [
    {
      router: 'player',
      name: 'SCRIM FINDER',
    },
  ];
  checkTab: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkTab = this.router.url;
  }
  isActive(router: string): boolean {
    this.ngOnInit();
    return `/scrims/${router}` === this.checkTab;
  }
  onChange(event:any,index:any){
    console.log(event.target.checked)
    var cl = document.getElementsByClassName(index);
    if (event.target.checked) {
      console.log(index);
      for (let i = 0; i < cl.length; i++) {
        cl[i].classList.add("positions");
        
      }
      
    } else {
      for (let i = 0; i < cl.length; i++) {
        cl[i].classList.remove("positions");
        
      }
      
    }
}
}
