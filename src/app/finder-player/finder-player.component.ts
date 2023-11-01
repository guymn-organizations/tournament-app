import { Component, OnInit, inject } from '@angular/core';
import { PlayerpostService } from '../service/playerpost.service';
import { Playerpost, Position } from '../model/playerpost';



@Component({
  selector: 'app-playerpost',
  templateUrl: './finder-player.component.html',
  styleUrls: ['./finder-player.component.css']
})
export class FinderPlayerComponent  {
  service : PlayerpostService = inject (PlayerpostService)
  playerPosts: Playerpost[] = [];
  id: string = ''; // Change this variable name to 'id' to match the HTML template
  profileGame: string = '';
  position: Position = Position.DSL; // Set a default value

  playerPostData = {
    id: '', // Match the variable name to 'id'
    profileGame: '',
    position: '',
  };

  constructor(private playerpostService: PlayerpostService) { }

  ngOnInit() {
    this.playerpostService.getAllPlayerPost().subscribe(data => {
      this.playerPosts = data;
    });
  }

  Postform() {
    const id = this.id; // Update this variable to 'id'
    const profileGame = this.profileGame;
    const position = this.position;

    console.log(id);
    console.log(profileGame);
    console.log(position);
  }

  async submitRegisterForm() {
    const newProfileData: Partial<Playerpost> = {
      id: this.playerPostData.id, // Match the variable name to 'id'
      // profileGame: this.playerPostData.profileGame,
      // position: this.playerPostData.position,
    };

    (
      await this.playerpostService.createPost(newProfileData as Playerpost)
    ).subscribe(
      (response) => {
        // Handle the response here
        console.log(response);
      },
      (error) => {
        console.log(error);
        // Handle the error
      }
    );
  }
}
