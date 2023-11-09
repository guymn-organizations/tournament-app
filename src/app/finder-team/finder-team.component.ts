import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Teampost } from '../model/teampost';
import { PositionType, Team } from '../model/team';
import { TeampostService } from '../service/teampost.service';
import { NgForm } from '@angular/forms';
import { MessageType } from '../model/message';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-finder-team',
  templateUrl: './finder-team.component.html',
  styleUrls: ['./finder-team.component.css'],
})
export class FinderTeamComponent {
  @ViewChild('Content', { static: false })
  public messageProfileElement: ElementRef | undefined;

  postService: TeampostService = inject(TeampostService);
  nav: NavbarComponent = inject(NavbarComponent);
  messaheService: MessageService = inject(MessageService);

  position: PositionType[] = [
    PositionType.DSL,
    PositionType.JG,
    PositionType.MID,
    PositionType.ADL,
    PositionType.SUP,
  ];

  selected_position: PositionType[] = [
    PositionType.DSL,
    PositionType.JG,
    PositionType.MID,
    PositionType.ADL,
    PositionType.SUP,
  ];

  teamPost: Teampost[] = [];
  teamPostFilter: Teampost[] = [];
  images: string[] = [];

  private pageIndex: number = 0;
  public pageSize: number = 5;
  public pageTotal: number = 5;
  public loadding: boolean = false;

  public show: boolean = true;

  team: Team | undefined;
  constructor() {}

  async ngOnInit() {
    this.team = this.nav.team;
    if (!this.team) {
      await this.setTeam();
    }
    await this.setFirstPost();
  }

  async setTeam() {
    const id = localStorage.getItem('team') as string;
    (await this.nav.teamService.getTeamById(id)).subscribe((res) => {
      this.team = res;
    });
  }

  async setFirstPost() {
    this.postService.getAllTeamPost(this.pageIndex, 10).subscribe(
      async (data) => {
        await this.setTeamPost(data);
        await this.setImage();
        this.pageTotal = data.length;
        this.pageIndex++;
        this.loadding = false;
        this.teamPostFilter = this.teamPost;
      },
      (err) => {
        this.pageTotal = -1;
      }
    );
  }

  async onChecked(po: PositionType): Promise<void> {
    const index = this.selected_position.indexOf(po);

    if (index !== -1) {
      this.selected_position.splice(index, 1);
    } else {
      this.selected_position.push(po);
    }

    await this.filterTeamPost();
  }

  async filterTeamPost(): Promise<void> {
    if (this.selected_position.length === 0) {
      this.teamPostFilter = this.teamPost.filter(
        (team) => team.positions.length == 0
      );
    } else {
      this.teamPostFilter = this.teamPost.filter((team) =>
        team.positions.some((position) =>
          this.selected_position.includes(position)
        )
      );
    }
  }

  async setTeamPost(teamPosts: Teampost[]) {
    this.teamPost.push(...teamPosts);
  }

  async setImage() {
    for (
      let index = this.pageIndex * this.pageSize;
      index < this.teamPost.length;
      index++
    ) {
      if (this.teamPost[index].team.imageTeamUrl) {
        (
          await this.nav.service.getImage(
            this.teamPost[index].team.imageTeamUrl
          )
        ).subscribe(
          (res) => {},
          (err) => {
            this.images[index] = err.error.text;
            console.log(this.images);
          }
        );
      }
    }
  }

  async loadPost() {
    this.loadding = true;

    this.postService.getAllTeamPost(this.pageIndex, this.pageSize).subscribe(
      async (data) => {
        await this.setTeamPost(data);
        await this.setImage();
        this.pageTotal = data.length;
        this.pageIndex++;
        this.loadding = false;
        this.teamPostFilter = this.teamPost;
      },
      (err) => {
        this.pageTotal = -1;
      }
    );
  }

  @HostListener('scroll', ['$event'])
  async onScrollPostContenter(): Promise<void> {
    const nativeElement = this.messageProfileElement?.nativeElement;

    if (
      nativeElement.clientHeight + Math.round(nativeElement.scrollTop) >=
        nativeElement.scrollHeight - 10 &&
      !this.loadding
    ) {
      await this.loadPost();
    }
  }

  selected_to_create: PositionType[] = [];

  cheangePage() {
    this.show = !this.show;
    this.selected_to_create = [];
  }

  checkToCreate(po: PositionType) {
    const index = this.selected_to_create.indexOf(po);
    if (index !== -1) {
      this.selected_to_create.splice(index, 1);
    } else {
      this.selected_to_create.push(po);
    }
  }

  async post() {
    const data: Partial<Teampost> = {
      team: this.team,
      positions: this.selected_to_create,
    };
    (await this.postService.createPost(data as Teampost)).subscribe((res) => {
      this.teamPost.unshift(res);
      this.cheangePage();
    });
  }

  async requestToJoinTeam(teamName: string) {
    if (!confirm(`Do you want to request ${teamName} for join team?`)) {
      return;
    }

    const profileGameName = localStorage.getItem('profileName') as string;

    (
      await this.messaheService.sendJoinTeam(
        teamName,
        profileGameName,
        PositionType.reserver,
        MessageType.REQUEST_TO_JOIN_TEAM
      )
    ).subscribe(
      (res) => {},
      (err) => {
        if (err.status == 200) {
          alert('Success to send REQUEST_TO_JOIN_TEAM message');
        }
      }
    );
  }

  checkMy(name: string) {
    return this.team?.name === name;
  }
}
