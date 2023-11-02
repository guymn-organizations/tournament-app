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
    tournamenType: [], // เพิ่ม tournamenType เข้ามาใน tournamentData
  };
  
  tournametType = [TournamenType.Free, TournamenType.Paid];

  tournament_type: TournamenType = TournamenType.Free;

  selectedImageURL: string | ArrayBuffer | null = null;

  constructor(private leauges: LeaugesService) {}

  async submitCreatetourForm(data: Tournament) {
    console.warn(data);
    (await this.leauges.addTournament(data)).subscribe((response) => {
      console.log('Response from service:', response);
    });
  }
}
