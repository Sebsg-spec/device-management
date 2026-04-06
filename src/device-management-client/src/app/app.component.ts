import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  private router = inject(Router);

  // This check tells the HTML whether to show the sidebar or not
  isLoginPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/';
  }
}