// 'use client';
// import { Button } from '@/components/ui/button';
// import ToggleButton from '@/components/ui/toggleButton';
// import React, { useState } from 'react';

// type GuestDetails = {
//   guestID: string;
//   name: string;
//   mobileNumber: string;
//   email: string;
// };

// type RulesAndRegulations = {
//   operatingHours: string;
//   showerBeforeEntry: string;
//   properSwimwear: string;
//   noRunning: string;
//   noDiving: string;
//   noFoodAndDrinks: string;
//   noGlassItems: string;
//   healthPrecautions: string;
//   poolCapacity: string;
//   usePoolAtOwnRisk: string;
//   emergencyAlert: string;
// };

// type SwimmingPoolRequest = {
//   requestID: string;
//   guestDetails: GuestDetails;
//   requestDetail: string;
//   responseDetail: string;
//   requestAssignedTo: string;
//   effectiveCost: string;
//   paymentMode: string;
//   requestedTimeSlot: string;
//   rulesAndRegulations: RulesAndRegulations;
// };

// type Props = {
//   requestDetails: SwimmingPoolRequest[];
//   requestId: string;
// };

// const SwimmingPoolRequestDetail = ({ requestDetails, requestId }: Props) => {
//   const [showEffectiveCost, setShowEffectiveCost] = useState(false);
//   const [showPaymentMode, setShowPaymentMode] = useState(false);

//   const request = requestDetails.find((r) => r.requestID === requestId);

//   return (
//     <div className="mt-24 bg-[#FAF6EF] rounded-md shadow-custom px-6 py-8 flex font-medium flex-col gap-8 w-full mb-4">
//       {/* Header */}
//       <div className="flex gap-12 text-sm opacity-75">
//         <p>Guest ID: {request?.guestDetails.guestID}</p>
//         <p>Request ID: {request?.requestID}</p>
//       </div>

//       {/* Details */}
//       <div className="space-y-8">
//         {/* Upper Part */}
//         <div className="flex gap-8 2xl:gap-10">
//           <Detail
//             label="Guest name"
//             value={request?.guestDetails.name.toUpperCase()}
//           />
//           <Detail
//             label="Mobile number"
//             value={request?.guestDetails.mobileNumber}
//           />
//           <Detail label="Email" value={request?.guestDetails.email} />
//         </div>

//         {/* Lower Part */}
//         <div className="flex gap-8 2xl:gap-10">
//           {/* Column one */}
//           <div className="flex flex-col gap-8 2xl:gap-10">
//             <TextBlock
//               label="Request Detail"
//               value={`"${request?.requestDetail}"`}
//             />
//             <TextBlock
//               label="Response Detail"
//               value={`"${request?.responseDetail}"`}
//             />
//           </div>

//           {/* Column two */}
//           <div className="flex flex-col gap-8 2xl:gap-10">
//             <TextBlock
//               label="Request Assigned to"
//               value={request?.requestAssignedTo}
//             />
//             <div className="flex flex-col gap-2 items-start text-sm">
//               <span className="w-full flex gap-4">
//                 <p>Effective cost</p>
//                 <div onClick={() => setShowEffectiveCost((prev) => !prev)}>
//                   <ToggleButton />
//                 </div>
//               </span>
//               {showEffectiveCost && (
//                 <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
//                   {request?.effectiveCost}
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Column three */}
//           <div className="flex flex-col gap-8 2xl:gap-10">
//             <TextBlock
//               label="Requested Time Slot"
//               value={request?.requestedTimeSlot}
//             />
//             <div className="flex flex-col gap-2 items-start text-sm">
//               <span className="w-full flex gap-4">
//                 <p>Payment Mode</p>
//                 <div onClick={() => setShowPaymentMode((prev) => !prev)}>
//                   <ToggleButton />
//                 </div>
//               </span>
//               {showPaymentMode && (
//                 <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
//                   {request?.paymentMode}
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Rules and Message */}
//         <div className="flex gap-4">
//           <div className="flex flex-col gap-4">
//             <div className="flex flex-col gap-2 items-start text-sm">
//               <span className="opacity-75">Rules and Regulations</span>
//               <div className="bg-[#F6EEE0] py-2 rounded-md px-6">
//                 {request?.rulesAndRegulations &&
//                   Object.entries(request.rulesAndRegulations).map(
//                     ([key, value]) => (
//                       <p key={key} className="my-4">
//                         <span className="font-semibold capitalize">
//                           {key.replace(/([A-Z])/g, ' $1')}:
//                         </span>{' '}
//                         {value}
//                       </p>
//                     )
//                   )}
//               </div>
//             </div>
//           </div>

