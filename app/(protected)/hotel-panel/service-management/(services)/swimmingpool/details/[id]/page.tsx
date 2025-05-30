import React from 'react';
import SwimmingPoolRequestDetail from '@/components/service-management/swimming-pool/RequestDetail';
import RequestDetail from '@/components/service-management/RequestDetail';
type Params = {
  id: string;
};
const ViewDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return (
    <div className="flex justify-center items-center h-full w-full pt-3 pb-5">
      <div className="h-full w-full container mt-24">
       <RequestDetail requestId={id} mode="swimmingpool" />
      </div>
    </div>
  );
};

export default ViewDetails;
