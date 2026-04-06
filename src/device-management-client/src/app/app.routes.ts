import { Routes } from '@angular/router';
import { DeviceListComponent } from './features/devices/components/device-list/device-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'devices', pathMatch: 'full' },
    { path: 'devices', 
    loadChildren: () => import('./features/devices/devices.routes').then(m => m.deviceRoutes) }
];
