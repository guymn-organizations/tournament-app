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
import { ScrimsService } from '../service/scrims.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scrims',
  templateUrl: './scrims.component.html',
  styleUrls: ['./scrims.component.css', '../profile/profile.component.css'],
})
export class ScrimsComponent implements OnInit {
  @ViewChild('ScrimsContenter', { static: false })
  public messageProfileElement: ElementRef | undefined;

  nav: NavbarComponent = inject(NavbarComponent);
  scrimsService: ScrimsService = inject(ScrimsService);
  title: string = 'Scrims';
  discription: string = 'Find scrims to practice';
  team?: Team;

  public totalCount = 0;
  public pageIndex = 0;
  public pageSize = 10;
  loading: boolean = false;

  scrims_lists: { team: Team; image: string; scrims: Scrims[] }[] = [];
  image_id: string[] = [];

  constructor(private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.team = this.nav.team;
    if (!this.team) {
      await this.setTeam();
    }
    await this.addTeamToList(this.team as Team, '', []);
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

  async addTeamToList(team: Team, image: string, scrims: Scrims[]) {
    const dataToPush = {
      team: team,
      image: image,
      scrims: scrims,
    };
    this.scrims_lists.unshift(dataToPush);
    this.image_id.unshift(team.imageTeamUrl as string);
  }

  async setTeam() {
    try {
      const teamId = localStorage.getItem('team') as string;
      this.team = await (
        await this.nav.teamService.getTeamById(teamId)
      ).toPromise();
    } catch (teamError) {}
  }

  async setSceimsTeam() {
    for (
      let index = this.pageIndex * this.pageSize;
      index < this.scrims_lists.length;
      index++
    ) {
      (
        await this.scrimsService.getScrimsByTeamNoOpponent(
          this.scrims_lists[index].team.id
        )
      ).subscribe((respon) => {
        this.scrims_lists[index].scrims = [...respon];
      });
    }
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
      await this.setSceimsTeam();
      this.pageIndex++;
      this.loading = false;
    });
  }

  goDetail(scrims: { team: Team; image: string; scrims: Scrims[] }) {
    this.router.navigate(['/scrims', scrims.team.id]);
  }
}
