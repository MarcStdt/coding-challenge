export interface Company {
  id: number;
  name: string;
  image: string;
  services: string[];
  city: string;
}

export interface Service {
  value: string;
  name: string;
  isChecked: boolean;
}
