import HotelForm from '@/components/form/hotel-profile/hotel-form';
import React from 'react';

const HotelProfile = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-white py-6">
      <div className="h-full w-full container">
        <HotelForm />
      </div>
    </div>
  );
};

export default HotelProfile;
