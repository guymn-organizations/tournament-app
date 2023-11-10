import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MatchService } from '../service/match.service';

@Component({
  selector: 'app-leagues-creater',
  templateUrl: './leagues-creater.component.html',
  styleUrls: ['./leagues-creater.component.css']
})
export class LeaguesCreaterComponent {
  matches: any[] = [];

  constructor(private matchService: MatchService) {}

  ngOnInit(): void {
    this.getMatchesByTeam(localStorage.getItem('team') as string); // Replace with the actual team ID
  }

  async getMatchesByTeam(teamId: string): Promise<void> {
    (await this.matchService.getMatchesByTeam(teamId, 0, 7)).subscribe(
      (response) => {
        this.matches = response;
        console.log('Matches for the team:', this.matches);
      },
      (error) => {
        console.error('Failed to retrieve matches:', error);
        // Handle error, show error message, etc.
      }
    );
  }
}
