import { Team } from './team';

export class ProfileGame {
  name!: string;
  openId!: string;
  myTeam!: Team | null;
  imageGameUrl!: string;

  constructor() {}
}
