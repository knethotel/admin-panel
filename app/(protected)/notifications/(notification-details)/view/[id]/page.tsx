import NotificationDetailsForm from '@/components/form/notifications/notification-details-form';
import React from 'react';
type Params = {
  id: string;
};
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return (
    <div className="flex justify-center items-center w-full py-10">
      <NotificationDetailsForm
        isEnabled={false}
        notificationId={id}
        mode="view"
      />
    </div>
  );
};

export default page;
