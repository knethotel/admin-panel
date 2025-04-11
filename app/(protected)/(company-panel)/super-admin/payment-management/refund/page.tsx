import { RefundDetailsTable } from '@/components/tables/payment-management/client';
import React from 'react';

const RefundHomePage = () => {
  return (
    <div className="w-full min-h-screen pt-12">
      <div className="h-full w-full container">
        <RefundDetailsTable />
      </div>
    </div>
  );
};

export default RefundHomePage;
