import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Teampost } from '../model/teampost';
import { PositionType } from '../model/team';
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
  async setImage() {
    for (let item of this.teamPosts) {

      (await this.nav.service.getImage(item.profile.imageProfileUrl)).subscribe((res) => {
      }, (error) => {
        this.images.push(error.error.text)
      })

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


