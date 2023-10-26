import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../model/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://localhost:8000/profiles'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  async createProfile(profile: Profile): Promise<Observable<Profile>> {
    return this.http.post<Profile>(`${this.apiUrl}/register`, profile);
  }
}
