import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface Location {
  id: number;
  name: string; 
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Locations`;

  getLocations() {
    return this.http.get<Location[]>(this.apiUrl);
  }
}