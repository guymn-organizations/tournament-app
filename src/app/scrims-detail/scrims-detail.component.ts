import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../service/team.service';
import { ScrimsService } from '../service/scrims.service';
import { Team } from '../model/team';
import { Scrims } from '../model/scrims';
import { GobalServiceService } from '../service/gobal-service.service';

@Component({
  selector: 'app-scrims-detail',
  templateUrl: './scrims-detail.component.html',
  styleUrls: [
    './scrims-detail.component.css',
    '../profile/profile.component.css',
  ],
})
export class ScrimsDetailComponent implements OnInit {
  teamService: TeamService = inject(TeamService);
  scrimsService: ScrimsService = inject(ScrimsService);
  service: GobalServiceService = inject(GobalServiceService);

  team: Team | undefined;
  image_team: string | undefined;
  images_player: string[] = [];
  scrims: Scrims[] = [];

  team_id: string | undefined;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.team_id = params['id'];
    });
  }
  async ngOnInit(): Promise<void> {
    await this.setTeam();
  }

  async setImageTeam() {
    if (!this.team?.imageTeamUrl) {
      return;
    }

    (await this.service.getImage(this.team?.imageTeamUrl)).subscribe(
      (res) => {},
      (error) => {
        if (error.status == 200) {
          this.image_team = error.error.text;
        }
      }
    );
  }

  async setImagePlayer() {
    if (!this.team?.positions) {
      return;
    }
    for (let index = 0; index < this.team?.positions.length; index++) {
      if (this.team.positions[index].player?.imageProfileUrl) {
        (
          await this.service.getImage(
            this.team.positions[index].player?.imageProfileUrl as string
          )
        ).subscribe(
          (res) => {},
          (error) => {
            if (error.status == 200) {
              this.images_player[index] = error.error.text;
            }
          }
        );
      }
    }
  }

  async setTeam() {
    (await this.teamService.getTeamById(this.team_id as string)).subscribe(
      async (res) => {
        this.team = res;
        await this.setImageTeam();
        await this.setImagePlayer();
      }
    );
  }
}
