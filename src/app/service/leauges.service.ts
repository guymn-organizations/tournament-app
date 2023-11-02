import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Leauges } from '../model/leauges';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaugesService {

  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:4200/tournament';
  
  addTournament(data: Leauges): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, data);
  }
}
