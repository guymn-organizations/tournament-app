import { Component, inject } from '@angular/core';

import { LeaugesService } from '../service/leauges.service';
import { Status, TournamenType, Tournament } from '../model/tournament';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-create-tour',
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.css'],
})
export class CreateTourComponent {
  tournamentData = {
    name: '',
    detail: '',
    reward: 0,
    startRegisterDate: new Date(),
    endRegisterDate: new Date(),
    startTourDate: new Date(),
    BOqualifyingRound: 0,
    BOfinalRound: 0,
    // teamJoin: [],
    // status: [],
    // matchList: [],
    tournamenType: [],
  };

  selectedImageURL: string | ArrayBuffer | null = null;

  nav: NavbarComponent = inject(NavbarComponent);

  constructor(private leauges: LeaugesService, private router: Router) {}

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

  async submitCreatetourForm() {
    const tourData: Partial<Tournament> = {
      name: this.tournamentData.name,
      detail: this.tournamentData.detail,
      reward: this.tournamentData.reward,
      startRegisterDate: this.tournamentData.startRegisterDate,
      endRegisterDate: this.tournamentData.endRegisterDate,
      startTourDate: this.tournamentData.startTourDate,
      imageTourUrl: this.selectedImageURL as string,
      BOfinalRound: this.tournamentData.BOfinalRound,
      BOqualifyingRound: this.tournamentData.BOqualifyingRound,
      tournamenType: this.tournamentData.tournamenType,
    };
    console.log(tourData);

    (await this.leauges.addTournament(tourData as Tournament)).subscribe(
      (response) => {
        console.log('Response from service:', response);
        this.router.navigate(['/leauges']);
      }
    );
    if (this.isFormValid()) {
      this.router.navigate(['/leauges']);
    }
  }

  isFormValid() {
   
    return (
      this.tournamentData.name &&
      this.tournamentData.reward > 0 &&
      this.tournamentData.detail &&
      this.selectedImageURL &&
      this.tournamentData.tournamenType &&
      this.tournamentData.BOfinalRound &&
      this.tournamentData.BOqualifyingRound&&
      this.tournamentData.startRegisterDate !== null &&
      this.tournamentData.endRegisterDate !== null &&
      this.tournamentData.startTourDate !== null
    );
  }
}
