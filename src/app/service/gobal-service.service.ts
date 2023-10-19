import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GobalServiceService {
  constructor(private router: Router) {}

  toPage(page: string) {
    this.router.navigate([page]);
  }
}
