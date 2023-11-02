import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../service/tournament.service';
import { AdvertService } from '../service/advert.service';
import { Advert } from '../model/advert.model';
import { Tournament } from '../model/tournament.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  featuredTournament: Tournament | any;
  adverts!: Advert[] | any;

  constructor(private TournamentService: TournamentService,private AdvertService: AdvertService) {}

  ngOnInit() {
    this.TournamentService.getFeaturedTournament().subscribe(
      (tournament: Tournament ) => {
        this.featuredTournament = tournament;
      },
      (error) => {
        console.error('Error fetching featured tournament:', error);
      }
    );
    this.AdvertService.getAllAdvert().subscribe(
      (advert: Advert) => {
        this.adverts = advert;
      },
      (error) => {
        console.error('Error fetching featured advert:', error);
      }
    );
  }

}
