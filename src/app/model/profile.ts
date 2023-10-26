import { Message } from './message';
import { ProfileGame } from './profile-game';

export class Profile {
  id: string;
  birthday: Date;
  email: string;
  firstName: string;
  gender: Gender;
  lastName: string;
  password: string;
  imageProfileUrl: string;
  profileGame: ProfileGame;
  messages: Message[];

  constructor(
    id: string,
    birthday: Date,
    email: string,
    firstName: string,
    gender: Gender,
    lastName: string,
    password: string,
    imageProfileUrl: string,
    profileGame: ProfileGame,
    messages: Message[]
  ) {
    this.id = id;
    this.birthday = birthday;
    this.email = email;
    this.firstName = firstName;
    this.gender = gender;
    this.lastName = lastName;
    this.password = password;
    this.imageProfileUrl = imageProfileUrl;
    this.profileGame = profileGame;
    this.messages = messages;
  }
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}
