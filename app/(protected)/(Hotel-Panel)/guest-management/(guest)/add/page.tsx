import GuestForm from '@/components/form/guest-management/guest-form';
import React from 'react';

const AddGuestPage = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full pt-8">
      <div className="h-full w-full container">
        <GuestForm isEnabled={true} mode="add" />
      </div>
    </div>
  );
};

export default AddGuestPage;