//           {/* Message */}
//           <div className="flex justify-center items-start mt-6 ml-8">
//             <div>
//               <textarea
//                 className="w-full p-2 border rounded-md border-none placeholder:text-sm bg-[#F6EEE0] text-gray-700"
//                 placeholder="Type your message here"
//                 rows={10}
//                 cols={50}
//               />
//               <div className="flex justify-end">
//                 <Button className="bg-[#A07D3D] h-8 text-white hover:outline hover:text-black">
//                   Save
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Reusable components
// const Detail = ({ label, value }: { label: string; value?: string }) => (
//   <div className="flex gap-2 items-center text-sm">
//     <span className="opacity-75">{label}</span>
//     <span className="bg-[#F6EEE0] rounded-md px-6 py-1">{value}</span>
//   </div>
// );

// const TextBlock = ({ label, value }: { label: string; value?: string }) => (
//   <div className="flex flex-col gap-2 items-start text-sm">
//     <span className="opacity-75">{label}</span>
//     <span className="bg-[#F6EEE0] w-full rounded-md px-6 py-2">{value}</span>
//   </div>
// );

// export default SwimmingPoolRequestDetail;


'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import ToggleButton from '@/components/ui/toggleButton';
import apiCall from '@/lib/axios';

type Guest = {
  _id: string;
  firstName: string;
  lastName: string;
};

type AssignedTo = {
  _id: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
};

type SwimmingPoolRequest = {
  _id: string;
  paymentStatus: string;
  guest: Guest;
  status: string;
  requestDetail: string;
  assignedTo?: AssignedTo;
  bookingDate: string;
  startTime: string;
  endTime: string;
  requestTime: string;
  estimatedDeliveryTime?: string;
};

type Props = {
  serviceID: string;
};

const SwimmingPoolRequestDetail: React.FC<Props> = ({ serviceID }) => {
  const [data, setData] = useState<SwimmingPoolRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCost, setShowCost] = useState(false);
  const [showPaymentMode, setShowPaymentMode] = useState(false);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await apiCall('GET', `/api/services/swimming-pool/requests/${serviceID}`);
        if (res.success) setData(res.data);
      } catch (error) {
        console.error('Error fetching request:', error);
      } finally {
        setLoading(false);
      }
    };
    if (serviceID) fetchRequest();
  }, [serviceID]);

  if (loading) return <div className="mt-28 p-4">Loading...</div>;
  if (!data) return <div className="mt-28 p-4">Request not found.</div>;

  return (
    <div className="mt-24 bg-[#FAF6EF] rounded-md shadow-custom px-6 py-8 flex font-medium flex-col gap-8 w-full mb-4">
      {/* Header */}
      <div className="flex gap-12 text-sm opacity-75">
        <p>Guest ID: {data.guest._id}</p>
        <p>Request ID: {data._id}</p>
      </div>

      {/* Details */}
      <div className="space-y-8">
        <div className="flex gap-8">
          <Detail label="Guest Name" value={`${data.guest.firstName} ${data.guest.lastName}`} />
          <Detail label="Booking Date" value={new Date(data.bookingDate).toLocaleDateString()} />
          <Detail label="Time Slot" value={`${data.startTime} - ${data.endTime}`} />
        </div>

        <div className="flex gap-8">
          {/* <TextBlock label="Request Detail" value={data.requestDetail} /> */}
          <TextBlock label="Request Status" value={data.status} />
        </div>

        <div className="flex gap-8">
          <TextBlock
            label="Assigned To"
            value={
              data.assignedTo
                ? `${data.assignedTo.firstName} ${data.assignedTo.lastName} (${data.assignedTo.mobileNumber})`
                : 'Unassigned'
            }
          />
          <TextBlock
            label="Estimated Delivery"
            value={data.estimatedDeliveryTime ? new Date(data.estimatedDeliveryTime).toLocaleString() : 'N/A'}
          />
        </div>

        <div className="flex gap-8">
          <div className="flex flex-col gap-2 text-sm">
            <span className="flex gap-4 items-center">
              <p>Show Payment Status</p>
              <div onClick={() => setShowPaymentMode(prev => !prev)}>
                {/* <ToggleButton /> */}
              </div>
            </span>
            {showPaymentMode && (
              <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
                {data.paymentStatus}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <textarea
            className="w-full max-w-xl p-2 border rounded-md border-none placeholder:text-sm bg-[#F6EEE0] text-gray-700"
            placeholder="Type your message here"
            rows={6}
          />
          <div className="ml-4">
            <Button className="bg-[#A07D3D] h-8 text-white hover:outline hover:text-black">
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const Detail = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex gap-2 items-center text-sm">
    <span className="opacity-75">{label}</span>
    <span className="bg-[#F6EEE0] rounded-md px-6 py-1">{value}</span>
  </div>
);

const TextBlock = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex flex-col gap-2 items-start text-sm w-full max-w-md">
    <span className="opacity-75">{label}</span>
    <span className="bg-[#F6EEE0] w-full rounded-md px-6 py-2">{value}</span>
  </div>
);

export default SwimmingPoolRequestDetail;
