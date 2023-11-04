import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tournament } from '../model/tournament';
import { LeaugesService } from '../service/leauges.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-leaugesdetail',
  templateUrl: './leaugesdetail.component.html',
  styleUrls: ['./leaugesdetail.component.css'],
})
export class LeaugesdetailComponent implements OnInit {
  tournamentService: LeaugesService = inject(LeaugesService);
  nav: NavbarComponent = inject(NavbarComponent);

  checked_id: string = '';
  tournament: Tournament | undefined;
  image: string | undefined;

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      // Access the parameter by its name, in this case, 'id'
      const id = params.get('id');
      this.checked_id = id as string;
      
      await this.setTournament();
    });
  }

  async setTournament() {
    (await this.tournamentService.getTournamentById(this.checked_id)).subscribe(
      async (res) => {
        this.tournament = res;
        await this.setImage(this.tournament?.imageTourUrl as string);
      }
    );
  }

  async setImage(image: string) {
    (await this.nav.service.getImage(image)).subscribe(
      (res) => {
        this.image = res.toString(); 
      },
      (error) => {
        this.image = ''; 
      }
    );
  }
  

}
