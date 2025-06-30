// import CardWrapper from './card-wrapper';
// import React from 'react';
// import {
//   GuestDetailsCardDummyData,
//   GuestDetailsCardDataType
// } from 'app/static/company-panel/GuestManagement';
// import Image from 'next/image';
// import { Heading } from '@/components/ui/heading';
// type Props = {
//   guestID?: string;
// };

// const GuestDetails = ({ guestID }: Props) => {
//   const getGuestDetails = (guestID: string | undefined) => {
//     if (guestID) {
//       return GuestDetailsCardDummyData.find(
//         (guest: any) => guest.guestID === guestID
//       );
//     } else {
//       return null;
//     }
//   };
//   const guest = getGuestDetails(guestID);
//   return (
//     <div className="flex flex-col items-center gap-6 w-full">
//       <CardWrapper title="">
//         <div className="w-full p-6 flex justify-center items-center">
//           <div className="flex w-full flex-col items-center justify-center gap-8">
//             {/* Image part */}
//             {guest?.guestImage && (
//               <div className="h-28 w-28 rounded-full overflow-hidden hover:shadow-xl duration-200">
//                 <Image
//                   src={guest?.guestImage}
//                   alt={guest.firstName + guest.lastName + ' Image'}
//                   className="object-cover"
//                 />{' '}
//               </div>
//             )}
//             {/* Details part */}
//             <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:px-10 justify-between w-full items-center">
//               {/* Left part */}
//               <div className="flex flex-col gap-6 justify-center items-end">
//                 <div className="flex justify-center items-center gap-5 group">
//                   <span className="text-sm w-32 text-start">Guest ID</span>
//                   <span className="text-sm w-48 lg:w-52 py-1 h-8 text-center rounded-lg bg-lightbrown group-hover:bg-coffee group-hover:text-white transition-all duration-100 group-hover:shadow-xl">
//                     {guest?.guestID}
//                   </span>
//                 </div>
//                 <div className="flex justify-center items-center gap-5 group">
//                   <span className="text-sm w-32 text-start">First Name</span>
//                   <span className="text-sm w-48 lg:w-52 py-1 h-8 text-center rounded-lg bg-lightbrown group-hover:bg-coffee group-hover:text-white transition-all duration-100 group-hover:shadow-xl">
//                     {guest?.firstName}
//                   </span>
//                 </div>
//                 <div className="flex justify-center items-center gap-5 group">
//                   <span className="text-sm w-32 text-start">Phone Number</span>
//                   <span className="text-sm w-48 lg:w-52 py-1 h-8 text-center rounded-lg bg-lightbrown group-hover:bg-coffee group-hover:text-white transition-all duration-100 group-hover:shadow-xl">
//                     {guest?.phoneNumber}
//                   </span>
//                 </div>
//                 <div className="flex justify-center items-center gap-5 group">
//                   <span className="text-sm w-32 text-start">Room Number</span>
//                   <span className="text-sm w-48 lg:w-52 py-1 h-8 text-center rounded-lg bg-lightbrown group-hover:bg-coffee group-hover:text-white transition-all duration-100 group-hover:shadow-xl">
//                     {/* {guest?.checkInDate} */}
//                   </span>
//                 </div>

