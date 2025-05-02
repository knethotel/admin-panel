import { HotelManagementHome } from '@/components/COMPANY_COMPONENTS/hotel-management/table/client';
import Navbar from '@/components/Navbar';
import { Heading } from '@/components/ui/heading';
import React from 'react';

const HotelPage = () => {
  return (
    <div className="flex flex-col w-full">
      <Navbar active search className="relative w-full lg:w-full" />
      <div className="w-full h-screen pt-8">
        <div className="h-full w-full container">
          <HotelManagementHome />
        </div>
      </div>
    </div>
  );
};

export default HotelPage;
