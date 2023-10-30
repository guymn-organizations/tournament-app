import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Image } from '../model/image';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GobalServiceService {
  private apiImageUrl = 'http://localhost:8000/images'; // Replace with your actual API URL

  constructor(private router: Router, private http: HttpClient) {}

  toPage(page: string) {
    this.router.navigate([page]);
  }

  async postImage(imgUrl: string): Promise<Observable<Image>> {
    return this.http.post<Image>(`${this.apiImageUrl}/${imgUrl}`, null);
  }

  async getImage(id: string): Promise<Observable<Image>> {
    return this.http.get<Image>(`${this.apiImageUrl}/${id}`);
  }
}
