import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Device, DeviceReadDto } from '../../shared/models/device.model';
import { Manufacturer, OperatingSystemModel, User, LocationModel} from '../../shared/models/lookup.models';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  // inject() is the modern Angular way to inject dependencies
  private http = inject(HttpClient); 
  
  // Combines the base URL from environment with the controller name
  private apiUrl = `${environment.apiUrl}/Devices`;

  // 1. Get All Devices
  getDevices(): Observable<DeviceReadDto[]> {
    return this.http.get<DeviceReadDto[]>(this.apiUrl);
  }

  // 2. Get Single Device by ID
  getDevice(id: number): Observable<Device> {
    return this.http.get<Device>(`${this.apiUrl}/${id}`);
  }

  // 3. Create new Device
  createDevice(device: Device): Observable<Device> {
    return this.http.post<Device>(this.apiUrl, device);
  }

  // 4. Update existing Device
  updateDevice(id: number, device: Device): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, device);
  }

  // 5. Delete Device
  deleteDevice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  getManufacturers(): Observable<Manufacturer[]> {
  return this.http.get<Manufacturer[]>(`${environment.apiUrl}/Manufacturers`);
}

getOperatingSystems(): Observable<OperatingSystemModel[]> {
  return this.http.get<OperatingSystemModel[]>(`${environment.apiUrl}/OperatingSystems`);
}

getLocations(): Observable<LocationModel[]> {
  return this.http.get<LocationModel[]>(`${environment.apiUrl}/Locations`);
}

getUsers(): Observable<User[]> {
  return this.http.get<User[]>(`${environment.apiUrl}/Users`);
}
}


