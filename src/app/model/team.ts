import { Message } from './message';
import { Profile } from './profile';

export class Team {
  id!: string;
  name!: string;
  leader!: Profile;
  DSL!: Profile;
  JG!: Profile;
  MID!: Profile;
  ADL!: Profile;
  SUP!: Profile;
  teamReserve!: Profile[];
  messages!: Message[];

  constructor() {}
}
