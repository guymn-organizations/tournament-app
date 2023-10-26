import { Component, OnInit, inject } from '@angular/core';
import { GobalServiceService } from '../service/gobal-service.service';
import { HttpClient } from '@angular/common/http';
import { Gender, Profile } from '../model/profile';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {}
  service: GobalServiceService = inject(GobalServiceService);
  isLogin: boolean = true;

  LoginData = {
    email: '',
    password: '',
  };

  registerData = {
    firstName: '',
    lastName: '',
    password: '',
    confirmpassword: '',
    date: undefined,
    gender: '',
    email: '',
  };

  constructor(private profileService: ProfileService) {
    this.OnInit();
  }

  OnInit() {
    let data = localStorage.getItem('isLogin');
    this.isLogin = data == 'true';
  }

  showLogin() {
    localStorage.setItem('isLogin', 'true');
    this.isLogin = true;
  }
  showRegister() {
    localStorage.setItem('isLogin', 'false');
    this.isLogin = false;
  }

  h3(): string {
    if (this.isLogin == true) {
      return 'LOG IN TO TOURNAMENT.GG';
    }
    return 'SIGN UP TO TOURNAMENT.GG';
  }

  submitLoginForm() {
    console.log(this.LoginData);
  }

  async submitRegisterForm() {
    if (this.registerData.password != this.registerData.confirmpassword) {
      return;
    }

    const newProfileData: Partial<Profile> = {
      firstName: this.registerData.firstName,
      lastName: this.registerData.lastName,
      password: this.registerData.password,
      birthday: this.registerData.date,
      gender: this.registerData.gender === 'Male' ? Gender.Male : Gender.Female,
      email: this.registerData.email,
    };

    (await this.profileService.createProfile(newProfileData as Profile)).subscribe(
      (response) => {
        console.log('Response:', response);
        // Handle the response here
      },
      (error) => {
        console.error('Error:', error);
        // Handle the error
      }
    );
  }
}
