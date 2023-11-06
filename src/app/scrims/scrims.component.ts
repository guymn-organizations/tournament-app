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
  image_id: string[] = [];

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.team = this.nav.team;
    if (!this.team) {
      await this.setTeam();
    }
    await this.loadTeamScrims();
  }

  @HostListener('scroll', ['$event'])
  async onScrollScrimsContenter(): Promise<void> {
    const nativeElement = this.messageProfileElement?.nativeElement;

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
      const dataToPush = {
        team: this.team as Team,
        image: '',
        scrims: [],
      };
      this.scrims_lists.unshift(dataToPush);
      this.image_id.unshift(this.team?.imageTeamUrl as string);
    } catch (teamError) {}
  }

  async setImageTeam() {
    for (
      let index = this.pageIndex * this.pageSize;
      index < this.image_id.length;
      index++
    ) {
      (await this.nav.service.getImage(this.image_id[index])).subscribe(
        (res) => {},
        (result) => {
          if (result.status == 200) {
            this.scrims_lists[index].image = result.error.text;
          }
        }
      );
    }
  }

  async setTeamScrims(teamsData: Team[]) {
    for (let index = 0; index < teamsData.length; index++) {
      const dataToPush = {
        team: teamsData[index],
        image: '',
        scrims: [],
      };
      this.scrims_lists.push(dataToPush);
      this.image_id.push(teamsData[index].imageTeamUrl);
    }
  }

  async loadTeamScrims() {
    this.loading = true;
    (
      await this.nav.teamService.getTeamToShowScrims(
        this.pageIndex,
        this.pageSize
      )
    ).subscribe(async (data) => {
      const teamsData = data.filter((team) => team.name != this.team?.name);
      await this.setTeamScrims(teamsData);
      await this.setImageTeam();
      this.pageIndex++;
      this.loading = false;
    });
  }
}
