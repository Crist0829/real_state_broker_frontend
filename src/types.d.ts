import { number } from "zod";

export interface Property {
  id: number;
  name: string;
  description: string;
  location: string;
  deleted_at : string | null;
  created_at: string;
  updated_at: string;
  size: number;
  floors: number;
  user_id: number;
  bedrooms: number;
  livingrooms: number;
  bathrooms: number;
  kitchens: number;
  garage: boolean;
  status: "available" | "sold" | "rented";
  images: Image[];
  prices: Price[];
  califications: PropertyCalificationType[];
  user: UserProperty;
}

export interface FiltersPropertiesType{
  
    bedrooms: number
    bathrooms: number
    livingrooms: number
    kitchens: number
    floors: number
    type: string
    garage: boolean
    paginate: number
    deleted : boolean

  }

export interface ResponseData {
  current_page: number;
  data: Property[];
  first_page_url: string;
  from: number;
  links: ResponseDataLink[] | null;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface ResponseDataLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface Image {
  id: number;
  description: string;
  name: string;
  url: string;
  property_id: number;
  created_at: string;
  updated_at: string;
}

export interface Price {
  id: number;
  name: string;
  description: string;
  type: "sale" | "rent";
  price: number;
  property_id: number;
  created_at: string;
  updated_at: string;
}
export interface CreatePrice {
  name: string;
  description: string;
  type: "sale" | "rent";
  price: number;
  property_id: number;
}

export interface UserProperty {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface PropertyCalificationType {
  id: number;
  user_id: number;
  property_id: number;
  calification: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  created_at: string;
  email: string;
  id: number;
  name: string;
  updated_at: string;
  email_verefied_at: string | null;
}

export interface State {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  setAuthenticate: (user: User) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  deleteAuthenticate: () => void;
}

interface ImgPreview {
  file: File | null;
  urlTemp: string;
}
