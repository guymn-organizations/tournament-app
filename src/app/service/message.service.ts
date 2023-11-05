import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message, MessageType } from '../model/message';
import { Observable } from 'rxjs';
import { PositionType } from '../model/team';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = 'http://localhost:8000/messages'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  async getMessage(idList: string[]): Promise<Observable<Message[]>> {
    let params = new HttpParams();
    idList.forEach((id) => {
      params = params.append('id', id);
    });

    return this.http.get<Message[]>(this.apiUrl, { params });
  }

  async sendJoinTeam(
    team_name: string,
    profile_game_name: string,
    positionType: PositionType,
    messageType: MessageType
  ): Promise<Observable<Message>> {
    return this.http.put<Message>(
      `${this.apiUrl}/${team_name}/${messageType}/${profile_game_name}`,
      positionType
    );
  }

  async sendToScrims(
    teamA: string,
    scrims_id: string,
    teamB: string
  ): Promise<Observable<Message>> {
    return this.http.put<Message>(
      `${this.apiUrl}/${teamA}/REQUEST_TO_JOIN_TEAM/${teamB}`,
      scrims_id
    );
  }
}
