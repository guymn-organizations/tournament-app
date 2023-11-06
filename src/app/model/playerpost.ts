import { Profile } from './profile';
import { PositionType } from './team';

export class Playerpost {
  id!: string;
  profile!: Profile;
  positions!: PositionType[];
}
