import { FormGroup } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css'],
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean;
  loginForm: FormGroup;

  constructor(public auth: AuthService) {
    this.isAuthenticated = false;
  }

  ngOnInit(): void {}

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout();
  }
}
