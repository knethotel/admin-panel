import { CreateHotelIdFormSchemaType } from '../schema';
import img from '/placeholder-user.jpg';
const dummyHotelData: CreateHotelIdFormSchemaType[] = [
  {
    status: 'ACTIVE',
    hotelImageUrl: '/assets/cocacola.jpg',
    hotelImageFile: undefined,
    hotelID: 'H001',
    hotelName: 'Grand Royale Hotel',
    address: '123 Luxury Street, New York, NY',
    services: 'Reception',
    subscriptionPlan: 'Premium',
    subscriptionPrice: 499,
    contactNo: '1234567890',
    email: 'contact@grandroyale.com'
  },
  {
    status: 'INACTIVE',
    hotelImageUrl: '/assets/cocacola.jpg',
    hotelImageFile: undefined,
    hotelID: 'H002',
    hotelName: 'Sunset Paradise',
    address: '456 Beach Avenue, Miami, FL',
    services: 'Swimming Pool',
    subscriptionPlan: 'Standard',
    subscriptionPrice: 199,
    contactNo: '0987654321',
    email: 'info@sunsetparadise.com'
  },
  {
    status: 'ACTIVE',
    hotelImageUrl: '/assets/cocacola.jpg',
    hotelImageFile: undefined,
    hotelID: 'H003',
    hotelName: 'Mountain View Resort',
    address: '789 Hilltop Road, Denver, CO',
    services: 'Gym',
    subscriptionPlan: 'Basic',
    subscriptionPrice: 534,
    contactNo: '1122334455',
    email: 'support@mountainview.com'
  }
];

export default dummyHotelData;
