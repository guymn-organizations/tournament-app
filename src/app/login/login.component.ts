import { Component, OnInit, inject } from '@angular/core';
import { GobalServiceService } from '../service/gobal-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  ngOnInit(): void {
   this.activeTab = localStorage.getItem('activeTab') || 'login';
  }
  service: GobalServiceService = inject(GobalServiceService);
  activeTab!: string;

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

  showlogin(){
    this.activeTab='login'
  }
  showRegister(){
    this.activeTab='register'
  }
  submitLoginForm(){
    
    
  }
  submitRegisterForm(){
    
   
  }
}
