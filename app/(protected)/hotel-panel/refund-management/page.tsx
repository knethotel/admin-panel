import Navbar from '@/components/Navbar';
import { RefundDetailsTable } from '@/components/tables/refund-management/client';
import React from 'react';

const RefundHomePage = () => {
  return (
    <div className="flex flex-col w-full">
      <Navbar active search />
      <div className="mt-16 w-full">
        <RefundDetailsTable />
      </div>
    </div>
  );
};

export default RefundHomePage;
