import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Teampost } from '../model/teampost';
import { PositionType } from '../model/team';
import { TeampostService } from '../service/teampost.service';

@Component({
  selector: 'app-finder-team',
  templateUrl: './finder-team.component.html',
  styleUrls: ['./finder-team.component.css']
})
export class FinderTeamComponent {
  teamPostService : TeampostService = inject(TeampostService)
  nav: NavbarComponent = inject(NavbarComponent);

  teamPosts: Teampost[] = [];

  positionsData: PositionType[] = [];
  Image : String[] = [];
  playerPostData = {
    position: PositionType.DSL,
  };

  position = [
    PositionType.DSL,
    PositionType.ADL,
    PositionType.JG,
    PositionType.MID,
    PositionType.SUP,
  ];
  constructor() {}

  ngOnInit() {
    this.teamPostService.getAllTeamPost().subscribe((data) => {
      this.teamPosts = data;
    });
  }

  async Postform() {
    this.positionsData.push(this.playerPostData.position);

    const postPlayerData: Partial<Teampost> = {
      profile: this.nav.getProfile(),
      positions: this.positionsData,
      
    };

    console.log(postPlayerData);

    (
      await this.teamPostService.createPost(postPlayerData as Teampost)
    ).subscribe();
  }
}
