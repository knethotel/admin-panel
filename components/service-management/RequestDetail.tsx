// 'use client';
// import React, { useEffect, useState } from 'react';
// import apiCall from '@/lib/axios';
// import AssignModal from '@/components/shared/AssignModal';

// type Props<T> = {
//   requestId: string;
//   mode?: 'reception' | 'other' | 'housekeeping' | 'inroomcontrol' | 'gym' | 'inroomdining';
// };

// interface RequestData {
//   _id: string;
//   guest: {
//     _id: string;
//     firstName: string;
//     lastName: string;
//     mobileNumber?: string;
//     email?: string;
//   };
//   requestDetail: string;
//   responseDetail?: string;
//   requestAssignedTo?: string;
//   estimatedDeliveryTime?: string;
//   requestType: string;
//   assignedTo?: {
//     _id: string;
//     firstName: string;
//     lastName: string;
//     mobileNumber?: string;
//   };

// }

// const RequestDetail = <T extends Record<string, any>>({
//   requestId,
//   mode = 'other'
// }: Props<T>) => {
//   const [apiData, setApiData] = useState<RequestData | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (mode === 'reception' && requestId) {
//         setLoading(true);
//         try {
//           const result = await apiCall('GET', `api/services/reception/requests/${requestId}`);
//           if (result.success) {
//             setApiData(result.data);
//           }
//         } catch (error) {
//           console.error('Error fetching request details:', error);
//         } finally {
//           setLoading(false);
//         }
//       } else if (mode === 'housekeeping' && requestId) {
//         setLoading(true);
//         try {
//           const result = await apiCall('GET', `api/services/housekeeping/requests/${requestId}`);
//           if (result.success) {
//             setApiData(result.data);
//           }
//         } catch (error) {
//           console.error('Error fetching housekeeping request details:', error);
//         } finally {
//           setLoading(false);
//         }
//       } else if (mode === 'inroomcontrol' && requestId) {
//         setLoading(true);
//         try {
//           const result = await apiCall('GET', `api/services/inroomcontrol/requests/${requestId}`);
//           if (result.success) {
//             setApiData(result.data);
//           }
//         } catch (error) {
//           console.error('Error fetching in-room control request details:', error);
//         } finally {
//           setLoading(false);
//         }
//       } else if (mode === 'gym' && requestId) {
//         setLoading(true);
//         try {
//           const result = await apiCall('GET', `api/services/facility/requests/${requestId}`);
//           if (result.success) {
//             setApiData(result.data);
//           }
//         } catch (error) {
//           console.error('Error fetching gym request details:', error);
//         } finally {
//           setLoading(false);
//         }
//       } else if (mode === 'inroomdining' && requestId) {
//         setLoading(true);
//         try {
//           const result = await apiCall('GET', `api/services/inroomdining/bookings/${requestId}`);
//           console.log('API Response:', result);
//           if (result.success) {
//             setApiData(result.data);
//           }
//         } catch (error) {
//           console.error('Error fetching gym request details:', error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchData();
//   }, [mode, requestId]);

//   if (loading) {
//     return <div className="flex justify-center items-center h-full">Loading...</div>;
//   }

//   return (
//     <>
//       <div className="bg-[#FAF6EF] rounded-md shadow-custom px-8 pb-10 pt-6 flex font-medium flex-col gap-16 w-full">
//         {/* Header */}
//         <div className="flex gap-16 text-sm opacity-55">
//           <p>Guest ID: {apiData?.guest?._id || 'N/A'}</p>
//           <p>Request ID: {apiData?._id || 'N/A'}</p>
//         </div>

