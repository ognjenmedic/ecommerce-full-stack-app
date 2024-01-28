import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userState: BehaviorSubject<User | null>;
  private baseUrl: string = 'http://localhost:8080/users';

  constructor(private http: HttpClient, public auth0: Auth0Service) {
    this.userState = new BehaviorSubject<User | null>(null);

    this.auth0.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.auth0.user$.subscribe((auth0User) => {});
      } else {
        this.userState.next(null);
      }
    });
  }

  public get isAuthenticated(): Observable<boolean> {
    return this.auth0.isAuthenticated$;
  }

  public get currentUser(): Observable<User | null> {
    return this.userState.asObservable();
  }

  public initializeUserState(): void {
    this.auth0.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.auth0.idTokenClaims$.subscribe((tokenClaims) => {
          if (tokenClaims?.__raw) {
            const headers = new HttpHeaders({
              Authorization: `Bearer ${tokenClaims.__raw}`,
            });

            const params = new HttpParams()
              .set('auth0Id', tokenClaims['sub'])
              .set('name', tokenClaims['https://myecommerceapp.com/name'])
              .set('email', tokenClaims['https://myecommerceapp.com/email']);

            this.http
              .get<User>(`${this.baseUrl}/findOrCreate`, {
                headers: headers,
                params: params,
              })
              .subscribe(
                (userFromDb) => {
                  this.userState.next(userFromDb);
                },
                (error) => {
                  console.error('Error fetching user from backend', error);
                  this.userState.next(null);
                }
              );
          }
        });
      } else {
        this.userState.next(null);
      }
    });
  }

  public updateUserState(user: User | null): void {
    console.log('Updating user state:', user);
    this.userState.next(user);
    if (user) {
      const minimalUserInfo = {
        userId: user.userId,
        name: user.name,
      };
      localStorage.setItem('user', JSON.stringify(minimalUserInfo));
    } else {
      localStorage.removeItem('user');
    }
  }
}
