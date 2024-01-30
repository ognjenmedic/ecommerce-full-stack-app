import { FormGroup } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css'],
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean;
  loginForm: FormGroup;
  userName: string;

  constructor(public auth: AuthService, private userService: UserService) {
    this.isAuthenticated = false;
  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe((user: User | null) => {
      if (user) {
        this.userName = user.name;
      }
    });
  }

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout();
  }
}
