import { Component, OnInit, inject } from '@angular/core';
import { ScrimsService } from '../service/scrims.service';
import { Scrims } from '../model/scrims';
import { Team } from '../model/team';
import { ProfileTeamComponent } from '../profile-team/profile-team.component';
import { ProfileComponent } from '../profile/profile.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-profile-list-scrim',
  templateUrl: './profile-list-scrim.component.html',
  styleUrls: ['./profile-list-scrim.component.css'],
})
export class ProfileListScrimComponent implements OnInit {
  scrimsService: ScrimsService = inject(ScrimsService);
  nav: NavbarComponent = inject(NavbarComponent);

  isScrims: boolean = false;

  startDate: Date | undefined;
  scrims: Scrims[] | undefined;

  team?: Team;
  images: String[] = [];

  constructor() {}

  async ngOnInit(): Promise<void> {
    await this.setTeam();
    await this.setScrims();
  }

  getScrims() {
    return this.scrims?.map((scrim, index) => ({
      scrim: scrim,
      image: this.images[index],
    }));
  }
  postScrim() {
    this.isScrims = !this.isScrims;
  }

  getTextButtom(): string {
    return this.isScrims ? 'Show Scrims' : 'Post Scrims';
  }

  async createScrims() {
    const scrimsData: Partial<Scrims> = {
      startDate: this.startDate,
      teamA: this.team,
    };

    (await this.scrimsService.createScrims(scrimsData as Scrims)).subscribe(
      (respon) => {
        this.scrims?.push(respon);
      }
    );
    this.postScrim();
  }

  async setTeam() {
    try {
      const teamId = localStorage.getItem('team') as string;
      this.team = await (
        await this.nav.teamService.getTeamById(teamId)
      ).toPromise();
    } catch (teamError) {}
  }

  async setScrims() {
    const teamId = localStorage.getItem('team') as string;
    (await this.scrimsService.getScrimsByTeam(teamId)).subscribe((respon) => {
      this.scrims = respon;
      this.setImages();
    });
  }

  async setImages() {
    const images = this.scrims
      ?.map((scrim) =>
        this.team?.id === scrim.teamB?.id
          ? scrim.teamA.imageTeamUrl
          : scrim.teamB.imageTeamUrl
      )
      .filter((team) => team !== null); // Filter out potential null values

    if (!images) {
      return;
    }
    for (const item of images) {
      (await this.nav.service.getImage(item)).subscribe(
        (res) => {},
        (error) => {
          this.images.push(error.error.text);
        }
      );
    }
  }
}
