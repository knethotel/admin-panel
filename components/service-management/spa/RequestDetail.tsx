import ToggleButton from '@/components/ui/toggleButton';
import React from 'react';

type Props<T> = {
  requestDetails: T[];
  serviceID: string;
};

const SpaServiceRequestDetail = <T extends Record<string, any>>({
  requestDetails,
  serviceID
}: Props<T>) => {
  const getDetails = (serviceID: string | undefined) => {
    if (serviceID) {
      return requestDetails.find((service) => service.serviceID === serviceID);
    }
    return null;
  };

  const service = getDetails(serviceID);

  return (
    <div className="mt-24 bg-[#FAF6EF] rounded-md shadow-custom px-6 pb-8 pt-4 flex font-medium flex-col gap-14 w-full">
      {/* Header */}
      <div className="flex gap-12 text-xs opacity-55">
        <p>Guest ID: {service?.guestDetails?.guestID}</p>
        <p>Service ID: {service?.serviceID}</p>
        <p>Service Duration: {service?.duration}</p>
      </div>

      {/* Details */}
      <div className="space-y-6">
        {/* Upper Part */}
        <div className="flex gap-4">
          <div className="flex gap-2 items-center text-xs">
            <span className="opacity-55">Guest name</span>{' '}
            <span className="bg-[#F6EEE0] rounded-md px-6 py-1">
              {service?.guestDetails?.name?.toUpperCase()}
            </span>
          </div>
          <div className="flex gap-2 items-center text-xs">
            <span className="opacity-55">Mobile number</span>{' '}
            <span className="bg-[#F6EEE0] rounded-md px-6 py-1">
              {service?.guestDetails?.mobileNumber}
            </span>
          </div>
          <div className="flex gap-2 items-center text-xs">
            <span className="opacity-55">Email</span>{' '}
            <span className="bg-[#F6EEE0] rounded-md px-6 py-1">
              {service?.guestDetails?.email}
            </span>
          </div>
        </div>

        {/* Lower Part */}
        <div className="flex gap-4">
          {/* Left part */}
          <div className="space-y-6">
            <div className="flex flex-col items-start gap-2 text-xs">
              <span className="opacity-55">Request Detail</span>{' '}
              <span className="bg-[#F6EEE0] rounded-md px-6 py-2">
                "{service?.requestDetail}"
              </span>
            </div>
            <div className="flex flex-col gap-2 items-start text-xs">
              <span className="opacity-55">Response Detail</span>{' '}
              <span className="bg-[#F6EEE0] py-2 rounded-md px-6">
                "{service?.responseDetail}"
              </span>
            </div>
            <div className="flex flex-col gap-2 items-start text-xs">
              <span className="opacity-55">Service Category</span>{' '}
              <span className="bg-[#F6EEE0] py-2 rounded-md px-6">
                {service?.serviceCategory}
              </span>
            </div>
            <div className="flex flex-col gap-2 items-start text-xs">
              <span className="opacity-55">Special Request</span>{' '}
              <span className="bg-[#F6EEE0] py-2 rounded-md px-6">None</span>
            </div>

            {/* THis will be a form item  */}
            <div className="flex flex-col gap-2 items-start text-xs">
              <span className="opacity-55">Additional service</span>{' '}
              <span className="bg-[#F6EEE0] py-2 rounded-md px-6">None</span>
            </div>
          </div>

          {/* Right part */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 items-start text-xs">
              <span className="opacity-55">Request Assigned to</span>{' '}
              <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
                {service?.requestAssignedTo}
              </span>
            </div>
            <div className="flex flex-col gap-2 items-start text-xs">
              <span className="opacity-55 w-full flex justify-between">
                <p>Effective cost</p>
                <span>
                  {' '}
                  <ToggleButton />{' '}
                </span>
              </span>{' '}
              <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
                {service?.requestAssignedTo}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaServiceRequestDetail;
