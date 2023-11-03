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
    imageTourUrl: '',
    BOqualifyingRound: 0,
    BOfinalRound: 0,
    // teamJoin: [],
    // status: [],
    // matchList: [],
    tournamenType: [], 
  };

  // tournametType = [TournamenType.Free, TournamenType.Paid];

  // tournament_type: TournamenType = TournamenType.Free;

  selectedImageURL: string | ArrayBuffer | null = null;

  imageBase64: string | null = null;

  constructor(private leauges: LeaugesService) {}
  
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          this.imageBase64 = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }
  async submitCreatetourForm(data: Tournament) {
    console.warn(data);
    (await this.leauges.addTournament(data)).subscribe((response) => {
      console.log('Response from service:', response);
    });
  }
}
