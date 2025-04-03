import React from 'react';
import CreateHotelIdForm from '@/components/COMPANY_COMPONENTS/hotel-management/form/create-hotel-id-form';

const CreateHotelIDPage = () => {
  return (
    <div className="flex justify-center items-center w-full px-14 py-10">
      <CreateHotelIdForm isEnabled={true} mode="add" />
    </div>
  );
};

export default CreateHotelIDPage;
