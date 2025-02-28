import GuestForm from '@/components/form/guest-management/guest-form';
import React from 'react';
type Params = {
  id: string;
};
const ViewGuestPage = ({ params }: { params: Params }) => {
  return (
    <div className="flex justify-center items-center w-full py-10">
      <GuestForm isEnabled={false} guestId={params.id} mode="view" />
    </div>
  );
};

export default ViewGuestPage;
