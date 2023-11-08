import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../model/profile';
import { ProfileGame } from '../model/profile-game';
import { Message } from '../model/message';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://localhost:8000/profiles'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  async createProfile(profile: Profile): Promise<Observable<Profile>> {
    return this.http.post<Profile>(`${this.apiUrl}/register`, profile);
  }

  async login(email: string, password: string): Promise<Observable<Profile>> {
    return this.http.get<Profile>(`${this.apiUrl}/login/${email}/${password}`);
  }

  async getProfileById(id: string): Promise<Observable<Profile>> {
    return this.http.get<Profile>(`${this.apiUrl}/${id}`);
  }

  async editProfile(
    id: string,
    profile: Profile
  ): Promise<Observable<Profile>> {
    return this.http.put<Profile>(`${this.apiUrl}/${id}`, profile);
  }

  async editProfileGame(
    id: string,
    profileGame: ProfileGame
  ): Promise<Observable<ProfileGame>> {
    return this.http.put<ProfileGame>(`${this.apiUrl}/${id}/game`, profileGame);
  }

  async getMessage(id: string): Promise<Observable<Message[]>> {
    return this.http.get<Message[]>(`${this.apiUrl}/${id}/message`);
  }
}
