import ComplaintDashboard from '@/components/complaint-management/ComplaintDashboard';
import { ComplaintTable } from '@/components/tables/complaint-table/client';
import React from 'react';

const ComplaintManagementPage = () => {
  return (
    <div className="w-full flex-col justify-center items-center">
      <ComplaintDashboard
        title="COMPLAINT OVERVIEW"
        closedCases={276}
        openCases={124}
        inProgressCases={105}
      />
      <ComplaintTable />
    </div>
  );
};

export default ComplaintManagementPage;