//         {/* Details */}
//         <div className="space-y-8">
//           {/* Upper Part (3-column layout) */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//             <div className="flex gap-2 items-center text-sm">
//               <span className="opacity-75">Guest name</span>{' '}
//               <span className="bg-[#F6EEE0] rounded-md px-6 py-1">
//                 {apiData?.guest ? `${apiData.guest.firstName} ${apiData.guest.lastName}`.toUpperCase() : 'N/A'}
//               </span>
//             </div>
//             <div className="flex gap-2 items-center text-sm">
//               <span className="opacity-75">Mobile number</span>{' '}
//               <span className="bg-[#F6EEE0] rounded-md px-6 py-1">
//                 {apiData?.guest?.mobileNumber || 'N/A'}
//               </span>
//             </div>
//             <div className="flex gap-2 items-center text-sm">
//               <span className="opacity-75">Email</span>{' '}
//               <span className="bg-[#F6EEE0] rounded-md px-6 py-1">
//                 {apiData?.guest?.email || 'N/A'}
//               </span>
//             </div>
//           </div>

//           {/* Lower Part (3-column layout) */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//             {/* Left part */}
//             <div className="space-y-8">
//               <div className="flex flex-col items-start gap-2 text-sm">
//                 <span className="opacity-75">Request Detail</span>{' '}
//                 <span className="bg-[#F6EEE0] w-full max-w-96 rounded-md px-6 py-2">
//                   "{apiData?.requestDetail || 'N/A'}"
//                 </span>
//               </div>
//               <div className="flex flex-col gap-2 items-start text-sm">
//                 <span className="opacity-75">Response Detail</span>{' '}
//                 <span className="bg-[#F6EEE0] w-full max-w-96 py-2 rounded-md px-6">
//                   "{apiData?.responseDetail || 'N/A'}"
//                 </span>
//               </div>
//             </div>

//             {/* Right part */}
//             <div className="space-y-8">
//               <div className="flex flex-col gap-2 items-start text-sm">
//                 <span className="opacity-75">Request Assigned to</span>{' '}
//                 <div
//                   className="bg-[#F6EEE0] rounded-md px-10 py-1 cursor-pointer hover:bg-[#F0E6D6] transition-colors"
//                   onClick={() =>
//                     (mode === 'reception' ||
//                       mode === 'housekeeping' ||
//                       mode === 'inroomcontrol' ||
//                       mode === 'inroomdining') && setIsAssignModalOpen(true)
//                   }
//                 >
//                   {apiData?.assignedTo?.firstName
//                     ? `${apiData.assignedTo.firstName} ${apiData.assignedTo.lastName}`
//                     : 'N/A'}
//                 </div>
//               </div>
//               <div className="flex flex-col gap-2 items-start text-sm">
//                 <span className="opacity-75">Estimated delivery time</span>{' '}
//                 <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
//                   {apiData?.estimatedDeliveryTime || 'N/A'}
//                 </span>
//               </div>
//             </div>
//             <div className="flex flex-col gap-2 items-start text-sm">
//               <span className="opacity-75">Request Type</span>{' '}
//               <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
//                 {apiData?.requestType || 'N/A'}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <AssignModal
//         onClose={() => setIsAssignModalOpen(false)}
//         // onAssign={handleAssign}
//         requestId={isAssignModalOpen ? requestId : undefined}
//         title="Assign Request to Employee"
//       />
//     </>
//   );
// };

// export default RequestDetail;


'use client';
import React, { useEffect, useState } from 'react';
import apiCall from '@/lib/axios';
import AssignModal from '@/components/shared/AssignModal';

type Props<T> = {
  requestId: string;
  mode?: 'reception' | 'other' | 'housekeeping' | 'inroomcontrol' | 'gym' | 'inroomdining';
};

interface RequestData {
  _id: string;
  guest: {
    _id: string;
    assignedRoomNumber?: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    email?: string;
  };
  requestDetail: string;
  responseDetail?: string;
  requestAssignedTo?: string;
  estimatedDeliveryTime?: string;
  requestType: string;
  assignedTo?: {
    _id: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
  };

  // ✅ Additional fields
  uniqueId?: string;
  status?: string;
  paymentStatus?: string;
  serviceType?: string;
  wakeUpTime?: string;
  HotelId?: string;
  createdAt?: string;
  updatedAt?: string;

  amount?: {
    subtotal: number;
    discount: number;
    finalAmount: number;
  };

  coupon?: {
    code: string;
    type: string;
    value: number;
  };

