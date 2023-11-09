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
  leaugesService: LeaugesService = inject(LeaugesService);
  tournament: Tournament | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      const id = params.get('id');
      await this.setTournament(id as string);
    });
  }

  async setTournament(id: string) {
    (await this.leaugesService.getTournamentById(id)).subscribe((res) => {
      this.tournament = res;
    });
  }

  
}
