import ComplaintForm from '@/components/COMPANY_COMPONENTS/complaint-management/form/complaint-form';
import Navbar from '@/components/Navbar';
import React from 'react';

const ComplaintDetailsFormPage = () => {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <div className="w-full h-screen pt-8 mt-20">
        <div className="h-full w-full container">
          <ComplaintForm mode="view" />
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetailsFormPage;