  items?: {
    item: string;
    quantity: number;
    _id: string;
  }[];

  orderedItems?: {
    _id: string;
    quantity: number;
    product: {
      _id: string;
      productName: string;
      productType: string;
      description: string;
      foodType: string;
      imageUrl: string;
      cost: number;
      HotelId: string;
      visibility?: boolean;
      [key: string]: any; // for any extra keys
    };
  }[];

  slot?: {
    _id: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    price: number;
    maxCapacity: number;
    currentCapacity: number;
    [key: string]: any; // fallback for unexpected keys
  };

}


const RequestDetail = <T extends Record<string, any>>({
  requestId,
  mode = 'other'
}: Props<T>) => {
  const [apiData, setApiData] = useState<RequestData | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (mode === 'reception' && requestId) {
        setLoading(true);
        try {
          const result = await apiCall('GET', `api/services/reception/requests/${requestId}`);
          if (result.success) {
            setApiData(result.data);
          }
        } catch (error) {
          console.error('Error fetching request details:', error);
        } finally {
          setLoading(false);
        }
      } else if (mode === 'housekeeping' && requestId) {
        setLoading(true);
        try {
          const result = await apiCall('GET', `api/services/housekeeping/requests/${requestId}`);
          if (result.success) {
            setApiData(result.data);
          }
        } catch (error) {
          console.error('Error fetching housekeeping request details:', error);
        } finally {
          setLoading(false);
        }
      } else if (mode === 'inroomcontrol' && requestId) {
        setLoading(true);
        try {
          const result = await apiCall('GET', `api/services/inroomcontrol/requests/${requestId}`);
          if (result.success) {
            setApiData(result.data);
          }
        } catch (error) {
          console.error('Error fetching in-room control request details:', error);
        } finally {
          setLoading(false);
        }
      } else if (mode === 'gym' && requestId) {
        setLoading(true);
        try {
          const result = await apiCall('GET', `api/services/facility/requests/${requestId}`);
          if (result.success) {
            setApiData(result.data);
          }
        } catch (error) {
          console.error('Error fetching gym request details:', error);
        } finally {
          setLoading(false);
        }
      } else if (mode === 'inroomdining' && requestId) {
        setLoading(true);
        try {
          const result = await apiCall('GET', `api/services/inroomdining/bookings/${requestId}`);
          console.log('API Response:', result);
          if (result.success) {
            setApiData(result.data);
          }
        } catch (error) {
          console.error('Error fetching gym request details:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [mode, requestId]);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <>
      <div className="bg-[#FAF6EF] rounded-md shadow-custom px-8 pb-10 pt-6 flex font-medium flex-col gap-16 w-full">
        {/* Header */}
        <div className="flex flex-wrap gap-16 text-sm opacity-55">
          <p>Guest ID: {apiData?.guest?._id || 'N/A'}</p>
          <p>Request ID: {apiData?._id || 'N/A'}</p>
          <p>Hotel ID: {apiData?.HotelId || 'N/A'}</p>
          <p>Status: {apiData?.status || 'N/A'}</p>
        </div>

        {/* Details */}
        <div className="space-y-8">
          {/* Upper Part (3-column layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex gap-2 items-center text-sm">
              <span className="opacity-75">Guest name</span>{' '}
              <span className="bg-[#F6EEE0] rounded-md px-6 py-1">
                {apiData?.guest ? `${apiData.guest.firstName} ${apiData.guest.lastName}`.toUpperCase() : 'N/A'}
              </span>
            </div>
            <div className="flex gap-2 items-center text-sm">
              <span className="opacity-75">Mobile number</span>{' '}
              <span className="bg-[#F6EEE0] rounded-md px-6 py-1">
                {apiData?.guest?.phoneNumber || 'N/A'}
              </span>
            </div>
            <div className="flex gap-2 items-center text-sm">
              <span className="opacity-75">Email</span>{' '}
              <span className="bg-[#F6EEE0] rounded-md px-6 py-1">
                {apiData?.guest?.email || 'N/A'}
              </span>
            </div>
          </div>

          {/* Lower Part (3-column layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Left section */}
            <div className="space-y-8">
              <div className="flex flex-col items-start gap-2 text-sm">
                <span className="opacity-75">Request Detail</span>
                <span className="bg-[#F6EEE0] w-full max-w-96 rounded-md px-6 py-2">
                  "{apiData?.requestDetail || 'N/A'}"
                </span>
              </div>
              <div className="flex flex-col gap-2 items-start text-sm">
                <span className="opacity-75">Response Detail</span>
                <span className="bg-[#F6EEE0] w-full max-w-96 py-2 rounded-md px-6">
                  "{apiData?.responseDetail || 'N/A'}"
                </span>
              </div>
              <div className="flex flex-col gap-2 items-start text-sm">
                <span className="opacity-75">Payment Status</span>
                <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
                  {apiData?.paymentStatus || 'N/A'}
                </span>
              </div>
            </div>

            {/* Middle section */}
            <div className="space-y-8">
              <div className="flex flex-col gap-2 items-start text-sm">
                <span className="opacity-75">Request Assigned to</span>
                <div
                  className="bg-[#F6EEE0] rounded-md px-10 py-1 cursor-pointer hover:bg-[#F0E6D6] transition-colors"
                  onClick={() =>
                    (mode === 'reception' ||
                      mode === 'housekeeping' ||
                      mode === 'inroomcontrol' ||
                      mode === 'inroomdining') && setIsAssignModalOpen(true)
                  }
                >
                  {apiData?.assignedTo?.firstName
                    ? `${apiData.assignedTo.firstName} ${apiData.assignedTo.lastName}`
                    : 'N/A'}
                </div>
              </div>
              <div className="flex flex-col gap-2 items-start text-sm">
                <span className="opacity-75">Estimated delivery time</span>
                <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
                  {apiData?.estimatedDeliveryTime || 'N/A'}
                </span>
              </div>
              <div className="flex flex-col gap-2 items-start text-sm">
                <span className="opacity-75">Wake Up Time</span>
                <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
                  {/* {apiData?.wakeUpTime || 'N/A'} */}
                  {apiData?.wakeUpTime
                    ? new Date(apiData.wakeUpTime).toLocaleString()
                    : 'N/A'}
                </span>
              </div>
            </div>

            {/* Right section */}
            <div className="space-y-8">
              <div className="flex flex-col gap-2 items-start text-sm">
                <span className="opacity-75">Request Type</span>
                <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
                  {apiData?.requestType || 'N/A'}
                </span>
              </div>
              <div className="flex flex-col gap-2 items-start text-sm">
                <span className="opacity-75">Service Type</span>
                <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
                  {apiData?.serviceType || 'N/A'}
                </span>
              </div>
              <div className="flex flex-col gap-2 items-start text-sm">
                <span className="opacity-75">Assigned Room No.</span>
                <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
                  {apiData?.guest?.assignedRoomNumber || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Created / Updated info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 text-sm">
            <div className="flex flex-col gap-1">
              <span className="opacity-75">Created At</span>
              <span className="bg-[#F6EEE0] rounded-md px-6 py-1">
                {apiData?.createdAt
                  ? new Date(apiData.createdAt).toLocaleString()
                  : 'N/A'}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="opacity-75">Updated At</span>
              <span className="bg-[#F6EEE0] rounded-md px-6 py-1">
                {apiData?.updatedAt
                  ? new Date(apiData.updatedAt).toLocaleString()
                  : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
      {mode === 'housekeeping' && requestId || mode === 'inroomdining' && requestId && (
        <div className="flex flex-col gap-6">

          {/* Amount Section */}
          <div className="w-full rounded-lg border border-[#E4D7C4] bg-[#F6EEE0] px-6 py-4 shadow-sm">
            <h3 className="text-base font-semibold text-[#4B3F2F] mb-2">Amount Details</h3>
            <div className="text-sm space-y-1 text-[#333]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{apiData?.amount?.subtotal ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>₹{apiData?.amount?.discount ?? 0}</span>
              </div>
              <div className="flex justify-between font-medium text-[#1B1B1B]">
                <span>Total</span>
                <span>₹{apiData?.amount?.finalAmount ?? 0}</span>
              </div>
            </div>
          </div>

          {/* Coupon Section */}
          {apiData?.coupon?.code && (
            <div className="w-full rounded-lg border border-[#E4D7C4] bg-[#F6EEE0] px-6 py-4 shadow-sm">
              <h3 className="text-base font-semibold text-[#4B3F2F] mb-2">Coupon Applied</h3>
              <div className="text-sm text-[#333] space-y-1">
                <div className="flex justify-between">
                  <span>Code</span>
                  <span>{apiData.coupon.code}</span>
                </div>
                <div className="flex justify-between">
                  <span>Type</span>
                  <span>{apiData.coupon.type}</span>
                </div>
                <div className="flex justify-between">
                  <span>Value</span>
                  <span>{apiData.coupon.value}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Ordered Items Section */}
          {(() => {
            const items = apiData?.items;
            if (!items || items.length === 0) return null;
            return (
              <div className="w-full rounded-lg border border-[#E4D7C4] bg-[#F6EEE0] px-6 py-4 shadow-sm">
                <h3 className="text-base font-semibold text-[#4B3F2F] mb-2">Ordered Items</h3>
                <ul className="list-disc list-inside text-sm text-[#333] space-y-1">
                  {items.map((itm, idx) => (
                    <li key={itm._id || idx}>
                      <span className="font-medium">Item ID:</span> {itm.item}, <span className="font-medium">Qty:</span> {itm.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })()}

        </div>
      )}

      {mode === 'inroomdining' && Array.isArray(apiData?.orderedItems) && apiData.orderedItems.length > 0 && (
        <div className="w-full rounded-lg border border-[#E4D7C4] bg-[#F6EEE0] px-6 py-4 shadow-sm">
          <h3 className="text-base font-semibold text-[#4B3F2F] mb-4">Ordered Items</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {apiData.orderedItems.map((item, idx) => {
              const product = item.product || {};
              return (
                <div
                  key={item._id || idx}
                  className="border border-[#d6c7ae] rounded-lg p-4 bg-white shadow"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <img
                      src={product.imageUrl || '/fallback.png'}
                      alt={product.productName || 'Product Image'}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#1B1B1B] text-sm">{product.productName || 'N/A'}</h4>
                      <p className="text-xs text-gray-500">{product.productType || 'N/A'} • {product.foodType || 'N/A'}</p>
                    </div>
                  </div>
                  <p className="text-sm mb-1">
                    <span className="font-medium text-[#4B3F2F]">Description: </span>{product.description || 'N/A'}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-medium text-[#4B3F2F]">Quantity: </span>{item.quantity}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-medium text-[#4B3F2F]">Unit Cost: </span>₹{product.cost ?? 'N/A'}
                  </p>
                  <p className="text-sm font-semibold mt-2">
                    <span className="text-[#1B1B1B]">Total: </span>₹{(product.cost ?? 0) * item.quantity}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {mode !== 'inroomdining' && apiData?.slot && (
        <div className="mt-6 p-4 border rounded-xl shadow-sm bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Slot Details</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-700">
            <div>
              <span className="font-medium text-gray-600">Day:</span>
              <p>{apiData.slot?.dayOfWeek || 'N/A'}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Time:</span>
              <p>{apiData.slot?.startTime && apiData.slot?.endTime ? `${apiData.slot.startTime} - ${apiData.slot.endTime}` : 'N/A'}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Price:</span>
              <p>₹{apiData.slot?.price?.toFixed(2) || '0.00'}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Capacity:</span>
              <p>
                {apiData.slot?.currentCapacity || 0}/{apiData.slot?.maxCapacity || 0}
              </p>
            </div>
          </div>
        </div>

      )}

      <AssignModal
        onClose={() => setIsAssignModalOpen(false)}
        // onAssign={handleAssign}
        requestId={isAssignModalOpen ? requestId : undefined}
        title="Assign Request to Employee"
      />
    </>
  );
};

export default RequestDetail;
