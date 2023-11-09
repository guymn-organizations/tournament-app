import { Profile } from './profile';
import { PositionType, Team } from './team';

export class Teampost {
  id!: string;
  team!: Team;
  positions!: PositionType[];
}
