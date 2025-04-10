import GuestForm from '@/components/form/guest-management/guest-form';
import React from 'react';
import GuestDetails from '@/components/COMPANY_COMPONENTS/guest_management/detail-card/guest-details';
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
    <div className="flex justify-center w-full pt-8">
      <div className="w-full container py-6 flex justify-center">
        <GuestDetails guestID={id} />
      </div>
    </div>
  );
};

export default ViewGuestPage;
