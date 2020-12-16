import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Login } from '../pages/home/login-model';

@Injectable({
  providedIn: 'root'
})

export class GlobalService {
  onHttpLogin = new Subject();
  isLogged = new Subject();
  onHttpGetProfile = new Subject();
  onHttpUpdateProfile = new Subject();
  constructor(private http: HttpClient, private route: Router) { }

  httpLogin(logins: Login): void {
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/auth/login'
    const data = {
      username: logins.username,
      password: logins.password
    };

    this.http.post(url,data).subscribe(
      (response: any) => {
        console.log('Success Response:',response);
        if (response.status === 'success') {
          this.onHttpLogin.next(response.data)
          this.isLogged.next(true);
        }
      },
      (error) => {
        console.log('Error Response: ',error);
      });
  }

  httpGetProfile(): void {
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/users/my';
    const token = this.getToken();

    this.http.get(url,{headers: new HttpHeaders().set('Authorization', 'Bearer '+token)
    }).subscribe(
      (response: any) => {
        console.log('this is from httpGetProfile Service', response);
        if(response.status === 'success') {
          this.onHttpGetProfile.next(response.data);
        }
      },
      (error: any) => {
        console.log('Error from httpGetProfile Service', error);
      }
    )
  }

  httpUpdateProfile(data: any): void {
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/users/my';
    const token = this.getToken();
    this.http.put(url, data, {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+token)
    }).subscribe(
      (response: any) => {
        console.log('this is from http update profile service', response);
        if (response.status === 'success') {
          this.onHttpUpdateProfile.next(response.data);
        }
      }, (error: any) => {

      }
    );
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.route.navigate(['/my-profile']);
  }

  getToken(): string {
    const token = localStorage.getItem('token') || '';
    return token;
  }

  checkLogStatus(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLogged.next(true);
    } else {
      this.isLogged.next(false);
    }
  }

  deleteToken(): void {
    localStorage.removeItem('token');
    this.isLogged.next(false);
    this.route.navigate(['/']);

  }
}
