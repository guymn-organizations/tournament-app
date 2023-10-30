import { Component, OnInit } from '@angular/core';
import { PlayerpostService } from '../service/playerpost.service';
import { Playerpost } from '../model/playerpost';


@Component({
  selector: 'app-playerpost',
  templateUrl: './finder-player.component.html',
  styleUrls: ['./finder-player.component.css']
})
export class FinderPlayerComponent implements OnInit {
  playerPosts: Playerpost[] = [];

  constructor(private playerpostService: PlayerpostService) { }

  ngOnInit() {
    this.playerpostService.getAllPlayerPost().subscribe(data => {
      this.playerPosts = data;
    });
  }

  }

