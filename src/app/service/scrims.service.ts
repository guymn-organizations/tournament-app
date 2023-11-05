import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Scrims } from '../model/scrims';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrimsService {
  private apiUrl = 'http://localhost:8000/scrims'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  async getScrimsByTeam(id: string): Promise<Observable<Scrims[]>> {
    return this.http.get<Scrims[]>(`${this.apiUrl}/${id}`);
  }

  async createScrims(scrims: Scrims): Promise<Observable<Scrims>> {
    return this.http.post<Scrims>(`${this.apiUrl}/create`, scrims);
  }

  async setTeamB(id: string, team_name: string): Promise<Observable<Scrims>> {
    return this.http.put<Scrims>(`${this.apiUrl}/${id}/add_teamB`, team_name);
  }
}
