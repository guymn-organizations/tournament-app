import { Component, OnInit, inject } from '@angular/core';
import { PlayerpostService } from '../service/playerpost.service';
import { Playerpost } from '../model/playerpost';
import { NavbarComponent } from '../navbar/navbar.component';
import { PositionType } from '../model/team';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-playerpost',
  templateUrl: './finder-player.component.html',
  styleUrls: ['./finder-player.component.css'],
})
export class FinderPlayerComponent {
  position: PositionType[] = [
    PositionType.DSL,
    PositionType.JG,
    PositionType.MID,
    PositionType.ADL,
    PositionType.SUP,
  ];

  selected_position: PositionType[] = [
    PositionType.DSL,
    PositionType.JG,
    PositionType.MID,
    PositionType.ADL,
    PositionType.SUP,
  ];

  playerPost: Playerpost[] = [];
  playerPostFilter: Playerpost[] = [];

  constructor() {}

  async ngOnInit() {}

  async onChecked(po: PositionType): Promise<void> {
    const index = this.selected_position.indexOf(po);

    if (index !== -1) {
      this.selected_position.splice(index, 1);
    } else {
      this.selected_position.push(po);
    }

    await this.filterPlayerPost();
    console.log(this.selected_position);
  }

  async filterPlayerPost(): Promise<void> {
    if (this.selected_position.length === 0) {
      // If no positions selected, show all players
      this.playerPostFilter = this.playerPost;
    } else {
      // Filter players based on selected positions
      this.playerPostFilter = this.playerPost.filter((player) =>
        player.positions.some((position) =>
          this.selected_position.includes(position)
        )
      );
    }
  }
}