//                 <div className="flex justify-center items-center gap-5 group">
//                   <span className="text-sm w-32 text-start">Room Category</span>
//                   <span className="text-sm w-48 lg:w-52 py-1 h-8 text-center rounded-lg bg-lightbrown group-hover:bg-coffee group-hover:text-white transition-all duration-100 group-hover:shadow-xl">
//                     {/* {guest?.roomType} */}
//                   </span>
//                 </div>
//                 <div className="flex justify-center items-center gap-5 group">
//                   <span className="text-sm w-32 text-start">Card Number</span>
//                   <span className="text-sm w-48 lg:w-52 py-1 h-8 text-center rounded-lg bg-lightbrown group-hover:bg-coffee group-hover:text-white transition-all duration-100 group-hover:shadow-xl">
//                     {/* {guest?.roomType} */}
//                   </span>
//                 </div>
//                 <div className="flex justify-center items-center gap-5 group">
//                   <span className="text-sm w-32 text-start">D.O.B</span>
//                   <span className="text-sm w-48 lg:w-52 py-1 h-8 text-center rounded-lg bg-lightbrown group-hover:bg-coffee group-hover:text-white transition-all duration-100 group-hover:shadow-xl">
//                     {/* {guest?.roomType} */}
//                   </span>
//                 </div>
//                 <div className="flex justify-center items-center gap-5 group">
//                   <span className="text-sm w-32 text-start">Anniversary</span>
//                   <span className="text-sm w-48 lg:w-52 py-1 h-8 text-center rounded-lg bg-lightbrown group-hover:bg-coffee group-hover:text-white transition-all duration-100 group-hover:shadow-xl">
//                     {/* {guest?.roomType} */}
//                   </span>
//                 </div>
//               </div>
//               {/* Right part */}
//               <div className="flex flex-col gap-6 justify-center items-end">
//                 <div className="flex justify-center items-center gap-5 group">
//                   <span className="text-sm w-32 text-start">Hotel Name</span>
//                   <span className="text-sm w-48 lg:w-52 py-1 h-8 text-center rounded-lg bg-lightbrown group-hover:bg-coffee group-hover:text-white transition-all duration-100 group-hover:shadow-xl">
//                     {guest?.hotelName}
//                   </span>
//                 </div>
//                 <div className="flex justify-center items-center gap-5 group">
//                   <span className="text-sm w-32 text-start">Last Name</span>
//                   <span className="text-sm w-48 lg:w-52 py-1 h-8 text-center rounded-lg bg-lightbrown group-hover:bg-coffee group-hover:text-white transition-all duration-100 group-hover:shadow-xl">
//                     {guest?.lastName}
//                   </span>
//                 </div>
//                 <div className="flex justify-center items-center gap-5 group">
//                   <span className="text-sm w-32 text-start">Email</span>
//                   <span className="text-sm w-48 lg:w-52 py-1 h-8 text-center rounded-lg bg-lightbrown group-hover:bg-coffee group-hover:text-white transition-all duration-100 group-hover:shadow-xl">
//                     {guest?.email}
//                   </span>
//                 </div>
//                 <div className="flex justify-center items-center gap-5 group">
//                   <span className="text-sm w-32 text-start">Check-in Time</span>
//                   <span className="text-sm w-48 lg:w-52 py-1 h-8 text-center rounded-lg bg-lightbrown group-hover:bg-coffee group-hover:text-white transition-all duration-100 group-hover:shadow-xl">
//                     {/* {guest?.email} */}
//                   </span>
//                 </div>
//                 <div className="flex justify-center items-center gap-5 group">
//                   <span className="text-sm w-32 text-start">
//                     Check-out Time
//                   </span>
//                   <span className="text-sm w-48 lg:w-52 py-1 h-8 text-center rounded-lg bg-lightbrown group-hover:bg-coffee group-hover:text-white transition-all duration-100 group-hover:shadow-xl">
//                     {/* {guest?.email} */}
//                   </span>
//                 </div>
//                 <div className="flex flex-col justify-center items-start gap-5 group w-full">
//                   <span className="text-sm w-32 text-start">
//                     Special Request
//                   </span>
//                   <textarea className="text-sm w-full py-1 h-20 text-center rounded-lg bg-lightbrown group-hover:bg-coffee group-hover:text-white transition-all duration-100 group-hover:shadow-xl">
//                     {/* {guest?.email} */}
//                   </textarea>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </CardWrapper>
//       <div className="flex flex-col items-start w-full md:px-5">
//         <Heading title="Indentification" className="mt-2" />
//         <CardWrapper title="">
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
//             <div className="rounded-sm w-full h-40 md:h-56 bg-[#D9D9D9]">
//               <Image
//                 src="/aadar.png"
//                 alt="Guest ID"
//                 width={100}
//                 height={100}
//                 className="object-cover h-full w-full"
//               />
//             </div>
//             <div className="rounded-sm w-full h-40 md:h-56 bg-[#D9D9D9]">
//               <Image
//                 src="/pancard.png"
//                 alt="Guest ID"
//                 width={100}
//                 height={100}
//                 className="object-cover h-full w-full"
//               />
//             </div>
//             <div className="rounded-sm w-full h-40 md:h-56 bg-[#D9D9D9]">
//               <Image
//                 src="/passport.png"
//                 alt="Guest ID"
//                 width={100}
//                 height={100}
//                 className="object-cover h-full w-full"
//               />
//             </div>
//             <div className="rounded-sm w-full h-40 md:h-56 bg-[#D9D9D9]">
//               <Image
//                 src="/guest-id.png"
//                 alt="Guest ID"
//                 width={100}
//                 height={100}
//                 className="object-cover"
//               />
//             </div>
//             <div className="rounded-sm w-full h-40 md:h-56 bg-[#D9D9D9]">
//               <Image
//                 src="/guest-id.png"
//                 alt="Guest ID"
//                 width={100}
//                 height={100}
//                 className="object-cover"
//               />
//             </div>
//             <div className="rounded-sm w-full h-40 md:h-56 bg-[#D9D9D9]">
//               <Image
//                 src="/guest-id.png"
//                 alt="Guest ID"
//                 width={100}
//                 height={100}
//                 className="object-cover"
//               />
//             </div>
//           </div>
//         </CardWrapper>
//       </div>
//     </div>
//   );
// };

