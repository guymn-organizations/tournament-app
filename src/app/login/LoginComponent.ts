import { Component, OnInit, inject } from '@angular/core';
import { GobalServiceService } from '../service/gobal-service.service';

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
    remember: false,
  };
  RegisterData = {
    firstName: '',
    lastName: '',
    password: '',
    confirmpassword: '',
    date: '',
    gender: '',
    email: '',
  };
  constructor() {
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
  submitLoginForm() {
    console.log(this.LoginData);
  }
  submitRegisterForm() {
    console.log(this.RegisterData);
  }

  h3(): string {
    if (this.isLogin == true) {
      return 'LOG IN TO TOURNAMENT.GG';
    }
    return 'SIGN UP TO TOURNAMENT.GG';
  }
}
