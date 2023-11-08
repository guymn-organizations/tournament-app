import { TeamInTournament } from './team-in-tournament';

export class Match {
  id!: string;
  teamA!: TeamInTournament;
  teamB!: TeamInTournament;
  resultA: number[] = [0, 0];
  resultB: number[] = [0, 0];
  round!: number;
  startDate!: Date;
  
  constructor() {}
}

export class Chat {}
