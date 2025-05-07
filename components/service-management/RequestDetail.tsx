'use client';
import React from 'react';

type Props<T> = {
  requestDetails: T[];
  requestId: string;
};

const RequestDetail = <T extends Record<string, any>>({
  requestDetails,
  requestId
}: Props<T>) => {
  const getDetails = (requestId: string | undefined) => {
    if (requestId) {
      return requestDetails.find((request) => request.requestID === requestId);
    }
    return null;
  };

  const request = getDetails(requestId);

  return (
    <div className="bg-[#FAF6EF] rounded-md shadow-custom px-8 pb-10 pt-6 flex font-medium flex-col gap-16 w-full">
      {/* Header */}
      <div className="flex gap-16 text-sm opacity-55">
        <p>Guest ID: {request?.guestDetails?.guestID}</p>
        <p>Request ID: {request?.requestID}</p>
      </div>

      {/* Details */}
      <div className="space-y-8">
        {/* Upper Part (3-column layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex gap-2 items-center text-sm">
            <span className="opacity-75">Guest name</span>{' '}
            <span className="bg-[#F6EEE0] rounded-md px-6 py-1">
              {request?.guestDetails?.name?.toUpperCase()}
            </span>
          </div>
          <div className="flex gap-2 items-center text-sm">
            <span className="opacity-75">Mobile number</span>{' '}
            <span className="bg-[#F6EEE0] rounded-md px-6 py-1">
              {request?.guestDetails?.mobileNumber}
            </span>
          </div>
          <div className="flex gap-2 items-center text-sm">
            <span className="opacity-75">Email</span>{' '}
            <span className="bg-[#F6EEE0] rounded-md px-6 py-1">
              {request?.guestDetails?.email}
            </span>
          </div>
        </div>

        {/* Lower Part (3-column layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Left part */}
          <div className="space-y-8">
            <div className="flex flex-col items-start gap-2 text-sm">
              <span className="opacity-75">Request Detail</span>{' '}
              <span className="bg-[#F6EEE0] w-full max-w-96 rounded-md px-6 py-2">
                "{request?.requestDetail}"
              </span>
            </div>
            <div className="flex flex-col gap-2 items-start text-sm">
              <span className="opacity-75">Response Detail</span>{' '}
              <span className="bg-[#F6EEE0] w-full max-w-96 py-2 rounded-md px-6">
                "Thank you for your request! Our team will clean your room
                shortly to ensure a fresh and comfortable space."
              </span>
            </div>
          </div>

          {/* Right part */}
          <div className="space-y-8">
            <div className="flex flex-col gap-2 items-start text-sm">
              <span className="opacity-75">Request Assigned to</span>{' '}
              <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
                {request?.requestAssignedTo}
              </span>
            </div>
            <div className="flex flex-col gap-2 items-start text-sm">
              <span className="opacity-75">Estimated delivery time</span>{' '}
              <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
                10:00 min
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-start text-sm">
            <span className="opacity-75">Assigned Type</span>{' '}
            <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
              Employee 1
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;
