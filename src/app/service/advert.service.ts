import { Injectable } from '@angular/core';
import { Advert } from '../model/advert';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdvertService {
  private apiUrl = 'http://localhost:8000/advert';

  constructor(private http: HttpClient) { }

  async createAdvert(advert: Advert): Promise<Observable<Advert>> {
    return this.http.post<Advert>(this.apiUrl + '/create', advert)
  }
}
