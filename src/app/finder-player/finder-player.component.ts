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
  playerPostService: PlayerpostService = inject(PlayerpostService);
  nav: NavbarComponent = inject(NavbarComponent);

  searchPositions: string[] = []; // Initialize an empty array


  playerPosts: Playerpost[] = [];

  positionsData: PositionType[] = [];
  images: String[] = [];

  selectedPositions: PositionType[] = [];

  position = [
    PositionType.DSL,
    PositionType.ADL,
    PositionType.JG,
    PositionType.MID,
    PositionType.SUP,
  ];

  constructor() {
  }

  async ngOnInit() {
    // console.log("reload")
    this.playerPostService.getAllPlayerPost().subscribe(async (data) => {
      this.playerPosts = data;
      await this.setImages();
    });
  }

  isSelected(position: any): boolean {
    const List = position.positions;
    let positiondata = "";
    for (let i = 0; i < List.length; i++) {
      for (let j = 0; j < this.searchPositions.length; j++) {
        if (List[i] == this.searchPositions[j]) {
          positiondata = List[i];

          break;

        }

      }
    }
    return this.searchPositions.includes(positiondata);

    // console.log(List);
    // console.log (this.searchPositions)
    // return this.searchPositions.includes(position);
  }



  getPlayerPosts() {
    const postData = this.playerPosts.map((post, index) => ({
      post: post,
      image: this.images[index],
    }));
    // console.log(postData)
    return postData
  }

  async Postform() {

    const postPlayerData: Partial<Playerpost> = {
      profile: this.nav.getProfile(),
      positions: this.selectedPositions,

    };

    (
      await this.playerPostService.createPost(postPlayerData as Playerpost)
    ).subscribe((res) => {
    },
      async (error) => {
        await this.ngOnInit();
      });
  }


  async setImages() {
    if (!this.playerPosts) {
      return;
    }

    for (let i = 0; i < this.playerPosts?.length; i++) {
      (
        await this.nav.service.getImage(
          this.playerPosts[i].profile.imageProfileUrl as string
        )
      ).subscribe(
        (res) => { },
        (error) => {
          this.images[i] = error.error.text;
        }
      );
    }
  }

  onChange(event: any, positions: string) {
    if (event.target.checked) {
      // console.log(event.target)
      this.searchPositions.push(positions);

      // console.log(this.searchPositions)

    } else {
      const index = this.searchPositions.indexOf(positions);
      if (index !== -1) {
        this.searchPositions.splice(index, 1);
      }

    }
  }
  updateSelection(checked: any, position: PositionType): void {
    if (checked) {
      if (!this.selectedPositions.includes(position)) {
        this.selectedPositions.push(position);
      }
      else {
        const index = this.selectedPositions.indexOf(position);
        if (index !== -1) {
          this.selectedPositions.splice(index, 1);
        }
      }
    }
    // console.log(this.selectedPositions);

  }


}