import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Advert } from '../model/advert.model';

@Injectable({
  providedIn: 'root',
})
export class AdvertService {
  private apiUrl = 'http://localhost:8000/advert';

  constructor(private http: HttpClient) {}

  getAllAdvert() :Observable<Advert>{
    return this.http.get<Advert>(this.apiUrl);
  }
}
