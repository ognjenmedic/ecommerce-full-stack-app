import { Component, OnInit } from '@angular/core';
import Auth0Lock from 'auth0-lock';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-auth0',
  templateUrl: './login-auth0.component.html',
  styleUrls: ['./login-auth0.component.css'],
})
export class LoginAuth0Component implements OnInit {
  lock: any;

  constructor() {
    this.lock = new Auth0Lock(
      environment.auth0.clientId,
      environment.auth0.domain,
      {}
    );
  }

  ngOnInit(): void {}
}
