import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userState: BehaviorSubject<User | null>;
  private baseUrl: string = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {
    const user = JSON.parse(localStorage.getItem('user'));
    this.userState = new BehaviorSubject<User | null>(user);
  }

  public register(userData: any): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, userData);
  }

  public login(email: string, password: string): Observable<User> {
    const credentials = { email, password };
    return this.http.post<User>(`${this.baseUrl}/login`, credentials).pipe(
      tap((user) => {
        this.userState.next(user);
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  public logout(): void {
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
    const now = new Date();

    if (userState && now.getTime() > userState.expiry) {
      localStorage.removeItem('user');
    } else if (userState) {
      this.userState.next(userState);
    }
  }
}
