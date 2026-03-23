export type Apartment = {
  id: number;
  name: string;
  ward: string;
  price: number;
  bedrooms: number;
  size_sqm: number;
  features: string[];
  lat: number;
  lng: number;
  image: string;
};

export type Filters = {
  ward: string | null;
  maxPrice: number | null;
  minBedrooms: number | null;
  features: string[];
};

export type TranscriptEntry = {
  role: 'user' | 'agent';
  text: string;
  timestamp: number;
};
