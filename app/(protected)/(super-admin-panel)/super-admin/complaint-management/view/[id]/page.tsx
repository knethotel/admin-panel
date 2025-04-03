import ComplaintForm from '@/components/SUPER-ADMIN-COMPONENTS/complaint-management/form/complaint-form';
import React from 'react';

const ComplaintDetailsFormPage = () => {
  return (
    <div className="w-full h-screen p-4">
      <ComplaintForm mode="view" />
    </div>
  );
};

export default ComplaintDetailsFormPage;
