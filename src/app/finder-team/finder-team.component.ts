import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Teampost } from '../model/teampost';
import { PositionType, Team } from '../model/team';
import { TeampostService } from '../service/teampost.service';
import { NgForm } from '@angular/forms';
import { Image } from '../model/image';
import { ProfileService } from '../service/profile.service';
import { Profile } from '../model/profile';
import { TeamService } from '../service/team.service';
import { MessageService } from '../service/message.service';
import { ProfileGame } from '../model/profile-game';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finder-team',
  templateUrl: './finder-team.component.html',
  styleUrls: ['./finder-team.component.css']
})
export class FinderTeamComponent {
  teamPostService: TeampostService = inject(TeampostService)
  nav: NavbarComponent = inject(NavbarComponent);

  profileService: ProfileService = inject(ProfileService);

  searchPositions: string[] = []; // Initialize an empty array
  profile?: Profile;
  selectedPlayer : any;
  teamPosts: Teampost[] = [];
  profileGame!: ProfileGame;
  positionTypes!: PositionType[];

  imageTeam: Image | undefined;
  team?: Team;

  positionsData: PositionType[] = [];

  selectedPositions: PositionType[] = [];

  position = [
    PositionType.DSL,
    PositionType.ADL,
    PositionType.JG,
    PositionType.MID,
    PositionType.SUP,
  ];

  teamPostData: any = {};

  constructor(private teamservice: TeamService, private messageService: MessageService ,private router: Router) { }

  async ngOnInit() {
    this.teamPostService.getAllTeamPost().subscribe(async (data) => {
      this.teamPosts = data;
      this.team = this.nav.team;
      await this.setImageTeam();
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
  getTeamPosts() {
    const postData = this.teamPosts.map((post, index) => ({
      post: post,
    }));
    return postData
  }
  async Postform() {


    const postTeamData: Partial<Teampost> = {
      profile: this.nav.getProfile(),
      positions: this.selectedPositions,
      //+teamimagess

    };

    (
      await this.teamPostService.createPost(postTeamData as Teampost)
    ).subscribe((res) => {
    },
      async (error) => {
        await this.ngOnInit();
      });

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
  async setImageTeam() {
    (
      await this.nav.service.getImage(this.team?.imageTeamUrl as string)
    ).subscribe(
      (res) => {},
      (result) => {
        this.imageTeam = result.error.text;
      }
    );
  }


  async showDetail(id: string) {

    this.selectedPlayer = this.teamPosts.find((post) => post.id === id);
    console.log(this.selectedPlayer)

    const teamId = localStorage.getItem('team') as string; // Replace with the actual team ID you want to fetch

    try {
      this.team = await (await this.teamservice.getTeamById(teamId)).toPromise();
      console.log(this.team); // Use the result you've already fetched
    } catch (error) {
      console.error('Error fetching team data:', error);
    }
  }
  

  async postFindPlayer(teamPostData: any) {
    try {
      await this.createPost(teamPostData);
    } catch (error) {
      console.error('Error creating post:', error);
      // Handle the error here
    }
  }

  async createPost(teamPostData: any) {
    try {
      // Call your service method to create a post
      const response = await this.teamPostService.createPost(teamPostData);
      console.log('Post created successfully:', response);
      // Handle the successful response here
    } catch (error) {
      console.error('Error creating post:', error);
      // Handle the error here
    }
  }
  
  // sendRequest(teamName: Team, profileGameName: ProfileGame, positionType: PositionType[]) {
  //   const requestData = {
  //     teamName: this.team?.name as string,
  //     profileGameName: this.profileGame.name as string,
  //     positionType: this.positionTypes as unknown as string
  //   };

  //   this.messageService.sendRequestToJoinTeam(requestData.teamName, requestData.profileGameName, requestData.positionType)
  //     .subscribe(
  //       response => {
  //         console.log('Request sent successfully', response);
  //         // Handle the success response here
  //       },
  //       error => {
  //         console.error('Error sending request', error);
  //         // Handle the error here
  //       }
  //     );
  // }
}


