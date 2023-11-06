import { Component, OnInit, inject } from '@angular/core';
import { PlayerpostService } from '../service/playerpost.service';
import { Playerpost } from '../model/playerpost';
import { NavbarComponent } from '../navbar/navbar.component';
import { PositionType } from '../model/team';

@Component({
  selector: 'app-playerpost',
  templateUrl: './finder-player.component.html',
  styleUrls: ['./finder-player.component.css'],
})
export class FinderPlayerComponent {
  playerPostService: PlayerpostService = inject(PlayerpostService);
  nav: NavbarComponent = inject(NavbarComponent);

  playerPosts: Playerpost[] = [];

  positionsData: PositionType[] = [];
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
    this.playerPostService.getAllPlayerPost().subscribe((data) => {
      this.playerPosts = data;
    });
  }

  async Postform() {
    this.positionsData.push(this.playerPostData.position);

    const postPlayerData: Partial<Playerpost> = {
      profile: this.nav.getProfile(),
      positions: this.positionsData,
    };

    console.log(postPlayerData);

    (
      await this.playerPostService.createPost(postPlayerData as Playerpost)
    ).subscribe();
  }
}
