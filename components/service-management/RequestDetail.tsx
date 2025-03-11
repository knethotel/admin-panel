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
    <div className="mt-24 bg-[#FAF6EF] rounded-md shadow-custom px-6 pb-8 pt-4 flex font-medium flex-col gap-14 w-full">
      {/* Header */}
      <div className="flex gap-12 text-xs opacity-55">
        <p>Guest ID: {request?.guestDetails?.guestID}</p>
        <p>Request ID: {request?.requestID}</p>
      </div>

      {/* Details */}
      <div className="space-y-6">
        {/* Upper Part */}
        <div className="flex gap-4">
          <div className="flex gap-2 items-center text-xs">
            <span className="opacity-75">Guest name</span>{' '}
            <span className="bg-[#F6EEE0] rounded-md px-6 py-1">
              {request?.guestDetails?.name?.toUpperCase()}
            </span>
          </div>
          <div className="flex gap-2 items-center text-xs">
            <span className="opacity-75">Mobile number</span>{' '}
            <span className="bg-[#F6EEE0] rounded-md px-6 py-1">
              {request?.guestDetails?.mobileNumber}
            </span>
          </div>
          <div className="flex gap-2 items-center text-xs">
            <span className="opacity-75">Email</span>{' '}
            <span className="bg-[#F6EEE0] rounded-md px-6 py-1">
              {request?.guestDetails?.email}
            </span>
          </div>
        </div>

        {/* Lower Part */}
        <div className="flex gap-4">
          {/* Left part */}
          <div className="w-96 space-y-6">
            <div className="flex flex-col items-start gap-2 text-xs">
              <span className="opacity-75">Request Detail</span>{' '}
              <span className="bg-[#F6EEE0] rounded-md px-6 py-2">
                "{request?.requestDetail}"
              </span>
            </div>
            <div className="flex flex-col gap-2 items-start text-xs">
              <span className="opacity-75">Response Detail</span>{' '}
              <span className="bg-[#F6EEE0] py-2 rounded-md px-6">
                "{request?.responseDetail}"
              </span>
            </div>
          </div>

          {/* Right part */}
          <div>
            <div className="flex flex-col gap-2 items-start text-xs">
              <span className="opacity-75">Request Assigned to</span>{' '}
              <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
                {request?.requestAssignedTo}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;
