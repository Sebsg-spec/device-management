export interface Manufacturer {
  id: number;
  name: string;
}

export interface OperatingSystemModel {
  id: number;
  name: string;
}

export interface LocationModel {
  id: number;
  name: string;
  address?: string | null;
  city?: string | null;
  country?: string | null;
}

export interface User {
  id: number;
  name: string;
  role: string;
}