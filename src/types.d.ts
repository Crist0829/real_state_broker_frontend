export interface Property {
  id: number;
  name: string;
  description: string;
  location: string;
  created_at: string;
  updated_at: string;
  floors: number;
  user_id: number;
  bedrooms: number;
  livingrooms: number;
  bathrooms: number;
  kitchens: number;
  garage: boolean;
  status: "available" | "sold" | "rented";
}

export interface ResponseData {
  current_page: number;
  data: Property[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
