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



  get isAuthPage(): boolean {
    const url = this.router.url;
    return url === '/login' || url === '/register' || url === '/';
  }
}