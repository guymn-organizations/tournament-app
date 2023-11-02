import { Message } from './message';
import { ProfileGame } from './profile-game';

export class Profile {
  id!: string;
  birthday!: Date;
  email!: string;
  firstName!: string;
  gender!: Gender;
  lastName!: string;
  password!: string;
  imageProfileUrl!: string;
  profileGame!: ProfileGame ;
  messages!: Message[];

  constructor() {}
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}
