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
    <div className="bg-[#FAF6EF] rounded-md shadow-custom px-6 pb-12 pt-8 flex font-medium flex-col gap-20 w-full">
      {/* Header */}
      <div className="flex gap-x-14 text-sm opacity-55">
        <p>Guest ID: {service?.guestDetails?.guestID}</p>
        <p>Service ID: {service?.serviceID}</p>
        <p>Service Duration: {service?.duration}</p>
      </div>

      {/* Details */}
      <div className="space-y-12">
        {/* Upper Part */}
        <div className="flex gap-x-8 flex-wrap">
          <div className="flex gap-x-3 items-center text-sm">
            <span className="opacity-55">Guest name</span>{' '}
            <span className="bg-[#F6EEE0] rounded-md px-6 py-1 max-w-96 w-fit">
              {service?.guestDetails?.name?.toUpperCase()}
            </span>
          </div>
          <div className="flex gap-x-3 items-center text-sm">
            <span className="opacity-55">Mobile number</span>{' '}
            <span className="bg-[#F6EEE0] rounded-md px-6 py-1 max-w-96 w-fit">
              {service?.guestDetails?.mobileNumber}
            </span>
          </div>
          <div className="flex gap-x-3 items-center text-sm">
            <span className="opacity-55">Email</span>{' '}
            <span className="bg-[#F6EEE0] rounded-md px-6 py-1 max-w-96 w-fit">
              {service?.guestDetails?.email}
            </span>
          </div>
        </div>

        {/* Lower Part */}
        <div className="flex gap-x-12">
          {/* Left part */}
          <div className="space-y-8 max-w-96">
            <div className="flex flex-col items-start gap-y-3 text-sm">
              <span className="opacity-55">Request Detail</span>{' '}
              <span className="bg-[#F6EEE0] rounded-md px-6 py-2 max-w-96 w-fit">
                "{service?.requestDetail}"
              </span>
            </div>
            <div className="flex flex-col gap-y-3 items-start text-sm">
              <span className="opacity-55">Response Detail</span>{' '}
              <span className="bg-[#F6EEE0] py-2 rounded-md px-6 max-w-96 w-fit">
                "{service?.responseDetail}"
              </span>
            </div>
            <div className="flex flex-col gap-y-3 items-start text-sm">
              <span className="opacity-55">Service Category</span>{' '}
              <span className="bg-[#F6EEE0] py-2 rounded-md px-6 max-w-96 w-fit">
                {service?.serviceCategory}
              </span>
            </div>
            <div className="flex flex-col gap-y-3 items-start text-sm">
              <span className="opacity-55">Special Request</span>{' '}
              <span className="bg-[#F6EEE0] py-2 rounded-md px-6 max-w-96 w-fit">
                None
              </span>
            </div>

            {/* This will be a form item */}
            <div className="flex flex-col gap-y-3 items-start text-sm">
              <span className="opacity-55">Additional service</span>{' '}
              <span className="bg-[#F6EEE0] py-2 rounded-md px-6 max-w-96 w-fit">
                None
              </span>
            </div>
          </div>

          {/* Right part */}
          <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-3 items-start text-sm">
              <span className="opacity-55">Request Assigned to</span>{' '}
              <span className="bg-[#F6EEE0] rounded-md px-10 py-1 max-w-96 w-fit">
                {service?.requestAssignedTo}
              </span>
            </div>
            <div className="flex flex-col gap-y-3 items-start text-sm w-full">
              <span className="opacity-55 w-full flex justify-between">
                <p>Effective cost</p>
                <span>
                  <ToggleButton />
                </span>
              </span>{' '}
              <span className="bg-[#F6EEE0] rounded-md px-10 py-1 max-w-96 w-fit">
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
