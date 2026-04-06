import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly TOKEN_KEY = 'jwt_token';

  login(credentials: any) {
    return this.http.post<{token: string}>(`${environment.apiUrl}/Auth/login`, credentials)
      .pipe(
        tap(response => {
          this.setToken(response.token);
        })
      );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  register(userData: any) {
    // We don't need to save a token here, just return the observable
    return this.http.post(`${environment.apiUrl}/Auth/register`, userData);
  }
}