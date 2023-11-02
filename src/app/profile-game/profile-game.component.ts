import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Gender, Profile } from '../model/profile';
import { ProfileService } from '../service/profile.service';
import { ProfileGame } from '../model/profile-game';
import { Image } from '../model/image';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile-game',
  templateUrl: './profile-game.component.html',
  styleUrls: ['./profile-game.component.css'],
})
export class ProfileGameComponent implements OnInit {
  nav: NavbarComponent = inject(NavbarComponent);
  profileService: ProfileService = inject(ProfileService);

  selectedImageURL: string | ArrayBuffer | null = null;

  profileGameData = {
    name: '',
    openid: '',
  };

  toEdit = false;

  profileGame: ProfileGame | undefined;

  constructor() {}
  async ngOnInit(): Promise<void> {
    await this.setImageGame();
  }

  async setProfileGameData() {
    this.profileGameData.name = this.nav.getProfile().profileGame
      ?.name as string;
    this.profileGameData.openid = this.nav.getProfile().profileGame
      ?.openId as string;
  }

  isConnect(): boolean {
    return !!this.nav.getProfile().profileGame && !this.toEdit;
  }

  async clickEdit() {
    await this.setProfileGameData();
    this.toEdit = !this.toEdit;
  }

  async onSubmitConnectForm() {
    await this.setProfileGame();
    this.toEdit = false;
  }

  async setProfileGame() {
    const imageData: Partial<Image> = {
      imageUrl: this.selectedImageURL as string,
    };

    (await this.nav.service.postImage(imageData as Image))
      .pipe(
        map((response) => response['text']()) // Use ['text'] to access the text() method
      )
      .subscribe(
        (result) => console.log(result),
        async (error) => {
          if (error.status == 406) {
          } else if (error.status == 200) {
            if (!this.nav.getProfile().profileGame) {
              this.nav.getProfile().profileGame = new ProfileGame();
            }
            this.nav.getProfile().profileGame.name = this.profileGameData.name;
            this.nav.getProfile().profileGame.openId =
              this.profileGameData.openid;
            this.nav.getProfile().profileGame.imageGameUrl = error.error.text;

            this.nav.updateProfile();
          }
        }
      );
  }

  getGenderIcon(): string {
    if (this.nav.profile?.gender == Gender.Female) {
      return ' bi h1 m-2 bi-gender-female';
    } else {
      return ' bi h1 m-2 bi-gender-male';
    }
  }

  checkMessage(): boolean {
    return this.nav.getProfile().messages?.length == 0;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.saveImage(file);
    }
  }

  saveImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        this.selectedImageURL = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  }

  async setImageGame() {
    console.log(this.nav.profile);
    // (
    //   await this.nav.service.getImage(this.nav.getProfileGame().imageGameUrl)
    // ).subscribe(
    //   (respon) => {},
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }
}
