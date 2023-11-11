import { FormGroup } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css'],
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean;
  loginForm: FormGroup;

  constructor(public userService: UserService) {
    this.isAuthenticated = false;
  }

  ngOnInit(): void {}
}
