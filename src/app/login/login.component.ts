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
  };
  RegisterData = {
    firstName: '',
    lastName: '',
    password: '',
    confirmpassword: '',
    day: '',
    month: '',
    year: '',
    gender: '',
    email: '',
  };

  showLogin() {
    this.isLogin = true;
  }
  showRegister() {
    this.isLogin = false;
  }
  submitLoginForm() {}
  submitRegisterForm() {}

  h3(): string {
    if (this.isLogin) {
      return 'LOG IN TO TOURNAMENT.GG';
    }
    return 'SIGN UP TO TOURNAMENT.GG'
  }
}