// export default GuestDetails;


'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import apiCall from '@/lib/axios';
import { Heading } from '@/components/ui/heading';
import CardWrapper from './card-wrapper';

type Props = {
  guestID?: string;
};

type GuestDetailsApiResponse = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  checkInDate: string;
  checkOutDate: string;
  assignedRoomNumber: string;
  state: string;
  paymentStatus: string;
  status: string;
  specialRequests: string;
  guestsCount?: number;
  guestImage?: string;
  pincode?: string;
  anniversary?: string;
  address?: string;
};

const GuestDetails: React.FC<Props> = ({ guestID }) => {
  const [guest, setGuest] = useState<GuestDetailsApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGuestDetails = async () => {
    if (!guestID) return;
    try {
      const response = await apiCall('GET', `/api/booking/platform/${guestID}`);
      if (response?.success !== false) {
        setGuest(response.booking);
      } else {
        setError('Guest not found');
      }
    } catch (err) {
      setError('Error fetching guest details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuestDetails();
  }, [guestID]);

  const formatDateTime = (dateTime: string | undefined) => {
    if (!dateTime) return 'N/A';
    const date = new Date(dateTime);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })}`;
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <CardWrapper title="">
        <div className="w-full p-6 flex justify-center items-center">
          <div className="flex w-full flex-col items-center justify-center gap-8">
            {/* Image */}
            {guest?.guestImage && (
              <div className="h-28 w-28 rounded-full overflow-hidden hover:shadow-xl duration-200">
                <Image
                  src={guest.guestImage}
                  alt={`${guest.firstName} ${guest.lastName} Image`}
                  className="object-cover"
                  width={112}
                  height={112}
                />
              </div>
            )}
            {/* Details */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 justify-between w-full items-center lg:px-10">
              <div className="flex flex-col gap-4 items-end">
                {[
                  ['Guest ID', guest?._id],
                  ['First Name', guest?.firstName],
                  ['Phone Number', guest?.phoneNumber],
                  ['Room Number', guest?.assignedRoomNumber],
                  ['Address', guest?.address],
                  ['State', guest?.state],
                  ['Pincode', guest?.pincode],
                  ['Payment Status', guest?.paymentStatus],
                ].map(([label, value]) => (
                  <div className="flex gap-5 group" key={label}>
                    <span className="text-sm w-32 text-start">{label}</span>
                    <span className="text-sm w-52 py-1 h-8 text-center rounded-lg bg-lightbrown group-hover:bg-coffee group-hover:text-white transition-all duration-100 group-hover:shadow-xl">
                      {value || 'N/A'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 items-end">
                {[
                  ['Guest Count', guest?.guestsCount],
                  ['Last Name', guest?.lastName],
                  ['Email', guest?.email],
                  ['Status', guest?.status],
                  ['Check-in Time', formatDateTime(guest?.checkInDate)],
                  ['Check-out Time', formatDateTime(guest?.checkOutDate)]
                ].map(([label, value]) => (
                  <div className="flex gap-5 group" key={label}>
                    <span className="text-sm w-32 text-start">{label}</span>
                    <span className="text-sm w-52 py-1 h-8 text-center rounded-lg bg-lightbrown group-hover:bg-coffee group-hover:text-white transition-all duration-100 group-hover:shadow-xl">
                      {value || 'N/A'}
                    </span>
                  </div>
                ))}

                <div className="flex flex-col justify-center items-start gap-2 group w-full">
                  <span className="text-sm w-32 text-start">Special Request</span>
                  <textarea
                    readOnly
                    value={guest?.specialRequests || 'None'}
                    className="text-sm w-full py-1 h-20 text-center rounded-lg bg-lightbrown resize-none group-hover:bg-coffee group-hover:text-white transition-all duration-100 group-hover:shadow-xl"
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
      </CardWrapper>

      {/* Identification Section */}
      <div className="flex flex-col items-start w-full md:px-5">
        <Heading title="Identification" className="mt-2" />
        <CardWrapper title="">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {['/aadar.png', '/pancard.png', '/passport.png', '/guest-id.png'].map((src, index) => (
              <div key={index} className="rounded-sm w-full h-40 md:h-56 bg-[#D9D9D9]">
                <Image
                  src={src}
                  alt="Guest ID"
                  width={100}
                  height={100}
                  className="object-cover h-full w-full"
                />
              </div>
            ))}
          </div>
        </CardWrapper>
      </div>
    </div>
  );
};

export default GuestDetails;
