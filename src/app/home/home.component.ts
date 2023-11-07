import { Component, OnInit, inject} from '@angular/core';
import { AdvertService} from '../service/advert.service';
import { Advert } from '../model/advert';
import { Tournament } from '../model/tournament';
import { NavbarComponent } from '../navbar/navbar.component';
import { TournamentService } from '../service/tournament.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredTournament: Tournament | undefined;

  nav: NavbarComponent = inject(NavbarComponent);

  Tournament: undefined | Tournament;
  image: string | undefined;

  adverts: Advert[] = [];

  constructor(private advertService: AdvertService, private tournamentService: TournamentService) {}

  async ngOnInit(): Promise<void> {
    this.advertService.getAllAdvert().subscribe(
      (adverts: Advert[]) => { 
        this.adverts = adverts;
      },
      (error) => {
        console.error('Error fetching featured adverts:', error);
      }
    );

  }
}