import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tournament } from '../model/tournament.model';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private apiUrl = 'http://localhost:8000/tournament';

  constructor(private http: HttpClient) {}

  getFeaturedTournament(): Observable<Tournament> {
    return this.http.get<Tournament>(this.apiUrl + '/Featured');
  }

  addTeamToTournament(tournamentId: string, teamId: string): Observable<any> {
    const endpoint = `${this.apiUrl}/${tournamentId}/teamJoin/${teamId}`;
    return this.http.post(endpoint, {});
  }
}
