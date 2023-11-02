import { Component } from '@angular/core';
import { Leauges } from '../model/leauges';
import { LeaugesService } from '../service/leauges.service';

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
      startRegisterDate: '', // ใช้ข้อมูลจากฟอร์ม
      endRegisterDate: '', // ใช้ข้อมูลจากฟอร์ม
      startTourDate: '', // ใช้ข้อมูลจากฟอร์ม
      imageTourUrl: '', // ใช้ข้อมูลจากฟอร์ม
      tournamenType: '', // ใช้ข้อมูลจากฟอร์ม
      BOqualifyingRound: 0, // ใช้ข้อมูลจากฟอร์ม
      BOfinalRound: 0, // ใช้ข้อมูลจากฟอร์ม
      teamJoin: [], // ใช้ข้อมูลจากฟอร์ม (แนะนำสร้างอ็อบเจกต์เปล่า หรือสร้างโครงสร้างสำหรับ TeamInTournament)
      status: {}, // ใช้ข้อมูลจากฟอร์ม (แนะนำสร้างอ็อบเจกต์เปล่า หรือสร้างโครงสร้างสำหรับ Status)
      matchList: [] // ใช้ข้อมูลจากฟอร์ม (แนะนำสร้างอ็อบเจกต์เปล่า หรือสร้างโครงสร้างสำหรับ Match)
    
  };
  selectedImageURL: string | ArrayBuffer | null = null;

  constructor(private leauges: LeaugesService) {}
  submitCreatetourForm(data:Leauges){
   this.leauges.addTournament(data).subscribe((result)=>{
    console.warn(result);
    
   })
  }
}
