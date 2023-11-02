import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Teampost } from '../model/teampost';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeampostService {
  
  private apiUrl = 'http://localhost:8000/team_post'

  constructor(private http: HttpClient) { }
  async createPost(Teampost: Teampost): Promise<Observable<Teampost>> {
    return this.http.post<Teampost>(`${this.apiUrl}/create`, Teampost);
  }

  async editPost(
    id: string,
    profile: Teampost
  ): Promise<Observable<Teampost>> {
    return this.http.put<Teampost>(`${this.apiUrl}/${id}`, profile);
  }
  getAllTeamPost(): Observable<Teampost[]> {
    return this.http.get<Teampost[]>(`${this.apiUrl}`);
  }
}
