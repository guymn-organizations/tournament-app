import { ProfileGame } from "./profile-game";

export class Teampost {
    id!: string;
    profileGame!: ProfileGame;
    positon!: Position[];
}
export enum Position {
    DSL = 'DSL',
    JG = 'JG',
    MID = 'MID',
    ADL = 'ADL',
    SUP = 'SUP',
  }
  