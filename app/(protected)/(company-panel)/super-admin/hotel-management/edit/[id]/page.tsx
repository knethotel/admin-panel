import React from 'react';
import CreateHotelIdForm from '@/components/COMPANY_COMPONENTS/hotel-management/form/create-hotel-id-form';
import Navbar from '@/components/Navbar';

const EditHotelDetailsPage = async ({
  params
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  return (
    <div className="flex flex-col w-full">
      <Navbar active search />
      <div className="flex justify-center items-center w-full px-14 py-10 mt-14">
        <CreateHotelIdForm isEnabled={true} hotelID={id} mode="edit" />
      </div>
    </div>
  );
};

export default EditHotelDetailsPage;
