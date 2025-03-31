import ComplaintDashboard from '@/components/shared/complaint-dashboard/ComplaintDashboard';
import { ComplaintTable } from '@/components/shared/complaint-table/client';
import React from 'react';

const ComplaintManagementPage = () => {
  return (
    <div className="w-full flex-col justify-center py-4 items-center">
      <div className="px-4">
        <ComplaintDashboard
          title="COMPLAINT OVERVIEW"
          closedCases={276}
          openCases={124}
          inProgressCases={105}
        />
      </div>
      <ComplaintTable />
    </div>
  );
};

export default ComplaintManagementPage;
