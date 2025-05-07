'use client';
import { Button } from '@/components/ui/button';
import ToggleButton from '@/components/ui/toggleButton';
import React, { useState } from 'react';

type GuestDetails = {
  guestID: string;
  name: string;
  mobileNumber: string;
  email: string;
};

type RulesAndRegulations = {
  operatingHours: string;
  showerBeforeEntry: string;
  properSwimwear: string;
  noRunning: string;
  noDiving: string;
  noFoodAndDrinks: string;
  noGlassItems: string;
  healthPrecautions: string;
  poolCapacity: string;
  usePoolAtOwnRisk: string;
  emergencyAlert: string;
};

type SwimmingPoolRequest = {
  requestID: string;
  guestDetails: GuestDetails;
  requestDetail: string;
  responseDetail: string;
  requestAssignedTo: string;
  effectiveCost: string;
  paymentMode: string;
  requestedTimeSlot: string;
  rulesAndRegulations: RulesAndRegulations;
};

type Props = {
  requestDetails: SwimmingPoolRequest[];
  requestId: string;
};

const SwimmingPoolRequestDetail = ({ requestDetails, requestId }: Props) => {
  const [showEffectiveCost, setShowEffectiveCost] = useState(false);
  const [showPaymentMode, setShowPaymentMode] = useState(false);

  const request = requestDetails.find((r) => r.requestID === requestId);

  return (
    <div className="mt-24 bg-[#FAF6EF] rounded-md shadow-custom px-6 py-8 flex font-medium flex-col gap-8 w-full mb-4">
      {/* Header */}
      <div className="flex gap-12 text-sm opacity-75">
        <p>Guest ID: {request?.guestDetails.guestID}</p>
        <p>Request ID: {request?.requestID}</p>
      </div>

      {/* Details */}
      <div className="space-y-8">
        {/* Upper Part */}
        <div className="flex gap-8 2xl:gap-10">
          <Detail
            label="Guest name"
            value={request?.guestDetails.name.toUpperCase()}
          />
          <Detail
            label="Mobile number"
            value={request?.guestDetails.mobileNumber}
          />
          <Detail label="Email" value={request?.guestDetails.email} />
        </div>

        {/* Lower Part */}
        <div className="flex gap-8 2xl:gap-10">
          {/* Column one */}
          <div className="flex flex-col gap-8 2xl:gap-10">
            <TextBlock
              label="Request Detail"
              value={`"${request?.requestDetail}"`}
            />
            <TextBlock
              label="Response Detail"
              value={`"${request?.responseDetail}"`}
            />
          </div>

          {/* Column two */}
          <div className="flex flex-col gap-8 2xl:gap-10">
            <TextBlock
              label="Request Assigned to"
              value={request?.requestAssignedTo}
            />
            <div className="flex flex-col gap-2 items-start text-sm">
              <span className="w-full flex gap-4">
                <p>Effective cost</p>
                <div onClick={() => setShowEffectiveCost((prev) => !prev)}>
                  <ToggleButton />
                </div>
              </span>
              {showEffectiveCost && (
                <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
                  {request?.effectiveCost}
                </span>
              )}
            </div>
          </div>

          {/* Column three */}
          <div className="flex flex-col gap-8 2xl:gap-10">
            <TextBlock
              label="Requested Time Slot"
              value={request?.requestedTimeSlot}
            />
            <div className="flex flex-col gap-2 items-start text-sm">
              <span className="w-full flex gap-4">
                <p>Payment Mode</p>
                <div onClick={() => setShowPaymentMode((prev) => !prev)}>
                  <ToggleButton />
                </div>
              </span>
              {showPaymentMode && (
                <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
                  {request?.paymentMode}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Rules and Message */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 items-start text-sm">
              <span className="opacity-75">Rules and Regulations</span>
              <div className="bg-[#F6EEE0] py-2 rounded-md px-6">
                {request?.rulesAndRegulations &&
                  Object.entries(request.rulesAndRegulations).map(
                    ([key, value]) => (
                      <p key={key} className="my-4">
                        <span className="font-semibold capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}:
                        </span>{' '}
                        {value}
                      </p>
                    )
                  )}
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="flex justify-center items-start mt-6 ml-8">
            <div>
              <textarea
                className="w-full p-2 border rounded-md border-none placeholder:text-sm bg-[#F6EEE0] text-gray-700"
                placeholder="Type your message here"
                rows={10}
                cols={50}
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

// Reusable components
const Detail = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex gap-2 items-center text-sm">
    <span className="opacity-75">{label}</span>
    <span className="bg-[#F6EEE0] rounded-md px-6 py-1">{value}</span>
  </div>
);

const TextBlock = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex flex-col gap-2 items-start text-sm">
    <span className="opacity-75">{label}</span>
    <span className="bg-[#F6EEE0] w-full rounded-md px-6 py-2">{value}</span>
  </div>
);

export default SwimmingPoolRequestDetail;
