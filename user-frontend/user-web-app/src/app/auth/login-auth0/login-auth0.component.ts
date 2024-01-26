import { Component, OnInit } from '@angular/core';
import Auth0Lock from 'auth0-lock';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-auth0',
  templateUrl: './login-auth0.component.html',
  styleUrls: ['./login-auth0.component.css'],
})
export class LoginAuth0Component implements OnInit {
  lock: any;

  constructor(private authService: AuthService) {
    this.lock = new Auth0Lock(
      'kUHAtTVJXEjoCZN8ZCDysh8sP3NCTTbv',
      'dev-6hrw2jmffjkxk80w.us.auth0.com',
      {
        container: 'auth0-lock-container',
        allowSignUp: false, // Disable sign-up tab
        theme: {
          primaryColor: '#000',
          logo: '',
        },
        languageDictionary: {
          title: 'Login to your account',
        },
        auth: {
          redirectUrl: 'http://localhost:4200/',
          responseType: 'token id_token',
          params: {
            scope: 'openid email profile',
          },
        },
      }
    );
  }

  ngOnInit(): void {
    this.lock.show();
    const accessToken = '...'; // Extracted from Auth0 callback
    const idToken = '...'; // Extracted from Auth0 callback
    this.authService.storeTokens(accessToken, idToken);
  }
}
