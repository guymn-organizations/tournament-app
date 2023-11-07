import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Teampost } from '../model/teampost';
import { PositionType, Team } from '../model/team';
import { TeampostService } from '../service/teampost.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-finder-team',
  templateUrl: './finder-team.component.html',
  styleUrls: ['./finder-team.component.css']
})
export class FinderTeamComponent {
  teamPostService : TeampostService = inject(TeampostService)
  nav: NavbarComponent = inject(NavbarComponent);

  team?: Team;

  searchPositions: string[] = []; // Initialize an empty array

  teamPosts: Teampost[] = [];

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
  constructor() {}

  async ngOnInit() {
    console.log("reload")
    this.teamPostService.getAllTeamPost().subscribe(async (data) => {
      this.teamPosts = data;
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

    // console.log(List);
    // console.log (this.searchPositions)
    // return this.searchPositions.includes(position);
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
  getTeamPosts() {
    const postData = this.teamPosts.map((post, index) => ({
      post: post,
      image: this.images[index],
    }));
    return postData
  }


  async Postform() {


    const postTeamData: Partial<Teampost> = {
      profile: this.nav.getProfile(),
      positions: this.selectedPositions,
      
    };

    (
      await this.teamPostService.createPost(postTeamData as Teampost)
    ).subscribe((res) => {
    },
      async (error) => {
        await this.ngOnInit();
      });
      
  }
  async setImages() {
    if (!this.teamPosts) {
      return;
    }

    for (let i = 0; i < this.teamPosts?.length; i++) {
      (
        await this.nav.service.getImage(
          this.teamPosts[i].profile.imageProfileUrl as string
        )
      ).subscribe(
        (res) => { },
        (error) => {
          this.images[i] = error.error.text;
        }
      );
    }
  }
  onChange(event:any,index:any){
    console.log(event.target.checked)
    var cl = document.getElementsByClassName(index);
    if (event.target.checked) {
      console.log(index);
      for (let i = 0; i < cl.length; i++) {
        cl[i].classList.add("positions");
        
      }
      
    } else {
      for (let i = 0; i < cl.length; i++) {
        cl[i].classList.remove("positions");
        
      }
      
    }
}
  }


