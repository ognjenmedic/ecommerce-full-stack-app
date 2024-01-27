import { Injectable, Inject } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    public auth0: Auth0Service
  ) {}

  login(): void {
    this.auth0.loginWithRedirect();
  }

  logout(): void {
    this.auth0.logout();
  }
}
