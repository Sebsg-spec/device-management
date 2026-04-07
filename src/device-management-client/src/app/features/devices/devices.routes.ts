import { Routes } from '@angular/router';
import { DeviceListComponent } from './components/device-list/device-list.component';
import { DeviceFormComponent } from './components/device-form/device-form.component';
import { DeviceDetailsComponent } from './components/device-details/device-details.component';
import { adminGuard } from '../../core/guards/admin.guard';

export const deviceRoutes: Routes = [
  { path: '', component: DeviceListComponent },
  { path: 'new', component: DeviceFormComponent, canActivate: [adminGuard]   },  
  { path: ':id', component: DeviceDetailsComponent, canActivate: [adminGuard]  },
  { path: ':id/edit', component: DeviceFormComponent, canActivate: [adminGuard]  } 
];