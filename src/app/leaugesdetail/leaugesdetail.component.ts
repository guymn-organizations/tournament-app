import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tournament } from '../model/tournament';
import { LeaugesService } from '../service/leauges.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { TeamService } from '../service/team.service';
import { Team } from '../model/team';
import { TeamInTournament } from '../model/team-in-tournament';
import { Match } from '../model/match';

@Component({
  selector: 'app-leaugesdetail',
  templateUrl: './leaugesdetail.component.html',
  styleUrls: ['./leaugesdetail.component.css'],
})
export class LeaugesdetailComponent implements OnInit {
  tournamentService: LeaugesService = inject(LeaugesService);
  nav: NavbarComponent = inject(NavbarComponent);
  checkTab: string = '';
  checked_id: string = '';
  tournament!: Tournament;
  image: string | undefined;

  isOverview: boolean = true;
  isMatching: boolean = false;
  isTeamJoin: boolean = false;

  teamsInTour!: TeamInTournament[];

  matches: Match[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teamService: TeamService
  ) {
    this.ngOnInit();
  }

  async ngOnInit() {
    let data = localStorage.getItem('isOverview');
    this.isOverview = data == 'true';

    this.checkTab = this.router.url;
    this.route.paramMap.subscribe(async (params) => {
      const id = params.get('id');
      this.checked_id = id as string;
      await this.setTournament();
    });

    const tournamentId = this.checked_id;
    await this.AllTeamInTournament(tournamentId);

    this.getMatchesForTournament(this.checked_id);
  }

  async AllTeamInTournament(tournamentId: string) {
    // (
    //   await this.tournamentService.getAllTeamInTournament(tournamentId)
    // ).subscribe(
    //   (data: any[]) => {
    //     this.teamsInTour = data;
    //     if (this.teamsInTour.length === this.tournament.numberOfTeam) {
    //       this.createMatchesForTournament();
    //     }
    //   },
    //   (error) => {
    //     console.error('Error:', error);
    //   }
    // );
  }

  async setTournament() {
    (await this.tournamentService.getTournamentById(this.checked_id)).subscribe(
      async (res) => {
        this.tournament = res;
        await this.setImage();
      }
    );
  }

  async setImage() {
    if (!this.tournament) {
      return;
    }

    (
      await this.nav.service.getImage(this.tournament.imageTourUrl as string)
    ).subscribe(
      (res) => {},
      (error) => {
        console.log(error);
        this.image = error.error.text;
      }
    );
  }

  showTeamjoin() {
    this.isOverview = false;
    this.isMatching = false;
    this.isTeamJoin = true;
  }

  showOverview() {
    this.isOverview = true;
    this.isMatching = false;
    this.isTeamJoin = false;
  }

  showMatching() {
    this.isOverview = false;
    this.isMatching = true;
    this.isTeamJoin = false;
  }

  // Function to open the registration modal
  openRegisterModal() {
    const modal = document.getElementById('registerModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  // Function to close the registration modal
  closeRegisterModal() {
    const modal = document.getElementById('registerModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }

  async confirmTeamJoin() {
    try {
      const tourid = this.checked_id;
      const teamId = localStorage.getItem('team') as string;

      const team: Team | undefined = await (
        await this.teamService.getTeamById(teamId)
      ).toPromise();

      if (team) {
        const response = await (
          await this.tournamentService.addTeamToTournament(tourid, teamId, team)
        ).toPromise();

        console.log('Success:', response);
      } else {
        console.error('Team not found');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async createMatchesForTournament() {
    const tournamentId = this.checked_id;
    (
      await this.tournamentService.createMatchesForTournament(
        tournamentId,
        this.teamsInTour[0]
      )
    ).subscribe(
      (response) => {
        console.log('Matches created successfully:', response);
      },
      (error) => {
        console.error('Error creating matches:', error);
      }
    );
  }

  showAlertMessage() {
    alert('Registration is full.');
  }

  async getMatchesForTournament(tournamentId: string) {
    (
      await this.tournamentService.getAllMatchesForTournament(tournamentId)
    ).subscribe(
      (matches: Match[]) => {
        this.matches = matches;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
