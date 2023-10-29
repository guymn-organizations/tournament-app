import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finder-player',
  templateUrl: './finder-player.component.html',
  styleUrls: ['./finder-player.component.css']
})
export class FinderPlayerComponent implements OnInit {

  Name : String = '';
  users = [
    {
      image : "",
      name: 'DSL',
      poolhero: '75+'
    },
    {
      image : "",
      name: 'JG',
      poolhero: '75+'
    },
    {
      image : "",
      name: 'MID',
      poolhero: '75+'
    },
    {
      image : "",
      name: 'SUP',
      poolhero: '75+'
    },


  ]

  ngOnInit(): void {
   
  }


}
