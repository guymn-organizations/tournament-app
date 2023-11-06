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
  
  selectedPositions: string[] = []; // Initialize an empty array


  selectedRole: PositionType | null = null;
  playerPosts: Playerpost[] = [];

  positionsData: PositionType[] = [];
  images: String[] = [];

  // selectedPositions: PositionType[] = [];

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
    console.log("reload")
    this.playerPostService.getAllPlayerPost().subscribe(async (data) => {
      this.playerPosts = data;
      await this.setImage();
    });
  }

  isSelected(position: PositionType): boolean {
    return this.selectedPositions.includes(position);
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
    console.log(this.selectedPositions);

  }

  getPlayerPosts() {
    const postData = this.playerPosts.map((post, index) => ({
      post: post,
      image: this.images[index],
    }));
    return postData
  }

  async Postform() {

    const postPlayerData: Partial<Playerpost> = {
      profile: this.nav.getProfile(),
      // positions: this.selectedPositions,

    };

    (
      await this.playerPostService.createPost(postPlayerData as Playerpost)
    ).subscribe((res) => {
    },
      async (error) => {
        await this.ngOnInit();
      });
  }

  async setImage() {
    for (let item of this.playerPosts) {

      (await this.nav.service.getImage(item.profile.imageProfileUrl)).subscribe((res) => {
      }, (error) => {
        this.images.push(error.error.text)
      })

    }
  }
  onChange(event: any, positions: string) {
    if (event.target.checked) {
        this.selectedPositions.push(positions);
    } else {
        const index = this.selectedPositions.indexOf(positions);
        if (index !== -1) {
            this.selectedPositions.splice(index, 1);
        }
    }
}


}