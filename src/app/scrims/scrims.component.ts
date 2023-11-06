import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Team } from '../model/team';
import { Scrims } from '../model/scrims';

@Component({
  selector: 'app-scrims',
  templateUrl: './scrims.component.html',
  styleUrls: ['./scrims.component.css', '../profile/profile.component.css'],
})
export class ScrimsComponent implements OnInit {
  @ViewChild('ScrimsContenter', { static: false })
  public messageProfileElement: ElementRef | undefined;

  nav: NavbarComponent = inject(NavbarComponent);
  title: string = 'Scrims';
  discription: string = 'Find scrims to practice';
  team?: Team;

  public totalCount = 0;
  public pageIndex = 0;
  public pageSize = 10;
  loading: boolean = false;

  scrims_lists: { team: Team; image: string; scrims: Scrims[] }[] = [];

  teams: Team[] = [];

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.team = this.nav.team;
    if (!this.team) {
      await this.setTeam();
    }

    // this.teams = [this.team as Team, ...this.teams];
    await this.setImageTeam();
    await this.loadTeamScrims();
  }

  @HostListener('scroll', ['$event'])
  async onScrollScrimsContenter(): Promise<void> {
    const nativeElement = this.messageProfileElement?.nativeElement;

    console.log(
      nativeElement.clientHeight + Math.round(nativeElement.scrollTop),
      nativeElement.scrollHeight
    );
    if (
      nativeElement.clientHeight + Math.round(nativeElement.scrollTop) ===
      nativeElement.scrollHeight
    ) {
      // await this.loadTeamScrims();
    }
  }

  async setTeam() {
    try {
      const teamId = localStorage.getItem('team') as string;
      this.team = await (
        await this.nav.teamService.getTeamById(teamId)
      ).toPromise();
    } catch (teamError) {}
  }

  async setImageTeam() {
    (
      await this.nav.service.getImage(this.team?.imageTeamUrl as string)
    ).subscribe(
      (res) => {},
      (result) => {
        if (result.error.text) {
          this.team!.imageTeamUrl = result.error.text;
        }
      }
    );
  }

  async loadTeamScrims() {
    this.loading = true;
    console.log(this.team?.name);
    (
      await this.nav.teamService.getTeamToShowScrims(
        this.pageIndex,
        this.pageSize
      )
    ).subscribe((data) => {
      this.teams = [...this.teams, ...data];
      this.loading = false;
      console.log(data);
    });
  }

  async addScrimsList(team: Team, image: string, scrims: Scrims[]) {
    const scrimsData = {
      team: team,
      image: image, // Corrected property name to match the scrims_lists structure
      scrims: scrims,
    };

    this.scrims_lists.push(scrimsData);
  }
}
