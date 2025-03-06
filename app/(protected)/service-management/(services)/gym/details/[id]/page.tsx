import RequestDetail from '@/components/service-management/RequestDetail';
import React from 'react';
import { GymServiceData } from 'app/static/services-management/Gym';
type Params = {
  id: string;
};
const ViewDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return (
    <div className="px-5 h-screen">
      <RequestDetail requestDetails={GymServiceData} requestId={id} />
    </div>
  );
};

export default ViewDetails;
