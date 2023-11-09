import { Profile } from "./profile";
import { PositionType } from "./team";

export class Teampost {
  id!: string;
  profile!: Profile;
  positions!: PositionType[];
}

  