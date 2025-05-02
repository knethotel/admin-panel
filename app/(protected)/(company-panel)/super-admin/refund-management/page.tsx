import Navbar from '@/components/Navbar';
import { RefundDetailsTable } from '@/components/tables/payment-management/client';
import React from 'react';

const RefundHomePage = () => {
  return (
    <div className="flex flex-col w-full">
      <Navbar active search className="relative w-full lg:w-full" />
      <div className="w-full min-h-screen pt-2">
        <div className="h-full w-full container">
          <RefundDetailsTable />
        </div>
      </div>
    </div>
  );
};

export default RefundHomePage;
