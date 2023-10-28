import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.css'],
})
export class FinderComponent {
  title: string = 'Finder';
  discription: string = 'Find player or team to join';

  childName = [
    {
      router: 'player',
      name: 'Player Finder',
    },
    {
      router: 'team',
      name: 'Team Finder',
    },
  ];

  checkTab: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkTab = this.router.url;
  }

  isActive(router: string): boolean {
    this.ngOnInit();
    return `/finder/${router}` === this.checkTab;
  }
}
