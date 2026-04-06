import { Routes } from '@angular/router';
import { DeviceListComponent } from './features/devices/components/device-list/device-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'devices', 
    loadChildren: () => import('./features/devices/devices.routes').then(m => m.deviceRoutes) },
    { 
    path: 'login', 
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'register', 
    loadComponent: () => import('./features/register/register.component').then(m => m.RegisterComponent) 
  },
];
