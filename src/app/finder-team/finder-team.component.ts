import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Teampost } from '../model/teampost';
import { PositionType, Team } from '../model/team';
import { TeampostService } from '../service/teampost.service';
import { NgForm } from '@angular/forms';
import { Image } from '../model/image';
import { ProfileService } from '../service/profile.service';
import { Profile } from '../model/profile';

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

  teamPosts: Teampost[] = [];

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
  constructor() { }

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


  async getdataByid(id : any) {
      
    try {
      this.profile = await (
        await this.profileService.getProfileById(id)
      ).toPromise();

      localStorage.setItem('team', this.profile?.profileGame?.myTeam as string);
    } catch (error) {
      console.error('Error getting profile data:', error);
      
    }
    
  }
}


