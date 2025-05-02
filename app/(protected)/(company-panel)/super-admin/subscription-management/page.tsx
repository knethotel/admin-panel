import { SubscriptionManagementHomePage } from '@/components/COMPANY_COMPONENTS/subscription_management/table/client';
import Navbar from '@/components/Navbar';
import React from 'react';

const SubscriptionManagementPage = () => {
  return (
    <div className='flex flex-col w-full'>
      <Navbar active search className="relative w-full lg:w-full" />
      <div className="w-full h-screen pt-4">
        <div className="h-full w-full container">
          <SubscriptionManagementHomePage />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManagementPage;
