import GuestForm from '@/components/form/guest-management/guest-form';
import React from 'react';
import CreateHotelIdForm from '../../components/create-hotel-id-form';

const EditHotelDetailsPage = async ({
  params
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  return (
    <div className="flex justify-center items-center w-full px-14 py-10">
      <CreateHotelIdForm isEnabled={true} hotelID={id} mode="edit" />
    </div>
  );
};

export default EditHotelDetailsPage;
