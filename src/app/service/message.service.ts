import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../model/message';
import { Observable } from 'rxjs';

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
}
