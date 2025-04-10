import GuestForm from '@/components/form/guest-management/guest-form';
import React from 'react';
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
    <div className="flex justify-center items-center h-screen w-full pt-8">
      <div className="h-full w-full container">
        <GuestForm isEnabled={false} guestId={id} mode="view" />
      </div>
    </div>
  );
};

export default ViewGuestPage;
