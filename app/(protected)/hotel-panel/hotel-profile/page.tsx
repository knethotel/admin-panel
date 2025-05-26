'use client';
import HotelForm from '@/components/form/hotel-profile/hotel-form';
import Navbar from '@/components/Navbar';
import React, { useEffect, useState } from 'react';
import { getSessionStorageItem } from 'utils/localstorage';

const HotelProfile = () => {
  const [hotelId, setHotelId] = useState<string | null>(null);

  useEffect(() => {
    const adminData = getSessionStorageItem<any>('admin');
    console.log('Raw session storage:', adminData);
    setHotelId(adminData?.user?.hotelId || null);
  }, []);

  if (!hotelId) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <h1 className="text-2xl font-bold">Hotel not found</h1>
      </div>
    );
  }

  return (
    <div className="w-full flex-col justify-center items-center">
      <Navbar />
      <div className="flex flex-col min-h-screen w-full bg-white py-6 mt-10">
        <div className="h-full w-full">
          <HotelForm mode="edit" hotelId={hotelId} />
        </div>
      </div>
    </div>
  );
};

export default HotelProfile;
