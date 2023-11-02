import { Profile } from "./profile";
import { ProfileGame } from "./profile-game";
import { PositionType } from "./team";

export class Teampost {
    id!: string;
  profile!: Profile;
  positions!: PositionType[];
}

  