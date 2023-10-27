import { Component, OnInit, inject } from '@angular/core';
import { GobalServiceService } from '../service/gobal-service.service';
import { HttpClient } from '@angular/common/http';
import { Gender, Profile } from '../model/profile';
import { ProfileService } from '../service/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  service: GobalServiceService = inject(GobalServiceService);
  private profileService: ProfileService = inject(ProfileService);
  isLogin: boolean = true;

  errorMessage = ''; // Clear any previous error messages

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

  constructor(private router: Router) {
    this.OnInit();
  }

  OnInit() {
    let data = localStorage.getItem('isLogin');
    this.isLogin = data == 'true';
  }

  showLogin() {
    this.errorMessage = ''; // Clear any previous error messages
    localStorage.setItem('isLogin', 'true');
    this.isLogin = true;
  }

  showRegister() {
    this.errorMessage = ''; // Clear any previous error messages
    localStorage.setItem('isLogin', 'false');
    this.isLogin = false;
  }

  h3(): string {
    if (this.isLogin == true) {
      return 'LOG IN TO TOURNAMENT.GG';
    }
    return 'SIGN UP TO TOURNAMENT.GG';
  }

  async submitLoginForm() {
    (
      await this.profileService.login(
        this.LoginData.email,
        this.LoginData.password
      )
    ).subscribe(
      (response) => {
        // Handle the response here
        localStorage.setItem('profile', response.id);
        this.goHome();
      },
      (error) => {
        this.errorMessage = error.error;
        // Handle the error
      }
    );
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

    (
      await this.profileService.createProfile(newProfileData as Profile)
    ).subscribe(
      (response) => {
        // Handle the response here
        this.showLogin();
      },
      (error) => {
        this.errorMessage = error.error;
        // Handle the error
      }
    );
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
