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
  TournamenType = TournamenType; 
  tournamentData = {
    name: '',
    detail: '',
    reward: 0,
    startRegisterDate: new Date(),
    endRegisterDate: new Date(),
    startTourDate: new Date(),
    bOqualifyingRound: 0,
    bOfinalRound: 0,
    teamJoin: [],
    
    matchList: [],
    tournamenType: [] as TournamenType[], 
    numberOfTeam : 0
  };
  
  status = [
    Status.รอดำเนินการ,
    Status.เปิดรับสมัคร,
    Status.เปิดรับสมัคร,
    Status.กำลังแข่งขัน,
    Status.จบการแข่งขัน,
  ];
  
  qrcodeImageURL: string | ArrayBuffer | null = null;

  selectedImageURL: string | ArrayBuffer | null = null;
  
  nav: NavbarComponent = inject(NavbarComponent);

  constructor(private leauges: LeaugesService, private router: Router) {}

  onFileSelected(event: any, imageType: string) {
    const file: File = event.target.files[0];
  
    if (file) {
      if (imageType === 'image') {
        this.saveImage(file);
      } else if (imageType === 'qrcode') {
        this.saveQrImage(file);
      }
    }
  }

  saveImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        this.selectedImageURL = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  }

  saveQrImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        this.qrcodeImageURL = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  }

  async submitCreatetourForm() {
    const tourData: Partial<Tournament> = {
      name: this.tournamentData.name.toUpperCase(),
      detail: this.tournamentData.detail,
      reward: this.tournamentData.reward,
      startRegisterDate: this.tournamentData.startRegisterDate,
      endRegisterDate: this.tournamentData.endRegisterDate,
      startTourDate: this.tournamentData.startTourDate,
      imageTourUrl: this.selectedImageURL as string,
      bOfinalRound: this.tournamentData.bOfinalRound,
      bOqualifyingRound: this.tournamentData.bOqualifyingRound,
      payments:this.qrcodeImageURL as string,
      numberOfTeam: this.tournamentData.numberOfTeam,
      tournamenType:this.tournamentData.tournamenType
   
      
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
      this.tournamentData.bOfinalRound &&
      this.tournamentData.bOqualifyingRound&&
      this.tournamentData.numberOfTeam&&
      this.tournamentData.startRegisterDate !== null &&
      this.tournamentData.endRegisterDate !== null &&
      this.tournamentData.startTourDate !== null
    );
  }
}
