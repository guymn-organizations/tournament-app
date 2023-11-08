import { TeamInTournament } from "./team-in-tournament";

export class Match {
  id: string;
  teamA: TeamInTournament;
  teamB: TeamInTournament;
  startDate: Date;
  report: string[];
  chat: Chat[];
  result: number[]; // [ A, B ]

  constructor(
    id: string,
    teamA: TeamInTournament,
    teamB: TeamInTournament,
    startDate: Date,
    report: string[],
    chat: Chat[],
    result: number[]
  ) {
    this.id = id;
    this.teamA = teamA;
    this.teamB = teamB;
    this.startDate = startDate;
    this.report = report;
    this.chat = chat;
    this.result = result;
  }
}

export class Chat {}
