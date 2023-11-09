import { Profile } from './profile';

export class Tournament {
  id: string | undefined;
  name: string | undefined;
  detail: string | undefined;
  reward: number | undefined;
  fee: number | undefined;
  startDateRegister: Date | undefined;
  startDateMatch: Date | undefined;
  imageTourUrl: string | undefined;
  BO: number | undefined;
  teamJoin: string[];
  status: Status | undefined;
  matchList: string[];
  maxNumberTeam: number | undefined;
  createer: Profile | undefined;

  constructor() {
    this.teamJoin = [];
    this.matchList = [];
  }
}

export enum Status {
  Register = 'Register',
  Competing = 'Competing',
  End = 'End',
}
