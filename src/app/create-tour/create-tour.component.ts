import { Component } from '@angular/core';

import { LeaugesService } from '../service/leauges.service';
import { TournamenType, Tournament } from '../model/tournament';

@Component({
  selector: 'app-create-tour',
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.css']
})
export class CreateTourComponent {
  
    tournamentData = {
      id: '', // ให้ id เป็นสตริงว่างไว้หรือกำหนดค่าที่เหมาะสม
      name: '', // ใช้ข้อมูลจากฟอร์ม
      detail: '', // ใช้ข้อมูลจากฟอร์ม
      reward: 0, // ใช้ข้อมูลจากฟอร์ม
      startRegisterDate: new Date(), // ใช้ข้อมูลจากฟอร์ม
      endRegisterDate: new Date(), // ใช้ข้อมูลจากฟอร์ม
      startTourDate: new Date(), // ใช้ข้อมูลจากฟอร์ม
      imageTourUrl: '', // ใช้ข้อมูลจากฟอร์ม
      
      BOqualifyingRound: 0, // ใช้ข้อมูลจากฟอร์ม
      BOfinalRound: 0, // ใช้ข้อมูลจากฟอร์ม
      teamJoin: [], // ใช้ข้อมูลจากฟอร์ม (แนะนำสร้างอ็อบเจกต์เปล่า หรือสร้างโครงสร้างสำหรับ TeamInTournament)
      status: {}, // ใช้ข้อมูลจากฟอร์ม (แนะนำสร้างอ็อบเจกต์เปล่า หรือสร้างโครงสร้างสำหรับ Status)
      matchList: [] // ใช้ข้อมูลจากฟอร์ม (แนะนำสร้างอ็อบเจกต์เปล่า หรือสร้างโครงสร้างสำหรับ Match)
    
  };
  tournametType=[
   TournamenType.Free,
   TournamenType.Paid
  ];
  

  tournament_type: TournamenType = TournamenType.Free;
  

  constructor(private leauges: LeaugesService) {}
  
  
  async submitCreatetourForm(data: Tournament) {
    
  }
}
