import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PositionTypeT, Team } from '../model/team';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private apiUrl = 'http://localhost:8000/teams'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  async createTeam(team: Team): Promise<Observable<Team>> {
    return this.http.post<Team>(`${this.apiUrl}`, team);
  }

  async getTeamById(id: string): Promise<Observable<Team>> {
    return this.http.get<Team>(`${this.apiUrl}/${id}`);
  }

  async addTeamPlayer(
    id: string,
    player: string,
    type: PositionTypeT
  ): Promise<Observable<Team>> {
    return this.http.put<Team>(`${this.apiUrl}/${id}/${type}/${player}`, null);
  }
}
