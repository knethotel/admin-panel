import { SwimmingpoolServiceDataTable } from '@/components/tables/swimming-pool-service/client';
import React from 'react';

const HousekeepingPage = () => {
  return (
    <div className="flex justify-center items-center h-full w-full pt-3">
      <div className="h-full w-full px-4">
        <SwimmingpoolServiceDataTable />
      </div>
    </div>
  );
};

export default HousekeepingPage;
