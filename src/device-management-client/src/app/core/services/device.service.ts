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

  private http = inject(HttpClient); 
  
  private apiUrl = `${environment.apiUrl}/Devices`;

  getDevices(): Observable<DeviceReadDto[]> {
    return this.http.get<DeviceReadDto[]>(this.apiUrl);
  }

  getDevice(id: number): Observable<Device> {
    return this.http.get<Device>(`${this.apiUrl}/${id}`);
  }

  createDevice(device: Device): Observable<Device> {
    return this.http.post<Device>(this.apiUrl, device);
  }

  updateDevice(id: number, device: Device): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, device);
  }

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

  assignToSelf(deviceId: number) {
    return this.http.post(`${this.apiUrl}/${deviceId}/assign`, {});
  }

  unassignFromSelf(deviceId: number) {
    return this.http.post(`${this.apiUrl}/${deviceId}/unassign`, {});
  }

  generateDescription(specs: any) {
    return this.http.post<{description: string}>(`${this.apiUrl}/generate-description`, specs);
  }

  searchDevices(query: string) {
    return this.http.get<DeviceReadDto[]>(`${this.apiUrl}/search?q=${encodeURIComponent(query)}`);
  }

}


