// tournament.model.ts
import { TeamInTournament } from './team-in-tournament.model'; // Import any related models as needed
import { Match } from './match.model'; // Import any related models as needed

export class Tournament {
  id: string;
  name: string;
  detail: string;
  reward: number;
  startRegisterDate: Date;
  endRegisterDate: Date;
  startTourDate: Date;
  imageTourUrl: string;
  tournamenType: string; // Adjust the type as needed
  BOqualifyingRound: number;
  BOfinalRound: number;
  teamJoin: TeamInTournament[];
  status: string; // Adjust the type as needed
  matchList: Match[];

  constructor(
    id: string,
    name: string,
    detail: string,
    reward: number,
    startRegisterDate: Date,
    endRegisterDate: Date,
    startTourDate: Date,
    BOqualifyingRound: number,
    BOfinalRound: number,
    teamJoin: TeamInTournament[],
    status: string,
    matchList: Match[]
  ) {
    this.id = id;
    this.name = name;
    this.detail = detail;
    this.reward = reward;
    this.startRegisterDate = startRegisterDate;
    this.endRegisterDate = endRegisterDate;
    this.startTourDate = startTourDate;
    this.BOqualifyingRound = BOqualifyingRound;
    this.BOfinalRound = BOfinalRound;
    this.teamJoin = teamJoin;
    this.status = status;
    this.matchList = matchList;
  }
}
