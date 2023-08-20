import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userState: BehaviorSubject<User>;
  private baseUrl;
  constructor(private http: HttpClient, private router: Router) {
    this.userState = new BehaviorSubject(null);
    this.baseUrl = 'http://localhost:8080';
  }

  public register(userData: any) {
    return this.http.post<any>(`${this.baseUrl}/users/register`, userData);
  }

  public login() {
    return this.http.get<any>('http://localhost:3000/signedUpUsersList');
  }

  public logout() {
    this.userState.next(null);
    localStorage.removeItem('user');
  }

  public get isAuthenticated() {
    return !!this.userState.value;
  }
}
