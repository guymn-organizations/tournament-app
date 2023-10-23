import { Component, inject } from '@angular/core';
import { GobalServiceService } from '../service/gobal-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  service: GobalServiceService = inject(GobalServiceService);

  LoginData = {
    email: '',
    password: '',
  };
  RegisterData = {
    firstName: '',
    lastName: '',
    username: '',
    idCard: '',
    password: '',
    repeatPassword: '',
  };
  submitLoginForm(){
    
  }
  submitRegisterForm(){
    
  }
}
