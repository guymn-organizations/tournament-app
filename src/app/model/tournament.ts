import { Match } from "./match";
import { TeamInTournament } from "./team-in-tournament";


export class Tournament {
  
  name: string | undefined;
  detail: string | undefined;
  reward: number| undefined;
  startRegisterDate: Date| undefined;
  endRegisterDate: Date| undefined;
  startTourDate: Date| undefined;
  imageTourUrl: string| undefined;
  tournamenType: TournamenType[]| undefined; // Adjust the type as needed
  BOqualifyingRound: number| undefined;
  BOfinalRound: number| undefined;
  // teamJoin: TeamInTournament[]| undefined;
  // status: Status[]| undefined; // Adjust the type as needed
  // matchList: Match[]| undefined;

  constructor(){

  }
}

export enum Status {
    รอดำเนินการ='รอดำเนินการ',
    เปิดรับสมัคร='เปิดรับสมัคร',
    ปิดรับสมัคร='ปิดรับสมัคร',
    กำลังแข่งขัน='กำลังแข่งขัน',
    จบการแข่งขัน='จบการแข่งขัน'
  }
  
export enum TournamenType {
    Free='Free',
    Paid='Paid'
}

