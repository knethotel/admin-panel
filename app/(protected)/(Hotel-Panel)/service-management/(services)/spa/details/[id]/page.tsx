import SpaServiceRequestDetail from '@/components/service-management/spa/RequestDetail';
import React from 'react';
import { SpaServiceData } from 'app/static/services-management/Spa';
type Params = {
  id: string;
};
const ViewDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return (
    <div className="px-5 h-screen">
      <SpaServiceRequestDetail requestDetails={SpaServiceData} serviceID={id} />
    </div>
  );
};

export default ViewDetails;
