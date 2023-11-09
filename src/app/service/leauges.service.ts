import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Tournament } from '../model/tournament';
import { Observable } from 'rxjs';
import { Team } from '../model/team';
import { Match } from '../model/match';


@Injectable({
  providedIn: 'root',
})
export class LeaugesService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:8000/tournament';

  async createTournament(
    data: Tournament,
    profile: string
  ): Promise<Observable<Tournament>> {
    return this.http.post<Tournament>(`${this.apiUrl}/create/${profile}`, data);
  }

  async getAllTournament(
    pageIndex: number,
    pageSize: number
  ): Promise<Observable<Tournament[]>> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<Tournament[]>(`${this.apiUrl}`, { params });
  }

  async getTournamentById(id: string): Promise<Observable<Tournament>> {
    return this.http.get<Tournament>(`${this.apiUrl}/${id}`);
  }

  async addTeamToTournament(
    tournamentId: string,
    teamId: string,
    team: Team
  ): Promise<Observable<any>> {
    return this.http.post(
      `${this.apiUrl}/${tournamentId}/teamJoin/${teamId}`,
      team
    );
  }

  async getAllTeamInTournament(tournamentId: string): Promise<Observable<any>> {
    return this.http.get(`${this.apiUrl}/${tournamentId}/team`);
  }

  async getAllMatchesForTournament(
    tournamentId: string
  ): Promise<Observable<Match[]>> {
    return this.http.get<Match[]>(`${this.apiUrl}/${tournamentId}/matches`);
  }
}
