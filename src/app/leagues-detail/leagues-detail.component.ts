import { Component } from '@angular/core';

@Component({
  selector: 'app-leagues-detail',
  templateUrl: './leagues-detail.component.html',
  styleUrls: ['./leagues-detail.component.css'],
})
export class LeaguesDetailComponent {
  isOverview: boolean = true;
  isMatching: boolean = false;
  isTeamJoin: boolean = false;
}
