import { Team } from './team';

export class Match {
  id!: string;
  teamA!: Team;
  teamB!: Team;
  resultA: number[] = [0, 0];
  resultB: number[] = [0, 0];
  round!: number;
  startDate!: Date;
  nextMatch!: string;
  bo!: number;

  constructor() {}
}

export class Chat {}
