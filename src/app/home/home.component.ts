import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Api.service';
import { HttpClient } from '@angular/common/http';
import { Advert } from '../advert.model';
import { Tournament } from '../tournament.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  featuredTournament: Tournament | any;
  adverts!: Advert[] | any;

  constructor(private ApiService: ApiService, private http: HttpClient) {}

  ngOnInit() {
    this.ApiService.getFeaturedTournament().subscribe(
      (tournament: Tournament ) => {
        this.featuredTournament = tournament;
      },
      (error) => {
        console.error('Error fetching featured tournament:', error);
      }
    );
    this.ApiService.getAllAdvert().subscribe(
      (advert: Advert) => {
        this.adverts = advert;
      },
      (error) => {
        console.error('Error fetching featured tournament:', error);
      }
    );
  }

}
