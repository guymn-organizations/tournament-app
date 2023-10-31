import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tournament } from './tournament.model';
import { Advert } from './advert.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/';

  constructor(private http: HttpClient) {}

  getFeaturedTournament(): Observable<Tournament> {
    return this.http.get<Tournament>(this.apiUrl + 'tournament/Featured');
  }
  getAllAdvert() :Observable<Advert>{
    return this.http.get<Advert>(this.apiUrl + 'advert');
  }
}