import ComplaintForm from '@/components/COMPANY_COMPONENTS/complaint-management/form/complaint-form';
import React from 'react';

const ComplaintDetailsFormPage = () => {
  return (
    <div className="w-full h-screen pt-8">
      <div className="h-full w-full container">
        <ComplaintForm mode="view" />
      </div>
    </div>
  );
};

export default ComplaintDetailsFormPage;
