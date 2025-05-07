import HotelForm from '@/components/form/hotel-profile/hotel-form';
import Navbar from '@/components/Navbar';
import React from 'react';

const HotelProfile = () => {
  return (
    <div className="w-full flex-col justify-center items-center">
      <Navbar />
      <div className="flex flex-col min-h-screen w-full bg-white py-6 mt-10">
        <div className="h-full w-full container">
          <HotelForm />
        </div>
      </div>
    </div>
  );
};

export default HotelProfile;
