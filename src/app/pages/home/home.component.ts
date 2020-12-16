import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { Login } from './login-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLogged: any;

  logins: Login = {
    username: '',
    password: ''
  };

  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {
    this.globalService.isLogged.subscribe(
      (logged: any) => {
        console.log('isLogged', logged);
        this.isLogged = logged
      }
    );
    console.log('old value:', this.logins)
    this.globalService.checkLogStatus();
  }

  onLogin(): void {
    console.log('new value:', this.logins)
    this.globalService.httpLogin(this.logins);
    this.globalService.onHttpLogin.subscribe(
      (response: any) => {
        const token = response.token;
        this.globalService.setToken(token);
        console.log('Response: ', response);
        console.log('token: ',this.globalService.getToken());
      }
    );
  }



}
