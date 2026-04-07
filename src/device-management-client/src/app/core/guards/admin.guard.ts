import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // If the user is an admin, let them through
  if (authService.isAdmin()) {
    return true;
  }

  // If they are not an admin, take them back to the list
  alert('Access Denied: You need Administrator privileges to view this page.');
  router.navigate(['/devices']);
  return false;
};