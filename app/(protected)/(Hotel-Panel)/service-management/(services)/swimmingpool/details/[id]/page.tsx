import React from 'react';
import { SwimmingpoolServiceData } from 'app/static/services-management/SwimmingPool';
import SwimmingPoolRequestDetail from '@/components/service-management/swimming-pool/RequestDetail';
type Params = {
  id: string;
};
const ViewDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return (
    <div className="flex justify-center items-center h-full w-full pt-3 pb-5">
      <div className="h-full w-full container">
        <SwimmingPoolRequestDetail
          requestDetails={SwimmingpoolServiceData}
          requestId={id}
        />
      </div>
    </div>
  );
};

export default ViewDetails;
