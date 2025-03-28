import React from 'react';
import { SwimmingpoolServiceData } from 'app/static/services-management/SwimmingPool';
import SwimmingPoolRequestDetail from '@/components/service-management/swimming-pool/RequestDetail';
type Params = {
  id: string;
};
const ViewDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return (
    <div className="px-5 h-screen">
      <SwimmingPoolRequestDetail
        requestDetails={SwimmingpoolServiceData}
        requestId={id}
      />
    </div>
  );
};

export default ViewDetails;
