import { Team } from './team';

export class TeamInTournament {
  id: string | undefined;
  team: Team | undefined;
  win: number = 0;

  constructor(team?: Team, win: number = 0) {
    this.team = team;
    this.win = win;
  }
}
