import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service'; // 1. Import this!

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  private router = inject(Router);
  private authService = inject(AuthService); 

  get isAuthPage(): boolean {
    const url = this.router.url;
    return url === '/login' || url === '/register' || url === '/';
  }


  get userName(): string {
    return this.authService.getCurrentUserName() || 'Guest User';
  }

  get userRole(): string {
    return this.authService.getCurrentUserRole() || 'Unassigned Role';
  }

  get userInitials(): string {
    const name = this.authService.getCurrentUserName();
    if (!name) return '?';
    
    // Splits "Noah Garcia" into ["Noah", "Garcia"] and takes the first letter of each
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  logout(): void {
    this.authService.logout();
  }
}