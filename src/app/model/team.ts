import { Message } from './message';
import { Profile } from './profile';

export class Team {
  id!: string;
  name!: string;
  leader!: Profile;
  positions: {
    position_type: PositionType;
    position_name: string;
    player: Profile | null;
  }[] = [];
  teamReserve!: Profile[];
  imageTeamUrl!: string;
  messages!: string[];
  contact!: string;

  constructor() {}
}

export enum PositionType {
  DSL = 'DSL',
  JG = 'JG',
  MID = 'MID',
  ADL = 'ADL',
  SUP = 'SUP',
}

// constructor() {
//   this.positions.push({
//     position: 'DSL',
//     position_name: 'DARK SLAYER LANE',
//     player: null,
//   });
//   this.positions.push({
//     position: 'JG',
//     position_name: 'JUNGLE',
//     player: null,
//   });
//   this.positions.push({
//     position: 'MID',
//     position_name: 'MID LANE',
//     player: null,
//   });
//   this.positions.push({
//     position: 'ADL',
//     position_name: 'ABYSSAL DRAGON LANE',
//     player: null,
//   });
//   this.positions.push({
//     position: 'SUP',
//     position_name: 'SUPPORT',
//     player: null,
//   });
// }
