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

  ngOnInit() {
    this.teamPostService.getAllTeamPost().subscribe((data) => {
      this.teamPosts = data;
    });
  }

  async Postform() {


    const postTeamData: Partial<Teampost> = {
      profile: this.nav.getProfile(),
      positions: this.positionsData,
      
    };

    console.log(postTeamData);

    (
      await this.teamPostService.createPost(postTeamData as Teampost)
    ).subscribe();
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

}
