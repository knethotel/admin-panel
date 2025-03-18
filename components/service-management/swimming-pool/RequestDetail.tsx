import { Button } from '@/components/ui/button';
import ToggleButton from '@/components/ui/toggleButton';
import React from 'react';

type Props<T> = {
  requestDetails: T[];
  requestId: string;
};

const SwimmingPoolRequestDetail = <T extends Record<string, any>>({
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
    <div className="mt-24 bg-[#FAF6EF] rounded-md shadow-custom px-6 py-8 flex font-medium flex-col gap-14 w-full">
      {/* Header */}
      <div className="flex gap-12 text-xs opacity-75">
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
          {/* Column one */}
          <div className="flex gap-4">
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
          {/* Column two */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 items-start text-xs">
              <span className="opacity-75">Request Assigned to</span>{' '}
              <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
                {request?.requestAssignedTo}
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
                {request?.effectiveCost}
              </span>
            </div>
          </div>

          {/* Column three */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 items-start text-xs">
              <span className="opacity-75">Requested Time Slot</span>{' '}
              <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
                {request?.requestedTimeSlot}
              </span>
            </div>
            <div className="flex flex-col gap-2 items-start text-xs">
              <span className="opacity-55 w-full flex justify-between">
                <p>Payment Mode</p>
                <span>
                  {' '}
                  <ToggleButton />{' '}
                </span>
              </span>{' '}
              <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
                {request?.paymentMode}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          {/* Column one */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 items-start text-xs">
              <span className="opacity-75">Rules and Regulations</span>{' '}
              <span className="bg-[#F6EEE0] py-2 rounded-md px-6">
                <p>
                  {' '}
                  <span className="font-semibold">Operating Hours: </span>{' '}
                  {request?.rulesAndRegulations?.operatingHours}
                </p>{' '}
                <br />
                <p>
                  {' '}
                  <span className="font-semibold">
                    Shower Before Entry:{' '}
                  </span>{' '}
                  {request?.rulesAndRegulations?.showerBeforeEntry}
                </p>
                <br />
                <p>
                  {' '}
                  <span className="font-semibold">Proper Swimwear: </span>{' '}
                  {request?.rulesAndRegulations?.properSwimwear}
                </p>{' '}
                <br />
                <p>
                  {' '}
                  <span className="font-semibold">No Running: </span>{' '}
                  {request?.rulesAndRegulations?.noRunning}
                </p>{' '}
                <br />
                <p>
                  {' '}
                  <span className="font-semibold">No Diving: </span>{' '}
                  {request?.rulesAndRegulations?.noDiving}
                </p>{' '}
                <br />
                <p>
                  {' '}
                  <span className="font-semibold">No Food & Drinks: </span>{' '}
                  {request?.rulesAndRegulations?.noFoodAndDrinks}
                </p>{' '}
                <br />
                <p>
                  {' '}
                  <span className="font-semibold">No Glass Items: </span>{' '}
                  {request?.rulesAndRegulations?.noGlassItems}
                </p>{' '}
                <br />
                <p>
                  {' '}
                  <span className="font-semibold">
                    Health Precautions:{' '}
                  </span>{' '}
                  {request?.rulesAndRegulations?.healthPrecautions}
                </p>{' '}
                <br />
                <p>
                  {' '}
                  <span className="font-semibold">Pool Capacity: </span>{' '}
                  {request?.rulesAndRegulations?.poolCapacity}
                </p>{' '}
                <br />
                <p>
                  {' '}
                  <span className="font-semibold">
                    Use Pool at Own Risk:{' '}
                  </span>{' '}
                  {request?.rulesAndRegulations?.usePoolAtOwnRisk}
                </p>{' '}
                <br />
                <p>
                  {' '}
                  <span className="font-semibold">Emergency Alert: </span>{' '}
                  {request?.rulesAndRegulations?.emergencyAlert}
                </p>{' '}
                <br />
              </span>
            </div>
          </div>
          {/* Column two */}
          <div className="flex justify-center items-start mt-6 ml-8">
            <div>
              <textarea
                className="w-full p-2 border rounded-md border-none placeholder:text-sm bg-[#F6EEE0] text-gray-700"
                placeholder="Type your message here"
                rows={4}
              />
              <div className="flex justify-end">
                <Button className="bg-[#A07D3D] h-8 text-white hover:outline hover:text-black">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwimmingPoolRequestDetail;
