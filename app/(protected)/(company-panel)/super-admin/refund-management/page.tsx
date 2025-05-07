import Navbar from '@/components/Navbar';
import { RefundDetailsTable } from '@/components/tables/refund-management/client';
import React from 'react';

const RefundHomePage = () => {
  return (
    <div className="flex flex-col w-full">
      <Navbar active search />
      <div className="w-full min-h-screen pt-2 mt-20">
        <div className="h-full w-full container">
          <RefundDetailsTable />
        </div>
      </div>
    </div>
  );
};

export default RefundHomePage;
