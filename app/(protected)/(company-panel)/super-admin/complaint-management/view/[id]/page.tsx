'use client';

import Navbar from '@/components/Navbar';
import ComplaintForm from '@/components/COMPANY_COMPONENTS/complaint-management/form/complaint-form';
import { useParams } from 'next/navigation';
import React from 'react';

const ComplaintDetailsFormPage = () => {
  const params = useParams(); // Get complaintID from URL
  const complaintID = params?.id as string;

  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <div className="w-full h-screen pt-8 mt-20">
        <div className="h-full w-full container">
          <ComplaintForm mode="view" complaintID={complaintID} />
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetailsFormPage;