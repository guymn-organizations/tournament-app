import { Component } from '@angular/core';

@Component({
  selector: 'app-create-tour',
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.css']
})
export class CreateTourComponent {
    tournamentData = {
    name: '',
    number: '',
    detail: '',
    reward: '',
    date: undefined,
    type: '',
    
  };
  selectedImageURL: string | ArrayBuffer | null = null;

  async submitCreatetourForm(){
   
  }
}
