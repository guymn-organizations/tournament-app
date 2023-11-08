// team-in-tournament.model.ts
import { Team } from './team'; // Import the Team model if you have one

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

