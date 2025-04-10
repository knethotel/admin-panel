import CardWrapper from './card-wrapper';
import React from 'react';
import {
  GuestDetailsCardDummyData,
  GuestDetailsCardDataType
} from 'app/static/company-panel/GuestManagement';
import Image from 'next/image';
type Props = {
  guestID?: string;
};

const GuestDetails = ({ guestID }: Props) => {
  const getGuestDetails = (guestID: string | undefined) => {
    if (guestID) {
      return GuestDetailsCardDummyData.find(
        (guest: any) => guest.guestID === guestID
      );
    } else {
      return null;
    }
  };
  const guest = getGuestDetails(guestID);
  return (
    <CardWrapper title="">
      <div className="w-full p-6 flex justify-center items-center">
        <div className="flex w-full flex-col items-center justify-center gap-8">
          {/* Image part */}
          {guest?.guestImage && (
            <div className="h-28 w-28 rounded-full overflow-hidden hover:shadow-xl duration-200">
              <Image
                src={guest?.guestImage}
                alt={guest.firstName + guest.lastName + ' Image'}
                className="object-cover"
              />{' '}
            </div>
          )}
          {/* Details part */}
          <div className="flex justify-between w-full items-center">
            {/* Left part */}
            <div className="flex flex-col gap-4 justify-center items-end">
              <div className="flex justify-center items-center gap-5 group">
                <span className="text-sm">Guest ID</span>
                <span className="text-sm w-48 py-1 text-center rounded-lg bg-lightbrown group-hover:bg-coffee group-hover:text-white transition-all duration-100 group-hover:shadow-xl">
                  {guest?.guestID}
                </span>
              </div>
              <div className="flex justify-center items-center gap-5 group">
                <span className="text-sm">First Name</span>
                <span className="text-sm w-48 py-1 text-center rounded-lg bg-lightbrown group-hover:bg-coffee group-hover:text-white transition-all duration-100 group-hover:shadow-xl">
                  {guest?.firstName}
                </span>
              </div>
              <div className="flex justify-center items-center gap-5 group">
                <span className="text-sm">Phone Number</span>
                <span className="text-sm w-48 py-1 text-center rounded-lg bg-lightbrown group-hover:bg-coffee group-hover:text-white transition-all duration-100 group-hover:shadow-xl">
                  {guest?.phoneNumber}
                </span>
              </div>
            </div>
            {/* Right part */}
            <div className="flex flex-col gap-4 justify-center items-end">
              <div className="flex justify-center items-center gap-5 group">
                <span className="text-sm">Hotel Name</span>
                <span className="text-sm w-48 py-1 text-center rounded-lg bg-lightbrown group-hover:bg-coffee group-hover:text-white transition-all duration-100 group-hover:shadow-xl">
                  {guest?.hotelName}
                </span>
              </div>
              <div className="flex justify-center items-center gap-5 group">
                <span className="text-sm">Last Name</span>
                <span className="text-sm w-48 py-1 text-center rounded-lg bg-lightbrown group-hover:bg-coffee group-hover:text-white transition-all duration-100 group-hover:shadow-xl">
                  {guest?.lastName}
                </span>
              </div>
              <div className="flex justify-center items-center gap-5 group">
                <span className="text-sm">Email</span>
                <span className="text-sm w-48 py-1 text-center rounded-lg bg-lightbrown group-hover:bg-coffee group-hover:text-white transition-all duration-100 group-hover:shadow-xl">
                  {guest?.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};

export default GuestDetails;
