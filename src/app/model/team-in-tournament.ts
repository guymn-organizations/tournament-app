import { Team } from './team';

export class TeamInTournament {
  team: Team;
  score: number;
  win: number;
  lose: number;

  constructor(team: Team, score: number, win: number, lose: number) {
    this.team = team;
    this.score = score;
    this.win = win;
    this.lose = lose;
  }
}
