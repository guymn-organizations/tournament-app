import { Injectable } from '@angular/core';
import { Advert } from '../model/advert';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdvertService {
  private apiUrl = 'http://localhost:8000/advert';

  constructor(private http: HttpClient) { }

  createAdvert(advert: FormData): Observable<Advert> {
    return this.http.post<Advert>(this.apiUrl + '/create', advert);
  }
}
