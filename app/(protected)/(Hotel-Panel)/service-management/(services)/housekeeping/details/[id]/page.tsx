import RequestDetail from '@/components/service-management/RequestDetail';
import React from 'react';
import { HousekeepingData } from 'app/static/services-management/Housekeeping';
type Params = {
  id: string;
};
const ViewDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return (
    <div className="flex justify-center items-center h-screen w-full pt-28">
      <div className="h-full w-full container">
        <RequestDetail requestDetails={HousekeepingData} requestId={id} />
      </div>
    </div>
  );
};

export default ViewDetails;
