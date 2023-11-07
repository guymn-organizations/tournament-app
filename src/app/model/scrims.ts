import { Team } from './team';

export class Scrims {
  id!: string;
  teamA!: Team;
  teamB!: Team;
  startDate!: Date;

  constructor() {}
}
