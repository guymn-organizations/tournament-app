import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { PlayerpostService } from '../service/playerpost.service';
import { Playerpost } from '../model/playerpost';
import { NavbarComponent } from '../navbar/navbar.component';
import { PositionType } from '../model/team';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-playerpost',
  templateUrl: './finder-player.component.html',
  styleUrls: ['./finder-player.component.css'],
})
export class FinderPlayerComponent {
  @ViewChild('Content', { static: false })
  public messageProfileElement: ElementRef | undefined;

  postService: PlayerpostService = inject(PlayerpostService);
  nav: NavbarComponent = inject(NavbarComponent);

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

  playerPost: Playerpost[] = [];
  playerPostFilter: Playerpost[] = [];
  images: string[] = [];

  private pageIndex: number = 0;
  public pageSize: number = 5;
  public pageTotal: number = 5;
  public loadding: boolean = false;

  public show: boolean = true;

  constructor() {}

  async ngOnInit() {
    await this.setFirstPost();
  }

  async setFirstPost() {
    this.postService.getAllPlayerPost(this.pageIndex, 10).subscribe(
      async (data) => {
        await this.setPlayerPost(data);
        await this.setImage();
        this.pageTotal = data.length;
        this.pageIndex++;
        this.loadding = false;
        this.playerPostFilter = this.playerPost;
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

    await this.filterPlayerPost();
  }

  async filterPlayerPost(): Promise<void> {
    if (this.selected_position.length === 0) {
      // If no positions selected, show all players
      this.playerPostFilter = this.playerPost;
    } else {
      // Filter players based on selected positions
      this.playerPostFilter = this.playerPost.filter((player) =>
        player.positions.some((position) =>
          this.selected_position.includes(position)
        )
      );
    }
  }

  async setPlayerPost(playerPosts: Playerpost[]) {
    this.playerPost.push(...playerPosts);
  }

  async setImage() {
    for (
      let index = this.pageIndex * this.pageSize;
      index < this.playerPost.length;
      index++
    ) {
      if (this.playerPost[index].profile.imageProfileUrl) {
        (
          await this.nav.service.getImage(
            this.playerPost[index].profile.imageProfileUrl
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

    this.postService.getAllPlayerPost(this.pageIndex, this.pageSize).subscribe(
      async (data) => {
        await this.setPlayerPost(data);
        await this.setImage();
        this.pageTotal = data.length;
        this.pageIndex++;
        this.loadding = false;
        this.playerPostFilter = this.playerPost;
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
      // If the position is already in selected_to_create, remove it
      this.selected_to_create.splice(index, 1);
    } else {
      // If the position is not in selected_to_create, add it
      this.selected_to_create.push(po);
    }

  }
}
