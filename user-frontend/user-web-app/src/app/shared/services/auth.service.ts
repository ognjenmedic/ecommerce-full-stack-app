import { Injectable, Inject } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated$: Observable<boolean>;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    public auth0: Auth0Service
  ) {
    this.isAuthenticated$ = this.auth0.isAuthenticated$;
  }

  isAuthenticated(): Observable<boolean> {
    return this.auth0.isAuthenticated$;
  }
  login(): void {
    this.auth0.loginWithRedirect();
  }

  logout(): void {
    this.auth0.logout();
  }

  getToken(): Observable<string> {
    return this.auth0.getAccessTokenSilently().pipe(
      catchError((err) => {
        console.error('Error fetching access token', err);
        return throwError(err);
      })
    );
  }
}
