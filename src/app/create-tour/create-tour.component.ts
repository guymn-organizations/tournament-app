import { Component, inject } from '@angular/core';

import { LeaugesService } from '../service/leauges.service';
import { Status, TournamenType, Tournament } from '../model/tournament';

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

 

  constructor(private leauges: LeaugesService) {}

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
      }
    );
  }
}
