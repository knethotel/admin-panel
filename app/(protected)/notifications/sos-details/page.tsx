import { SOSManagementDataTable } from '@/components/tables/SOS-management/client';
import React from 'react';

const SOSDetailsPage = () => {
  return (
    <div className="h-screen w-full overflow-x-hidden hide-scrollbar">
      <SOSManagementDataTable />
    </div>
  );
};

export default SOSDetailsPage;
