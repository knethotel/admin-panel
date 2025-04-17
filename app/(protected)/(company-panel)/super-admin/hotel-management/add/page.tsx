import React from 'react';
import CreateHotelIdForm from '@/components/COMPANY_COMPONENTS/hotel-management/form/create-hotel-id-form';

const CreateHotelIDPage = () => {
  return (
    <div className="w-full h-screen pt-8">
      <div className="h-full w-full container">
        <CreateHotelIdForm isEnabled={true} mode="add" />
      </div>
    </div>
  );
};

export default CreateHotelIDPage;
