import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface Location {
  id: number;
  name: string; // Change this if your database column is called something else (like 'city' or 'locationName')
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Locations`; // Assuming your backend controller is called LocationsController

  getLocations() {
    return this.http.get<Location[]>(this.apiUrl);
  }
}