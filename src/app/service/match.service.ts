import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from '../model/match';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private apiUrl = 'http://localhost:8000/match'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  async getMatchList(
    team_id: string,
    pageIndex: number,
    pageSize: number
  ): Promise<Observable<Match[]>> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<Match[]>(`${this.apiUrl}/${team_id}`, { params });
  }

  setMatchResult(
    matchId: string,
    team: string,
    resultType: string,
    score: number
  ): Observable<any> {
    const url = `${this.apiUrl}/${matchId}/results`;
    const body = { team, resultType, score };

    return this.http.put(url, body);
  }

  getMatchesByRound(
    round: number,
    pageIndex: number,
    pageSize: number,
    idList: string[]
  ): Observable<Match[]> {
    const params = new HttpParams()
      .set('round', round.toString())
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString())
      .set('idList', idList.join(','));

    return this.http.get<Match[]>(`${this.apiUrl}/round/${round}`, { params });
  }

  async getMatchesByTeam(teamId: string, pageIndex: number, pageSize: number): Promise<Observable<any>> {
    const url = `${this.apiUrl}/match/${teamId}?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this.http.get(url);
  }
}
