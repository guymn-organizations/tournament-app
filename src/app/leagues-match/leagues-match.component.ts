
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaugesService } from '../service/leauges.service';
import { TeamService } from '../service/team.service';
import { Match } from '../model/match';
import { MatchService } from '../service/match.service';

@Component({
  selector: 'app-leagues-match',
  templateUrl: './leagues-match.component.html',
  styleUrls: ['./leagues-match.component.css']
})

export class LeaguesMatchComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private router: Router,
    private teamService: TeamService,
    private tournamentService: LeaugesService,
    private matchService : MatchService){

  }
  
  checked_id: string = '';
  matches!: Match[];

  private pageIndex: number = 0;
  public pageSize: number = 5;
  public pageTotal: number = 5;
  public loadding: boolean = false;
  async ngOnInit(): Promise<void> {
    const currentUrl = this.router.url;

    const urlArray: string[] = currentUrl.split('/').filter((el) => el !== '');

    this.checked_id=urlArray[1];
    
    await this.getMatchList(this.checked_id);
    
  }





  async getMatchList(team_id: string): Promise<void> {
    try {
      this.loadding = true;
  
      // Call the getMatchList method from the MatchService
      const matchListResponse = await (await this.matchService.getMatchList(
        team_id,
        this.pageIndex,
        this.pageSize
      )).toPromise();
  
      // Check if matchListResponse is not undefined before assigning it
      if (matchListResponse !== undefined) {
        this.matches = matchListResponse;
  
        // Assuming you have information about the total number of matches available
        this.pageTotal = matchListResponse.length;
      } else {
        // Handle the case where matchListResponse is undefined
        console.error('Error: Match list response is undefined.');
      }
  
    } catch (error) {
      console.error('Error fetching match list:', error);
  
    } finally {
      this.loadding = false;
    }
  }
  
  
}