import React from 'react';
import CreateHotelIdForm from '@/components/SUPER-ADMIN-COMPONENTS/hotel-management/form/create-hotel-id-form';
const ViewHotelDetailsPage = async ({
  params
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  return (
    <div className="flex justify-center items-center w-full px-14 py-10">
      <CreateHotelIdForm isEnabled={false} hotelID={id} mode="view" />
    </div>
  );
};

export default ViewHotelDetailsPage;
