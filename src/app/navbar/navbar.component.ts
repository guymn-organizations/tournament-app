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
  profileid: string | null;

  constructor(private router: Router) {
    this.profileid = localStorage.getItem('profile');
  }

  async ngOnInit() {
    await this.getProfileById();
  }

  getProfile(): Profile {
    if (this.profile) {
      return this.profile;
    }

    return new Profile();
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

  async getProfileById() {
    if (!this.profileid) {
      return;
    }

    try {
      this.profile = await (
        await this.profileService.getProfile(this.profileid)
      ).toPromise();
    } catch (error) {
      // Handle the error
      console.error(error);
    }
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
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
