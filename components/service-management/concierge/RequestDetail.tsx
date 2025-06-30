// 'use client';
// import ToggleButton from '@/components/ui/toggleButton';
// import React, { useState } from 'react';

// type Props<T> = {
//   requestDetails: T[];
//   requestId: string;
// };

// const ConciergeServiceRequestDetail = <T extends Record<string, any>>({
//   requestDetails,
//   requestId
// }: Props<T>) => {
//   const [showEffectiveCost, setShowEffectiveCost] = useState(false);

//   const getDetails = (requestId: string | undefined) => {
//     if (requestId) {
//       return requestDetails.find((request) => request.requestID === requestId);
//     }
//     return null;
//   };

//   const request = getDetails(requestId);

//   return (
//     <div className="mt-24 bg-[#FAF6EF] rounded-md shadow-custom px-6 pb-8 pt-4 flex font-medium flex-col gap-14 w-full">
//       {/* Header */}
//       <div className="flex gap-12 text-sm opacity-55">
//         <p>Guest ID: {request?.guestDetails?.guestID}</p>
//         <p>Request ID: {request?.requestID}</p>
//       </div>

//       {/* Details */}
//       <div className="space-y-8">
//         {/* Upper Part */}
//         <div className="flex gap-8">
//           <div className="flex gap-2 items-center text-sm">
//             <span className="opacity-75">Guest name</span>{' '}
//             <span className="bg-[#F6EEE0] rounded-md px-6 py-1">
//               {request?.guestDetails?.name?.toUpperCase()}
//             </span>
//           </div>
//           <div className="flex gap-2 items-center text-sm">
//             <span className="opacity-75">Mobile number</span>{' '}
//             <span className="bg-[#F6EEE0] rounded-md px-6 py-1">
//               {request?.guestDetails?.mobileNumber}
//             </span>
//           </div>
//           <div className="flex gap-2 items-center text-sm">
//             <span className="opacity-75">Email</span>{' '}
//             <span className="bg-[#F6EEE0] rounded-md px-6 py-1">
//               {request?.guestDetails?.email}
//             </span>
//           </div>
//         </div>

//         {/* Lower Part */}
//         <div className="flex gap-8">
//           {/* Column One */}
//           <div className="flex flex-col gap-8">
//             <div className="flex flex-col items-start gap-2 text-sm">
//               <span className="opacity-75">Request Detail</span>{' '}
//               <span className="bg-[#F6EEE0] rounded-md px-6 py-2">
//                 "{request?.requestDetail}"
//               </span>
//             </div>
//             <div className="flex flex-col gap-2 items-start text-sm">
//               <span className="opacity-75">Response Detail</span>{' '}
//               <span className="bg-[#F6EEE0] py-2 rounded-md px-6">
//                 "{request?.responseDetail}"
//               </span>
//             </div>
//           </div>

//           {/* Column Two */}
//           <div className="flex flex-col gap-8">
//             <div className="flex flex-col gap-2 items-start text-sm">
//               <span className="opacity-75">Request Assigned to</span>{' '}
//               <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
//                 {request?.requestAssignedTo}
//               </span>
//             </div>
//             <div className="flex flex-col gap-2 items-start text-sm">
//               <span className="w-full flex gap-6">
//                 <p>Effective Cost</p>
//                 <span>
//                   <div onClick={() => setShowEffectiveCost((prev) => !prev)}>
//                     <ToggleButton />
//                   </div>
//                 </span>
//               </span>
//               {showEffectiveCost && (
//                 <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
//                   {request?.effectiveCost}
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Column Three */}
//           <div className="flex flex-col gap-8">
//             <div className="flex flex-col gap-2 items-start text-sm">
//               <span className="opacity-75">Requested Time Slot</span>{' '}
//               <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
//                 {request?.requestedTimeSlot}
//               </span>
//             </div>
//             <div className="flex flex-col gap-2 items-start text-sm">
//               <span className="opacity-75">Requested Venue</span>{' '}
//               <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
//                 {request?.requestedVenue}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConciergeServiceRequestDetail;


'use client';

import React, { useEffect, useState } from 'react';
import ToggleButton from '@/components/ui/toggleButton';
import apiCall from '@/lib/axios'; // adjust if your axios wrapper is elsewhere

type ConciergeRequestDetail = {
  _id: string;
  uniqueId: string;
  requestDetail: string;
  responseDetail?: string;
  requestAssignedTo?: string;
  effectiveCost?: string;
  requestedTimeSlot?: string;
  requestedVenue?: string;
  paymentStatus: string;
  requestType: string;
  status: string;
  requestTime: string;
  guest: {
    _id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    assignedRoomNumber?: string;
  };
  conciergeItem?: {
    _id: string;
    name: string;
    description: string;
    category: string
    distance: number;
    imageUrl?: string;
  };
};

type Props = {
  serviceID: string;
};

