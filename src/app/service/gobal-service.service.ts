import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Tournament } from '../model/tournament.model';
import { Advert } from '../model/advert.model';

@Injectable({
  providedIn: 'root',
})
export class GobalServiceService {
  private apiUrl = 'http://localhost:8000/';

  constructor(private router: Router,private http: HttpClient) {}

  toPage(page: string) {
    this.router.navigate([page]);
  }
  getFeaturedTournament(): Observable<Tournament> {
    return this.http.get<Tournament>(this.apiUrl + 'tournament/Featured');
  }
  getAllAdvert() :Observable<Advert>{
    return this.http.get<Advert>(this.apiUrl + 'advert');
  }
}
