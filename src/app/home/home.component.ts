import { Component, OnInit } from '@angular/core';
import { GobalServiceService } from '../service/gobal-service.service';
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

  constructor(private GobalServiceService: GobalServiceService) {}

  ngOnInit() {
    this.GobalServiceService.getFeaturedTournament().subscribe(
      (tournament: Tournament ) => {
        this.featuredTournament = tournament;
      },
      (error) => {
        console.error('Error fetching featured tournament:', error);
      }
    );
    this.GobalServiceService.getAllAdvert().subscribe(
      (advert: Advert) => {
        this.adverts = advert;
      },
      (error) => {
        console.error('Error fetching featured tournament:', error);
      }
    );
  }

}