const ConciergeServiceRequestDetail: React.FC<Props> = ({ serviceID }) => {
  const [request, setRequest] = useState<ConciergeRequestDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEffectiveCost, setShowEffectiveCost] = useState(false);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        setLoading(true);
        const res = await apiCall('get', `/api/services/concierge/requests/${serviceID}`);
        if (res.success) {
          setRequest(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch request details', err);
      } finally {
        setLoading(false);
      }
    };

    if (serviceID) fetchRequest();
  }, [serviceID]);

  if (loading) {
    return <div className="p-4 mt-24">Loading...</div>;
  }

  if (!request) {
    return <div className="p-4 mt-24 text-red-600">Request not found</div>;
  }

  const guestName = `${request.guest?.firstName || ''} ${request.guest?.lastName || ''}`.trim();

  return (
    <div className="mt-24 bg-[#FAF6EF] rounded-md shadow-custom px-6 pb-8 pt-4 flex font-medium flex-col gap-14 w-full">
      {/* Header */}
      <div className="flex gap-12 text-sm opacity-55">
        <p>Guest ID: {request.guest?._id || 'N/A'}</p>
        <p>Request ID: {request.uniqueId || 'N/A'}</p>
      </div>

      {/* Details */}
      <div className="space-y-8">
        {/* Upper Part */}
        <div className="flex gap-8 flex-wrap">
          <div className="flex gap-2 items-center text-sm">
            <span className="opacity-75">Guest name</span>
            <span className="bg-[#F6EEE0] rounded-md px-6 py-1">
              {`${request.guest?.firstName || ''} ${request.guest?.lastName || ''}`.trim() || 'N/A'}
            </span>
          </div>
          <div className="flex gap-2 items-center text-sm">
            <span className="opacity-75">Mobile number</span>
            <span className="bg-[#F6EEE0] rounded-md px-6 py-1">
              {request.guest?.phoneNumber || 'N/A'}
            </span>
          </div>
          <div className="flex gap-2 items-center text-sm">
            <span className="opacity-75">Assigned Room No.</span>
            <span className="bg-[#F6EEE0] rounded-md px-6 py-1">
              {request.guest?.assignedRoomNumber || 'N/A'}
            </span>
          </div>
        </div>

        {/* Lower Part */}
        <div className="flex flex-wrap gap-8">
          {/* Column One */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-start gap-2 text-sm">
              <span className="opacity-75">Request Detail</span>
              <span className="bg-[#F6EEE0] rounded-md px-6 py-2">
                {request.requestDetail || '-'}
              </span>
            </div>
            <div className="flex flex-col gap-2 items-start text-sm">
              <span className="opacity-75">Status</span>
              <span className="bg-[#F6EEE0] py-2 rounded-md px-6 capitalize">
                {request.status || 'N/A'}
              </span>
            </div>
          </div>

          {/* Column Two */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2 items-start text-sm">
              <span className="opacity-75">Request Assigned to</span>
              <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
                {request.requestAssignedTo || 'Unassigned'}
              </span>
            </div>
            <div className="flex flex-col gap-2 items-start text-sm">
              <span className="opacity-75">Effective Cost</span>
              <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
                {request.effectiveCost || 'Not Set'}
              </span>
            </div>
          </div>

          {/* Column Three */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2 items-start text-sm">
              <span className="opacity-75">Requested Time</span>
              <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
                {request.requestTime
                  ? new Date(request.requestTime).toLocaleString()
                  : 'N/A'}
              </span>
            </div>
            <div className="flex flex-col gap-2 items-start text-sm">
              <span className="opacity-75">Request Type</span>
              <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
                {request.requestType || 'N/A'}
              </span>
            </div>
          </div>

          {/* Concierge Item Section */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2 items-start text-sm">
              <span className="opacity-75">Concierge Item</span>
              <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
                {request.conciergeItem?.name || 'N/A'}
              </span>
            </div>
            <div className="flex flex-col gap-2 items-start text-sm">
              <span className="opacity-75">Category</span>
              <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
                {request.conciergeItem?.category || 'N/A'}
              </span>
            </div>
            <div className="flex flex-col gap-2 items-start text-sm">
              <span className="opacity-75">Distance</span>
              <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
                {request.conciergeItem?.distance
                  ? `${request.conciergeItem.distance} km`
                  : 'N/A'}
              </span>
            </div>
            <div className="flex flex-col gap-2 items-start text-sm">
              <span className="opacity-75">Description</span>
              <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
                {request.conciergeItem?.description?.trim() || 'N/A'}
              </span>
            </div>

            {request.conciergeItem?.imageUrl && (
              <img
                src={request.conciergeItem.imageUrl}
                alt="Concierge Item"
                className="w-40 h-24 object-cover rounded-md"
              />
            )}
          </div>
        </div>
      </div>
    </div>

  );
};

export default ConciergeServiceRequestDetail;
