import { Routes } from '@angular/router';
import { DeviceListComponent } from './features/devices/components/device-list/device-list.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'register', 
    loadComponent: () => import('./features/register/register.component').then(m => m.RegisterComponent) 
  },
  { 
    path: 'devices', 
    canActivate: [authGuard], // 2. Add the bouncer here!
    loadChildren: () => import('./features/devices/devices.routes').then(m => m.deviceRoutes) 
  },
  { path: '**', redirectTo: 'devices' }
];
