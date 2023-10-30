import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { GobalServiceService } from '../service/gobal-service.service';
import { ProfileService } from '../service/profile.service';
import { Profile } from '../model/profile';
import { Router } from '@angular/router';
import { TeamService } from '../service/team.service';
import { ProfileGame } from '../model/profile-game';
import { Team } from '../model/team';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  service: GobalServiceService = inject(GobalServiceService);
  profileService: ProfileService = inject(ProfileService);
  teamService: TeamService = inject(TeamService);

  menu = false;
  navBarName = ['leauges', 'scrims', 'tournament', 'finder'];
  navBarImg = [
    '../../assets/img/nav/SCRIMS.png',
    '../../assets/img/nav/LEAUGES.png',
    '../../assets/img/nav/TOURNAMENT.png',
    '../../assets/img/nav/FINDER.png',
  ];

  @Input() profile: Profile | undefined;

  constructor(private router: Router) {}

  async ngOnInit() {
    await this.getProfileById(localStorage.getItem('profile') as string);
  }

  getProfile(): Profile {
    if (this.profile) {
      return this.profile;
    }

    return new Profile();
  }

  getProfileGame(): ProfileGame {
    if (this.profile?.profileGame) {
      return this.profile.profileGame;
    }

    return new ProfileGame();
  }

  getMyTeam(): Team {
    if (this.profile?.profileGame.myTeam) {
      return this.profile.profileGame.myTeam;
    }

    return new Team();
  }

  isLogin(): boolean {
    return !!this.profile;
  }

  navBarRow = this.navBarName.map((name, index) => ({
    name: name,
    img: this.navBarImg[index],
  }));

  toPage(page: string) {
    this.router.navigate([page]);
  }

  clickMenu() {
    this.menu = !this.menu;
  }

  checkTab() {
    return true;
  }

  toProfile(page: string) {
    this.service.toPage(page);
  }

  goLogin(data: string) {
    localStorage.setItem('isLogin', data);
    this.service.toPage('login');
  }

  async getProfileById(id: string) {
    (await this.profileService.getProfile(id)).subscribe(
      (respon) => {
        this.profile = respon;
        console.log(this.profile);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logout() {
    localStorage.setItem('profile', '');
    this.profile = undefined;
    this.toPage('');
  }

  async updateProfile() {
    (
      await this.profileService.editProfile(
        this.profile?.id as string,
        this.profile as Profile
      )
    ).subscribe(
      (response) => {
        console.log(response);
        console.log(this.profile);
      },
      (error) => {
        console.log(error);
        console.log(this.profile);
      }
    );
  }
}
