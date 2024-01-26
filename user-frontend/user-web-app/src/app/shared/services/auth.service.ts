import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  handleAuthCallback() {
    console.log('Handling authentication callback');
    const fragment = window.location.hash.substr(1);
    const params = new URLSearchParams(fragment);
    const accessToken = params.get('access_token');
    const idToken = params.get('id_token');

    if (accessToken && idToken) {
      console.log('Access Token:', accessToken);
      console.log('ID Token:', idToken);
      this.storeTokens(accessToken, idToken);
      window.location.hash = ''; // Clear the URL fragment
      this.router.navigate(['/']); // Redirect to a safe URL
    } else {
      this.router.navigate(['/login']); // Or to an error page
    }
  }

  storeTokens(accessToken: string, idToken: string) {
    sessionStorage.setItem('access_token', accessToken);
    sessionStorage.setItem('id_token', idToken);
  }
  getAccessToken(): string {
    return sessionStorage.getItem('access_token');
  }

  getIdToken(): string {
    return sessionStorage.getItem('id_token');
  }

  getAuthenticatedHeaders(): HttpHeaders {
    const token = this.getAccessToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  isLoggedIn(): boolean {
    const accessToken = this.getAccessToken();

    return !!accessToken;
  }

  get isAuthenticated(): boolean {
    return this.isLoggedIn();
  }

  getUserProfile(): any {
    const idToken = this.getIdToken();
    console.log('ID Token:', idToken); // For debugging
    if (idToken) {
      try {
        return jwtDecode(idToken);
      } catch (error) {
        console.error('Error decoding ID token:', error);
        return null;
      }
    }
    return null;
  }

  logout() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('id_token');

    this.router.navigate(['/']);
  }
}
