import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent {
  childName = [
    {
      router: 'player',
      name: 'Tournament List',
    },
  ];

  checkTab: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkTab = this.router.url;
  }

  isActive(router: string): boolean {
    this.ngOnInit(); // You can remove this line, as ngOnInit is automatically called by Angular.
    return router === this.checkTab;
  }
}