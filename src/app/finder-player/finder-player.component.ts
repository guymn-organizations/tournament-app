import { Component, OnInit, inject } from '@angular/core';
import { PlayerpostService } from '../service/playerpost.service';

@Component({
  selector: 'app-finder-player',
  templateUrl: './finder-player.component.html',
  styleUrls: ['./finder-player.component.css']
})
export class FinderPlayerComponent implements OnInit {
  service: PlayerpostService = inject(PlayerpostService);
  
  ngOnInit(): void {
   
  }


}
