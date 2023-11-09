import { Component, OnInit, inject } from '@angular/core';
import { PlayerpostService } from '../service/playerpost.service';
import { Playerpost } from '../model/playerpost';
import { NavbarComponent } from '../navbar/navbar.component';
import { PositionType, Team } from '../model/team';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../service/profile.service';
import { Profile } from '../model/profile';
import { MessageService } from '../service/message.service';
import { TeampostService } from '../service/teampost.service';


@Component({
  selector: 'app-playerpost',
  templateUrl: './finder-player.component.html',
  styleUrls: ['./finder-player.component.css'],
})
export class FinderPlayerComponent {
  playerPostService: PlayerpostService = inject(PlayerpostService);

  nav: NavbarComponent = inject(NavbarComponent);
  profileService: ProfileService = inject(ProfileService);

  searchPositions: string[] = []; // Initialize an empty array

  profile?: Profile;
  selectedPlayer: any;

  team?: Team;

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

  constructor(private messageService: MessageService, private teamPostService: TeampostService) {
  }

  async ngOnInit() {
    this.playerPostService.getAllPlayerPost().subscribe(async (data) => {
      this.playerPosts = data;
      this.team = this.nav.team;
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

      this.searchPositions.push(positions);


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


  }

  showDetail(id: string) {
    this.selectedPlayer = this.playerPosts.find((post) => post.id === id);
    console.log(this.selectedPlayer)
  }

  sendJoinRequest() {
    // Construct the data you want to send.
    const teamName = this.team?.name as string;
    const profileGameName = this.profile?.profileGame?.name as string; // Replace with the actual game name.

    // Call your service method to send the request.
    this.messageService.sendRequestToJoinTeam(teamName, profileGameName)
      .subscribe(response => {
        // Handle the response from the service if needed.
        console.log('Join request sent successfully:', response);
        // You can also close the modal or perform any other action here.
      }, error => {
        // Handle any errors that occur during the request.
        console.error('Error sending join request:', error);
      });
  }

}