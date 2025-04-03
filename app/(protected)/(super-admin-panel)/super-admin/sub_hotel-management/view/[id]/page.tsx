import React from 'react';
import SubHotelIdForm from '@/components/SUPER-ADMIN-COMPONENTS/sub_hotel-management/form/sub_hotel-form';
const ViewSubHotelDetailsPage = async ({
  params
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  return (
    <div className="flex justify-center items-center w-full px-14 py-10">
      <SubHotelIdForm subHotelID={id} mode="view" />
    </div>
  );
};

export default ViewSubHotelDetailsPage;
