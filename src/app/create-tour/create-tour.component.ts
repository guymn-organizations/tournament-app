import { Component, OnInit, inject } from '@angular/core';

import { LeaugesService } from '../service/leauges.service';
import { Status, Tournament } from '../model/tournament';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { LeaugesComponent } from '../leauges/leauges.component';

@Component({
  selector: 'app-create-tour',
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.css'],
})
export class CreateTourComponent implements OnInit {
  leaugesService: LeaugesService = inject(LeaugesService);
  selectedImageURL: string | ArrayBuffer | null = null;

  tourData: Partial<Tournament> = {
    name: '',
    detail: '',
    reward: 0,
    fee: 0,
    status: Status.Register,
  };

  BO: number = 3;
  maxNumberTeam: number = 16;
  startDateMatch: Date | undefined;

  constructor(private router: Router) {}
  ngOnInit(): void {}

  submitCreatetourForm() {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.saveImage(file);
    }
  }

  saveImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        this.selectedImageURL = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  }

  async onSubmitCreateTour() {
    const data: Partial<Tournament> = {
      name: this.tourData.name,
      imageTourUrl: this.selectedImageURL as string,
      detail: this.tourData.detail,
      startDateMatch: this.startDateMatch,
      BO: this.BO,
      maxNumberTeam: this.maxNumberTeam,
      reward: this.tourData.reward,
      fee: this.tourData.fee,
    };

    console.log(data);
    (
      await this.leaugesService.addTournament(
        data as Tournament,
        localStorage.getItem('profile') as string
      )
    ).subscribe((res) => {
      this.goAllTour();
    });
  }

  goAllTour() {
    this.router.navigate(['leauges']);
  }
}
