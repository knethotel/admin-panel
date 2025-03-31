export type HotelDataType = {
  hotelID: string;
  hotelName: string;
  mobileNo: string;
  email: string;
  subscriptionDetails: {
    planName: string;
    cost: number;
  };
  status: 'ACTIVE' | 'INACTIVE';
};

export const HotelData: HotelDataType[] = [
  {
    hotelID: 'HD123456',
    hotelName: 'Hotel A',
    mobileNo: '1234567890',
    email: 'a@b.com',
    subscriptionDetails: {
      planName: 'Basic Stay Plan',
      cost: 1000
    },
    status: 'ACTIVE'
  }
];
