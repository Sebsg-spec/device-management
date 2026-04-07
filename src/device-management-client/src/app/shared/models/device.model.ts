// Used when reading data from your GET endpoints
export interface DeviceReadDto {
  deviceId: number; 
  deviceName: string; 
  deviceType: string; 
  manufacturer: string; 
  operatingSystem: string; 
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