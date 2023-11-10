import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Match } from '../model/match';
import { Team } from '../model/team';
import { Tournament } from '../model/tournament';
import { NavbarComponent } from '../navbar/navbar.component';
import { LeaugesService } from '../service/leauges.service';
import { TeamService } from '../service/team.service';
import { TournamentService } from '../service/tournament.service';

@Component({
  selector: 'app-leagues-detail',
  templateUrl: './leagues-detail.component.html',
  styleUrls: ['./leagues-detail.component.css'],
})
export class LeaguesDetailComponent {
  isOverview: boolean = true;
  isMatching: boolean = false;
  isCreater: boolean = false;

 
  checked_id: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teamService: TeamService
  ) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      const id = params.get('id');
      this.checked_id = id as string;
     
    });
  }

  
}
