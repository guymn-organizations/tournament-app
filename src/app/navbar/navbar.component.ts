import { Component, OnInit, inject } from '@angular/core';
import { GobalServiceService } from '../service/gobal-service.service';
import { ProfileService } from '../service/profile.service';
import { Profile } from '../model/profile';
import { TeamService } from '../service/team.service';
import { ProfileGame } from '../model/profile-game';
import { Team } from '../model/team';
import { Subscription } from 'rxjs';
import { Image } from '../model/image';

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
    '../../assets/img/nav/LEAUGES.png',
    '../../assets/img/nav/SCRIMS.png',
    '../../assets/img/nav/TOURNAMENT.png',
    '../../assets/img/nav/FINDER.png',
  ];

  profile?: Profile;
  profileSubscription: Subscription | undefined;
  imageProfile: Image | undefined;

  constructor() {}

  async ngOnInit() {
    await this.setProfile();
    await this.setProfileImage();
  }

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

  async setProfileImage() {
    (
      await this.service.getImage(this.profile?.imageProfileUrl as string)
    ).subscribe(
      (res) => {},
      (result) => {
        this.imageProfile = result.error.text;
      }
    );
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

  isLogin(): boolean {
    return !!this.profile;
  }

  isGame(): boolean {
    return !!this.profile?.profileGame;
  }

  navBarRow = this.navBarName.map((name, index) => ({
    name: name,
    img: this.navBarImg[index],
  }));

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

  logout() {
    localStorage.setItem('profile', '');
    this.profile = undefined;
    this.service.toPage('');
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
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
