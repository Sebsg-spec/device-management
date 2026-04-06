// Used when reading data from your GET endpoints
export interface DeviceReadDto {
  deviceId: number; // Was 'id'
  deviceName: string; // Was 'name'
  deviceType: string; // Was 'type'
  manufacturer: string; // Was 'manufacturerName'
  operatingSystem: string; // Was 'osName'
  osVersion: string;
  userName?: string;
    ram_MB?: number | null;
}

// Used when sending data to your POST/PUT endpoints
export interface Device {
  id?: number; 
  name: string;
  manufacturerId: number;
  type: string; 
  operatingSystemId: number;
  osVersion: string;
  processor?: string | null;
  raM_MB?: number | null;
  description?: string | null;
  locationId?: number | null;
  userId?: number | null;
}