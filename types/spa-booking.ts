export type SpaBookingStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';

export interface AdditionalService {
  name: string;
  price: number;
  _id: string;
}

export interface SpaSalonProduct {
  _id: string;
  hotelId: string;
  serviceType: string;
  productCategory: string;
  productName: string;
  price: number;
  description: string;
  imageUrl: string;
  additionalServices: AdditionalService[];
  __v: number;
}

export interface SpaBookingGuest {
  _id: string;
  firstName: string;
  lastName: string;
}

export interface SpaBooking {
  _id: string;
  guest: SpaBookingGuest;
  status: SpaBookingStatus;
  __t: string;
  hotelId: string;
  spaSalonProduct: SpaSalonProduct;
  additionalServicesSelected: AdditionalService[];
  bookingDate: string;
  bookingTime: string;
  notes?: string;
  requestTime: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SpaBookingsResponse {
  success: boolean;
  data: SpaBooking[];
}
