import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../model/profile';
import { Observable } from 'rxjs';
import { ProfileGame } from '../model/profile-game';
import { Playerpost } from '../model/playerpost';

@Injectable({
  providedIn: 'root'
})
export class PlayerpostService {
  private apiUrl = 'http://localhost:8000/player_post'

  constructor(private http: HttpClient) { }
  async createPost(playerPost: Playerpost): Promise<Observable<Playerpost>> {
    return this.http.post<Playerpost>(`${this.apiUrl}/create`, playerPost);
  }

  async editPost(
    id: string,
    profile: Playerpost
  ): Promise<Observable<Playerpost>> {
    return this.http.put<Playerpost>(`${this.apiUrl}/${id}`, profile);
  }
  getAllPlayerPost(): Observable<Playerpost[]> {
    return this.http.get<Playerpost[]>(`${this.apiUrl}`);
  }

  async getProfileById(id: string): Promise<Observable<Profile>> {
    return this.http.get<Profile>(`${this.apiUrl}/${id}`);
  }
  
  }


