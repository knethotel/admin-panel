import GuestForm from '@/components/form/guest-management/guest-form';
import React from 'react';

type Params = {
  id: string;
};

const EditGuestPage = ({ params }: { params: Params }) => {
  return (
    <div className="flex justify-center items-center w-full py-10">
      <GuestForm isEnabled={true} guestId={params.id} mode='edit' />
    </div>
  );
};

export default EditGuestPage;
