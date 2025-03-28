import GuestForm from '@/components/form/guest-management/guest-form';
import React from 'react';

type Params = {
  id: string;
};

const EditGuestPage = async ({
  params
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  return (
    <div className="flex justify-center items-center w-full py-10">
      <GuestForm isEnabled={true} guestId={id} mode="edit" />
    </div>
  );
};

export default EditGuestPage;
