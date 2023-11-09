import { Component, ElementRef, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { PlayerpostService } from '../service/playerpost.service';
import { Playerpost } from '../model/playerpost';
import { NavbarComponent } from '../navbar/navbar.component';
import { PositionType, Team } from '../model/team';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../service/profile.service';
import { Profile } from '../model/profile';
import { MessageService } from '../service/message.service';
import { TeampostService } from '../service/teampost.service';
import { MessageType } from '../model/message';


@Component({
  selector: 'app-playerpost',
  templateUrl: './finder-player.component.html',
  styleUrls: ['./finder-player.component.css'],
})
export class FinderPlayerComponent {
  playerPostService: PlayerpostService = inject(PlayerpostService);

  nav: NavbarComponent = inject(NavbarComponent);
  profileService: ProfileService = inject(ProfileService);

  searchPositions: string[] = []; // Initialize an empty array
  @ViewChild('Content', { static: false })
  public messageProfileElement: ElementRef | undefined;

  profile?: Profile;
  selectedPlayer: Playerpost | undefined;
  selectedPlayer_img: string = '';

  team?: Team;
  playerPosts: Playerpost[] = [];
  playerPostsFilter: Playerpost[] = [];

  positionsData: PositionType[] = [];
  images: string[] = [];

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


  private pageIndex: number = 0;
  public pageSize: number = 7;
  public pageTotal: number = 7;
  public loadding: boolean = false;

  constructor(private messageService: MessageService, private teamPostService: TeampostService) {
  }

  async ngOnInit() {
    this.team = this.nav.team
    if (!this.team) {
      await this.setTeam()
    }
    this.profile = this.nav.profile
    if (!this.profile) {
      await this.setProfile();
    }
    await this.loadPlayerPosts();
  };

  async setProfile() {
    try {
      const profile_id = localStorage.getItem('profile') as string;
      this.profile = await (
        await this.profileService.getProfileById(profile_id)
      ).toPromise();
      localStorage.setItem('team', this.profile?.profileGame?.myTeam as string);
    } catch (error) {
      console.error('Error getting profile data:', error);
    }
  }

  async setTeam() {
    try {

      const teamId = localStorage.getItem('team') as string;
      this.team = await (
        await this.nav.teamService.getTeamById(teamId)
      ).toPromise();
    } catch (teamError) { }
  }

  getPlayerPosts() {
    const postData = this.playerPostsFilter.map((post, index) => ({
      post: post,
      image: this.images[index],
    }));

    return postData
  }

  async Postform() {

    const postPlayerData: Partial<Playerpost> = {
      profile: this.nav.getProfile(),
      positions: this.position,

    };

    (
      await this.playerPostService.createPost(postPlayerData as Playerpost)
    ).subscribe((res) => {
    },
      async (error) => {
        await this.ngOnInit();
      });
  }


  async setImages() {
    if (!this.playerPosts) {
      return;
    }

    for (let i = 0; i < this.playerPosts?.length; i++) {
      if (this.playerPosts[i].profile.imageProfileUrl) {
        (
          await this.nav.service.getImage(
            this.playerPosts[i].profile.imageProfileUrl as string
          )
        ).subscribe(
          (res) => { },
          (error) => {
            this.images[i] = error.error.text;
          }
        );
      }
    }
  }

  async onChecked(po: PositionType): Promise<void> {
    const index = this.selected_position.indexOf(po);

    if (index !== -1) {
      this.selected_position.splice(index, 1);
    } else {
      this.selected_position.push(po);
    }

    await this.filterPlayerPost();
  }

  async filterPlayerPost(): Promise<void> {
    if (this.selected_position.length === 5) {
      // If no positions selected, show all players
      this.playerPostsFilter = this.playerPosts;
    } else {
      // Filter players based on selected positions
      this.playerPostsFilter = this.playerPosts.filter((player) =>
        player.positions.some((position: PositionType) =>
          this.selected_position.includes(position)
        )
      );
    }
  }


  showDetail(i: number) {
    this.selectedPlayer = this.playerPosts[i];
    this.selectedPlayer_img = this.images[i];
  }

  async setPost(data: Playerpost[]) {
    this.playerPosts = [...this.playerPosts, ...data];

  }


  async loadPlayerPosts() {
    this.loadding = true;
    (
      this.playerPostService.getAllPlayerPost(this.pageIndex, this.pageSize)
    ).subscribe(
      async (data) => {
        await this.setPost(data);
        await this.setImages();
        this.pageTotal = data.length;
        this.pageIndex++;
        this.loadding = false;
        this.playerPostsFilter = this.playerPosts;
      },
      (error) => {
        this.pageTotal = -1;
      }
    );
  }

  @HostListener('scroll', ['$event'])
  async onScrollPlayerContenter(): Promise<void> {
    const nativeElement = this.messageProfileElement?.nativeElement;

    if (
      nativeElement.clientHeight + Math.round(nativeElement.scrollTop) >=
      nativeElement.scrollHeight - 10 &&
      !this.loadding
    ) {
      await this.loadPlayerPosts();
    }
  }

  async sendMesageInvtePlayer(name: string) {
    (await this.messageService.sendJoinTeam(this.team?.name as string, name, PositionType.reserver, MessageType.INVITE_TO_JOIN_TEAM)).subscribe((res) => {
      console.log(res)
    },
      (err) => {
        console.log(err)
      });
    alert("Success")
  }

}
