import { Message } from './message';
import { Profile } from './profile';

export class Team {
  id: string;
  name: string;
  leader: Profile;
  DSL: Profile;
  JG: Profile;
  MID: Profile;
  ADL: Profile;
  SUP: Profile;
  teamReserve: Profile[];
  messages: Message[];

  constructor(
    id: string,
    name: string,
    leader: Profile,
    DSL: Profile,
    JG: Profile,
    MID: Profile,
    ADL: Profile,
    SUP: Profile,
    teamReserve: Profile[],
    messages: Message[]
  ) {
    this.id = id;
    this.name = name;
    this.leader = leader;
    this.DSL = DSL;
    this.JG = JG;
    this.MID = MID;
    this.ADL = ADL;
    this.SUP = SUP;
    this.teamReserve = teamReserve;
    this.messages = messages;
  }
}
