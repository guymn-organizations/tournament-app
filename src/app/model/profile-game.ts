export class ProfileGame {
  name: string;
  openId: string;
  myTeam: Team;
  imageGameUrl: string;

  constructor(
    name: string,
    openId: string,
    myTeam: Team,
    imageGameUrl: string
  ) {
    this.name = name;
    this.openId = openId;
    this.myTeam = myTeam;
    this.imageGameUrl = imageGameUrl;
  }
}

export class Team {
  // Define the properties of Team here
}
