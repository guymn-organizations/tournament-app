import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tournament } from '../model/tournament';
import { LeaugesService } from '../service/leauges.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { TeamService } from '../service/team.service';
import { Team } from '../model/team';
import { TeamInTournament } from '../model/team-in-tournament';
import { Match } from '../model/match';

@Component({
  selector: 'app-leaugesdetail',
  templateUrl: './leaugesdetail.component.html',
  styleUrls: ['./leaugesdetail.component.css'],
})
export class LeaugesdetailComponent implements OnInit {
  tournament: Tournament | undefined;
  constructor(private route: ActivatedRoute, private router: Router) {}

  async ngOnInit() {}
}
