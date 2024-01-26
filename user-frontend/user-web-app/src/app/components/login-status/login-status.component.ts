import { FormGroup } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css'],
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean;
  loginForm: FormGroup;
  userProfile: any;

  constructor(
    public userService: UserService,
    public authService: AuthService
  ) {
    this.isAuthenticated = false;
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isLoggedIn();
    this.userProfile = this.authService.getUserProfile();
  }

  logout() {
    this.authService.logout();
  }
}
