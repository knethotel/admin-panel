import GuestForm from '@/components/form/guest-management/guest-form';
import React from 'react';
import GuestDetails from '../../components/guest-details';
type Params = {
  id: string;
};
const ViewGuestPage = async ({
  params
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  return (
    <div className="flex justify-center items-center w-full py-10 px-14">
      <GuestDetails guestID={id} />
    </div>
  );
};

export default ViewGuestPage;
