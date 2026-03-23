import type { Apartment } from '../types';

export const apartments: Apartment[] = [
  // Shibuya (4)
  { id: 1, name: 'Shibuya Heights', ward: 'Shibuya', price: 145000, bedrooms: 1, size_sqm: 32, features: ['Near Station', 'Auto-Lock'], lat: 35.6595, lng: 139.7004, image: '' },
  { id: 2, name: 'Harajuku Residence', ward: 'Shibuya', price: 198000, bedrooms: 2, size_sqm: 48, features: ['Pets Allowed', 'Balcony', 'South Facing'], lat: 35.6702, lng: 139.7027, image: '' },
  { id: 3, name: 'Ebisu Garden Flat', ward: 'Shibuya', price: 125000, bedrooms: 1, size_sqm: 28, features: ['Near Station', 'Furnished'], lat: 35.6467, lng: 139.7100, image: '' },
  { id: 4, name: 'Daikanyama Loft', ward: 'Shibuya', price: 230000, bedrooms: 2, size_sqm: 55, features: ['Pets Allowed', 'Corner Room', 'Washer/Dryer'], lat: 35.6487, lng: 139.7030, image: '' },

  // Shinjuku (4)
  { id: 5, name: 'Shinjuku Central', ward: 'Shinjuku', price: 135000, bedrooms: 1, size_sqm: 30, features: ['Near Station', 'Auto-Lock'], lat: 35.6896, lng: 139.7006, image: '' },
  { id: 6, name: 'Kabukicho View', ward: 'Shinjuku', price: 95000, bedrooms: 1, size_sqm: 22, features: ['Furnished', 'Near Station'], lat: 35.6946, lng: 139.7030, image: '' },
  { id: 7, name: 'Nishi-Shinjuku Tower', ward: 'Shinjuku', price: 245000, bedrooms: 3, size_sqm: 72, features: ['Corner Room', 'South Facing', 'Auto-Lock', 'Balcony'], lat: 35.6936, lng: 139.6917, image: '' },
  { id: 8, name: 'Takadanobaba Studio', ward: 'Shinjuku', price: 82000, bedrooms: 1, size_sqm: 20, features: ['Near Station', 'Pets Allowed'], lat: 35.7128, lng: 139.7038, image: '' },

  // Minato (4)
  { id: 9, name: 'Roppongi Hills Suite', ward: 'Minato', price: 240000, bedrooms: 2, size_sqm: 60, features: ['Furnished', 'Auto-Lock', 'South Facing', 'Balcony'], lat: 35.6605, lng: 139.7292, image: '' },
  { id: 10, name: 'Azabu Garden', ward: 'Minato', price: 180000, bedrooms: 1, size_sqm: 38, features: ['Pets Allowed', 'Near Station'], lat: 35.6543, lng: 139.7370, image: '' },
  { id: 11, name: 'Shinagawa Riverside', ward: 'Minato', price: 155000, bedrooms: 2, size_sqm: 45, features: ['Balcony', 'Washer/Dryer'], lat: 35.6284, lng: 139.7387, image: '' },
  { id: 12, name: 'Aoyama Terrace', ward: 'Minato', price: 210000, bedrooms: 2, size_sqm: 52, features: ['Corner Room', 'South Facing', 'Pets Allowed'], lat: 35.6722, lng: 139.7197, image: '' },

  // Meguro (4)
  { id: 13, name: 'Nakameguro Riverside', ward: 'Meguro', price: 165000, bedrooms: 1, size_sqm: 35, features: ['Near Station', 'Balcony', 'Pets Allowed'], lat: 35.6441, lng: 139.6988, image: '' },
  { id: 14, name: 'Jiyugaoka House', ward: 'Meguro', price: 190000, bedrooms: 2, size_sqm: 50, features: ['South Facing', 'Washer/Dryer', 'Auto-Lock'], lat: 35.6076, lng: 139.6712, image: '' },
  { id: 15, name: 'Gakugeidaigaku Flat', ward: 'Meguro', price: 105000, bedrooms: 1, size_sqm: 25, features: ['Near Station', 'Furnished'], lat: 35.6285, lng: 139.6853, image: '' },
  { id: 16, name: 'Meguro Station Place', ward: 'Meguro', price: 142000, bedrooms: 1, size_sqm: 33, features: ['Auto-Lock', 'Corner Room'], lat: 35.6337, lng: 139.7158, image: '' },

  // Setagaya (4)
  { id: 17, name: 'Sangenjaya Cozy', ward: 'Setagaya', price: 98000, bedrooms: 1, size_sqm: 24, features: ['Near Station', 'Pets Allowed'], lat: 35.6436, lng: 139.6703, image: '' },
  { id: 18, name: 'Shimokitazawa Vintage', ward: 'Setagaya', price: 115000, bedrooms: 1, size_sqm: 30, features: ['Furnished', 'Balcony'], lat: 35.6609, lng: 139.6683, image: '' },
  { id: 19, name: 'Futako-Tamagawa Green', ward: 'Setagaya', price: 175000, bedrooms: 2, size_sqm: 55, features: ['Pets Allowed', 'South Facing', 'Washer/Dryer', 'Balcony'], lat: 35.6115, lng: 139.6270, image: '' },
  { id: 20, name: 'Setagaya Park View', ward: 'Setagaya', price: 88000, bedrooms: 1, size_sqm: 22, features: ['Near Station'], lat: 35.6466, lng: 139.6533, image: '' },
];
