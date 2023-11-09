import { Injectable } from '@angular/core';
import { Advert } from '../model/advert';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdvertService {
  private apiUrl = 'http://localhost:8000/advert';

  constructor(private http: HttpClient) { }

  async createAdvert(advert: Advert): Promise<Observable<Advert>> {
    return this.http.post<Advert>(this.apiUrl + '/create', advert)
  }

  // getAllAdvert(): Observable<Advert[]> {
  //   return this.http.get<Advert[]>(this.apiUrl);
  // }


  async getAllAdvert(
    pageIndex: number,
    pageSize: number
  ): Promise<Observable<Advert[]>> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<Advert[]>(`${this.apiUrl}`, { params });
  }

}