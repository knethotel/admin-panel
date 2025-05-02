import React from 'react';
import CreateHotelIdForm from '@/components/COMPANY_COMPONENTS/hotel-management/form/create-hotel-id-form';
import Navbar from '@/components/Navbar';
import HotelForm from '@/components/form/hotel-profile/hotel-form';

const CreateHotelIDPage = () => {
  return (
    <div className="flex flex-col w-full">
      <Navbar className="relative w-full lg:w-full" />
      <div className="w-full h-screen">
        <div className="h-full w-full">
          <HotelForm/>
        </div>
      </div>
    </div>
  );
};

export default CreateHotelIDPage;
