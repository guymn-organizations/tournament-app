import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tournament } from '../model/tournament';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaugesService {

  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:4200/tournament';
  
  addTournament(data: Tournament): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, data);
  }
}
