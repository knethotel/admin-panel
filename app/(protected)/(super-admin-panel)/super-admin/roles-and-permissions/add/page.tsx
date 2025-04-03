import GuestForm from '@/components/form/guest-management/guest-form';
import React from 'react';

const AddGuestPage = () => {
  return (
    <div className="flex justify-center items-center w-full px-14 py-10">
      <GuestForm isEnabled={true} mode="add" />
    </div>
  );
};

export default AddGuestPage;