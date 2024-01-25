import { AuthService } from '@auth0/auth0-angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegistrationData } from 'src/app/models/registration-data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userState: BehaviorSubject<User | null>;
  private baseUrl: string = 'http://localhost:8080/users';

  constructor(private http: HttpClient, public auth: AuthService) {
    this.userState = new BehaviorSubject<User | null>(null);

    this.auth.isAuthenticated$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.auth.user$.subscribe((auth0User) => {
          if (auth0User) {
            // Map Auth0 user properties to your User interface
            const user: User = {
              userId: auth0User.sub,
              name: auth0User.name || '',
              email: auth0User.email || '',
              wishlists: [],
            };
            this.userState.next(user);
            localStorage.setItem('user', JSON.stringify(user));
          }
        });
      } else {
        this.userState.next(null);
        localStorage.removeItem('user');
      }
    });
  }

  public register(registrationData: RegistrationData): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, registrationData);
  }

  public login(email: string, password: string): Observable<any> {
    const url = `https://${environment.auth0.domain}/oauth/token`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      grant_type: 'password',
      username: email,
      password: password,
      scope: 'openid profile email', // adjust the scope as needed
      client_id: environment.auth0.clientId,
    };

    return this.http.post(url, body, { headers });
  }

  public logout(): void {
    this.auth.logout();
    this.userState.next(null);
    localStorage.removeItem('user');
  }

  public get isAuthenticated(): boolean {
    return !!this.userState.value;
  }

  public get currentUser(): Observable<User | null> {
    return this.userState.asObservable();
  }

  public updateUserState(user: User | null): void {
    this.userState.next(user);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }

  public initializeUserState(): void {
    const userState = JSON.parse(localStorage.getItem('user'));
    if (userState) {
      this.userState.next(userState);
    }
  }
}
