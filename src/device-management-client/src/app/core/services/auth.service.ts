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

  getCurrentUserName(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
     
      const payload = token.split('.')[1];
      const decodedJson = atob(payload);
      const decodedData = JSON.parse(decodedJson);
      
      
      return decodedData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    } catch (e) {
      return null;
    }
  }

  getCurrentUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      const decodedData = JSON.parse(atob(payload));
      
      // Extract the Role claim
      return decodedData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    } catch (e) {
      return null;
    }
  }

  isAdmin(): boolean {
    const role = this.getCurrentUserRole();
    // Adjust this string to match whatever your DB uses for admins!
    return role === 'Systems Administrator'; 
  }

}