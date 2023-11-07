import { TeamInTournament } from "./team-in-tournament";

export class Match {
    id: string;
    teamA: TeamInTournament;
    teamB: TeamInTournament;
    startDate: Date;
    report: string[];
    chat: Chat[];
    result: number[]; // [ A, B ]
    round: string;
  
    constructor(
      id: string,
      teamA: TeamInTournament,
      teamB: TeamInTournament,
      startDate: Date,
      report: string[],
      chat: Chat[],
      result: number[],
      round: string
    ) {
      this.id = id;
      this.teamA = teamA;
      this.teamB = teamB;
      this.startDate = startDate;
      this.report = report;
      this.chat = chat;
      this.result = result;
      this.round = round;
    }
  }
  
  export class Chat {
    
  }