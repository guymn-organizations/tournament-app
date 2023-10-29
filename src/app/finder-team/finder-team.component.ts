import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finder-team',
  templateUrl: './finder-team.component.html',
  styleUrls: ['./finder-team.component.css']
})
export class FinderTeamComponent implements OnInit{

    Name : String = '';
    users = [
      {
        name: 'DSL',
        poolhero: '75+'
      },
      {
        name: 'JG',
        poolhero: '75+'
      },
      {
        name: 'MID',
        poolhero: '75+'
      },
      {
        name: 'SUP',
        poolhero: '75+'
      },
  
  
    ]
  
    ngOnInit(): void {
     
    }
}
