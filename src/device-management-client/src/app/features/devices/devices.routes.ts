import { Routes } from '@angular/router';
import { DeviceListComponent } from './components/device-list/device-list.component';
import { DeviceFormComponent } from './components/device-form/device-form.component';
import { DeviceDetailsComponent } from './components/device-details/device-details.component';

export const deviceRoutes: Routes = [
  { path: '', component: DeviceListComponent },
  { path: 'new', component: DeviceFormComponent },  
  { path: ':id', component: DeviceDetailsComponent },
  { path: ':id/edit', component: DeviceFormComponent } 
];