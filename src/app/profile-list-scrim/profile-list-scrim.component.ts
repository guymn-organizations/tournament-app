import { Component, OnInit, inject } from '@angular/core';
import { ScrimsService } from '../service/scrims.service';
import { Scrims } from '../model/scrims';
import { Team } from '../model/team';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-list-scrim',
  templateUrl: './profile-list-scrim.component.html',
  styleUrls: [
    './profile-list-scrim.component.css',
    '../profile/profile.component.css',
  ],
})
export class ProfileListScrimComponent implements OnInit {
  scrimsService: ScrimsService = inject(ScrimsService);
  nav: NavbarComponent = inject(NavbarComponent);

  isScrims: boolean = false;

  startDate: Date | undefined;
  scrims: Scrims[] = [];

  team?: Team;
  images: String[] = [];

  constructor(private router: Router) {}

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
        this.scrims?.unshift(respon);
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
      ?.map((scrim) => {
        const teamAImage = scrim.teamA?.imageTeamUrl || '';
        const teamBImage = scrim.teamB?.imageTeamUrl || '';
        return this.team?.id === scrim.teamB?.id ? teamAImage : teamBImage;
      })
      .filter((team) => team !== null);

    if (!images) {
      return;
    }
    for (let i = 0; i < images.length; i++) {
      if (images[i]) {
        (await this.nav.service.getImage(images[i])).subscribe(
          (res) => {},
          (error) => {
            this.images[i] = error.error.text;
          }
        );
      }
    }
  }

  unImgTeam(scrim: Scrims) {
    if (scrim.teamA.id == this.team?.id) {
      return scrim.teamB.name[0];
    }
    return scrim.teamA.name[0];
  }

  checkTeamEnemy(scrims: Scrims): boolean {
    if (scrims.teamA == null || scrims.teamB == null) {
      return false;
    }
    return true;
  }

  async deleteScrims(scrim: Scrims) {
    if (confirm('Are you sure')) {
      (await this.scrimsService.deleteScrims(scrim.id)).subscribe(
        (res) => {},
        (error) => {
          if (error.status == 200) {
            alert(error.error.text);
            this.ngOnInit();
          }
        }
      );
    }
  }

  toTeamBDetail(id: string) {
    this.router.navigate(['/scrims', id], {
      queryParams: { myTeam: this.team?.name },
    });
  }
}
