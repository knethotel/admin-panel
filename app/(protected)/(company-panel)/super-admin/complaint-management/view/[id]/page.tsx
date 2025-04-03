import ComplaintForm from '@/components/COMPANY_COMPONENTS/complaint-management/form/complaint-form';
import React from 'react';

const ComplaintDetailsFormPage = () => {
  return (
    <div className="w-full h-screen p-4">
      <ComplaintForm mode="view" />
    </div>
  );
};

export default ComplaintDetailsFormPage;
