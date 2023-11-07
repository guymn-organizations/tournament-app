import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tournament } from '../model/tournament';
import { Observable } from 'rxjs';
import { Team } from '../model/team';

@Injectable({
  providedIn: 'root',
})
export class LeaugesService {
  
  
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:8000/tournament';

  async addTournament(data: Tournament): Promise<Observable<any>> {
    return this.http.post(`${this.apiUrl}/create`, data);
  }
  
  async getAllTournament(): Promise<Observable<any>> {
    return this.http.get<Tournament[]>(`${this.apiUrl}`);
  }

  async getTournamentById(id: string): Promise<Observable<any>> {
    return this.http.get<Tournament[]>(`${this.apiUrl}/${id}`);
  }

  async addTeamToTournament(tournamentId: string, teamId: string, team: Team): Promise<Observable<any>> {
    return this.http.post(`${this.apiUrl}/${tournamentId}/teamJoin/${teamId}`, team);
  }
}
