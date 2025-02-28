import NotificationDetailsForm from '@/components/form/notifications/notification-details-form';
import React from 'react';
type Params = {
  id: string;
};
const page = ({ params }: { params: Params }) => {
  return (
    <div className="flex justify-center items-center w-full py-10">
      <NotificationDetailsForm
        isEnabled={false}
        notificationId={params.id}
        mode="view"
      />
    </div>
  );
};

export default page;
