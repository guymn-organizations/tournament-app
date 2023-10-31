import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Profile } from '../model/profile';
import { Image } from '../model/image';
import { map } from 'rxjs';

@Component({
  selector: 'app-profile-profile',
  templateUrl: './profile-profile.component.html',
  styleUrls: ['./profile-profile.component.css'],
})
export class ProfileProfileComponent {
  nav: NavbarComponent = inject(NavbarComponent);

  profileData = {
    first_name: this.nav.profile?.firstName,
    last_name: this.nav.profile?.lastName,
    email: this.nav.profile?.email,
    password: '',
    confirm_password: '',
    birthday: this.nav.profile?.birthday,
  };

  toEdit = false;
  errorMessage: string = '';

  selectedImageURL: string | ArrayBuffer | null = null;

  constructor() {}

  async setprofileData() {
    this.profileData.first_name = this.nav.profile?.firstName;
    this.profileData.last_name = this.nav.profile?.lastName;
    this.profileData.email = this.nav.profile?.email;
    this.profileData.birthday = this.nav.profile?.birthday;
  }
  isEdit(): boolean {
    return !!this.toEdit;
  }

  clickEdit() {
    this.setprofileData();
    this.toEdit = true;
  }

  clickOutEdit() {
    this.toEdit = false;
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

  async onSubmitEditForm() {
    if (this.profileData.password !== this.profileData.confirm_password) {
      this.errorMessage = 'Password and confirm do not math';
      return;
    }

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
          if (error.status == 200) {
            await this.deleteImage();
            this.nav.getProfile().imageProfileUrl = error.error.text;
            this.nav.getProfile().birthday = this.profileData.birthday as Date;
            this.nav.getProfile().firstName = this.profileData
              .first_name as string;
            this.nav.getProfile().lastName = this.profileData
              .last_name as string;
            this.nav.getProfile().email = this.profileData.email as string;
            this.nav.getProfile().password = this.profileData
              .password as string;
            await this.nav.updateProfile();
            await this.nav.setProfileImage();
          }
        }
      );

    this.clickOutEdit();
  }

  async deleteImage() {
    if (!!(this.selectedImageURL && this.nav.getProfile().imageProfileUrl)) {
      (
        await this.nav.service.deleteImageById(
          this.nav.getProfile().imageProfileUrl
        )
      ).subscribe();
    }
  }
}
