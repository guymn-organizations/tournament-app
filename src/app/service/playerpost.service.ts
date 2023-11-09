import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../model/profile';
import { Observable } from 'rxjs';
import { ProfileGame } from '../model/profile-game';
import { Playerpost } from '../model/playerpost';

@Injectable({
  providedIn: 'root'
})
export class PlayerpostService {
  private apiUrl = 'http://localhost:8000/player_post';

  constructor(private http: HttpClient) { }

  createPost(playerPost: Playerpost): Observable<Playerpost> {
    return this.http.post<Playerpost>(`${this.apiUrl}/create`, playerPost);
  }

  editPost(id: string, profile: Playerpost): Observable<Playerpost> {
    return this.http.put<Playerpost>(`${this.apiUrl}/${id}`, profile);
  }

  getAllPlayerPost(pageIndex: number, pageSize: number): Observable<Playerpost[]> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<Playerpost[]>(`${this.apiUrl}`, { params });
  }
}
