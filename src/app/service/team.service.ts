import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PositionType, Team } from '../model/team';
import { Observable } from 'rxjs';
import { Message } from '../model/message';
import { Profile } from '../model/profile';

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
    type: PositionType
  ): Promise<Observable<Team>> {
    return this.http.put<Team>(`${this.apiUrl}/${id}/${type}/${player}`, null);
  }

  async outTeamPosition(
    team_name: string,
    player_index: number,
    index_position: number
  ): Promise<Observable<Team>> {
    return this.http.put<Team>(
      `${this.apiUrl}/${team_name}/out_reserver/${player_index}/${index_position}`,
      null
    );
  }

  async leavePlayer(id: string, player: string): Promise<Observable<Team>> {
    return this.http.put<Team>(`${this.apiUrl}/${id}/leave/${player}`, null);
  }

  async deleteTeam(id: string): Promise<Observable<Team>> {
    return this.http.delete<Team>(`${this.apiUrl}/${id}`);
  }

  async setConact(id: string, contact: string): Promise<Observable<string>> {
    return this.http.put<string>(`${this.apiUrl}/${id}/set_contact`, contact);
  }
}
