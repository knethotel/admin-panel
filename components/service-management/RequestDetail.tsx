'use client';
import React, { useEffect, useState } from 'react';
import apiCall from '@/lib/axios';
import AssignModal from '@/components/shared/AssignModal';
import ToggleButton from '@/components/ui/toggleButton';
import { Button } from '../ui/button';
import router from 'next/router';

type Props<T> = {
  requestId: string;
  mode?:
    | 'reception'
    | 'other'
    | 'housekeeping'
    | 'inroomcontrol'
    | 'gym'
    | 'swimmingpool';
};

interface RequestData {
  _id: string;
  guest: {
    _id: string;
    firstName: string;
    lastName: string;
    mobileNumber?: string;
    email?: string;
  };
  requestDetail: string;
  responseDetail?: string;
  requestAssignedTo?: string;
  estimatedDeliveryTime?: string;
  issueType: string;
  requestType: string;
  facilityType?: string;
  facility?: {
    _id: string;
    facilityType: string;
    name: string;
  };
  requestTime?: string;
  effectiveCost?: string | number;
  startTime?: string;
  endTime?: string;
  requestedTimeSlot?: string;
  requestedDay?: string;
  assignedTo?: {
    firstName: string;
    lastName: string;
  };
  [key: string]: any; // Add index signature to allow additional properties
}

const RequestDetail = <T extends Record<string, any>>({
  requestId,
  mode = 'other'
}: Props<T>) => {
  const [apiData, setApiData] = useState<RequestData | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [showEffectiveCost, setShowEffectiveCost] = useState(false);
  const [effectiveCostInput, setEffectiveCostInput] = useState('');

  // Helper to format date/time for display
  const formatDateTime = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'N/A';
    return date.toLocaleString();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (mode === 'reception' && requestId) {
        setLoading(true);
        try {
          const result = await apiCall(
            'GET',
            `api/services/reception/requests/${requestId}`
          );
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
          const result = await apiCall(
            'GET',
            `api/services/housekeeping/requests/${requestId}`
          );
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
          const result = await apiCall(
            'GET',
            `api/services/inroomcontrol/requests/${requestId}`
          );
          if (result.success) {
            setApiData(result.data);
          }
        } catch (error) {
          console.error(
            'Error fetching in-room control request details:',
            error
          );
        } finally {
          setLoading(false);
        }
      } else if (mode === 'gym' && requestId) {
        setLoading(true);
        try {
          const result = await apiCall(
            'GET',
            `api/services/facility/requests/${requestId}`
          );
          if (result.success) {
            setApiData(result.data);
          }
        } catch (error) {
          console.error('Error fetching gym request details:', error);
        } finally {
          setLoading(false);
        }
      } else if (mode === 'swimmingpool' && requestId) {
        setLoading(true);
        try {
          const result = await apiCall(
            'GET',
            `api/services/swimming-pool/requests/${requestId}`
          );
          if (result.success) {
            setApiData(result.data);
          }
        } catch (error) {
          console.error('Error fetching swimming pool request details:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [mode, requestId]);

  // const handleAssign = async (employeeId: string) => {
  //   try {
  //     const result = await apiCall('GET', `api/employees/${employeeId}`);
  //     if (result.success) {
  //       setApiData((prev: RequestData | null) => prev ? {
  //         ...prev,
  //         requestAssignedTo: result.data.name
  //       } : null);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching employee details:', error);
  //   }
  // };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  }

  return (
    <div className="bg-[#FAF6EF] rounded-md shadow-custom p-6 w-full">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-10 mb-8 text-sm text-gray-600">
        <div className="">
          <span className="font-medium">Guest ID: </span>
          <span className="text-gray-800">{apiData?.guest?._id || 'N/A'}</span>
        </div>
        <div className="">
          <span className="font-medium">Request ID: </span>
          <span className="text-gray-800">{apiData?._id || 'N/A'}</span>
        </div>
      </div>

      {/* Guest Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-500 text-nowrap">Guest Name</p>
          <p className="font-medium bg-[#F6EEE0] px-3 py-2 rounded-md w-full">
            {apiData?.guest
              ? `${apiData.guest.firstName} ${apiData.guest.lastName || ''}`.trim()
              : 'N/A'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-500 text-nowrap">Mobile Number</p>
          <p className="font-medium bg-[#F6EEE0] px-3 py-2 rounded-md w-full">
            {apiData?.guest?.mobileNumber || 'N/A'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium bg-[#F6EEE0] px-3 py-2 rounded-md break-all w-full">
            {apiData?.guest?.email || 'N/A'}
          </p>
        </div>
      </div>

      {apiData?.requestedTimeSlot && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">Time Slot</p>
          <p className="font-medium bg-[#F6EEE0] px-3 py-2 rounded-md">
            {apiData?.requestedTimeSlot || 'N/A'}
          </p>
        </div>
      )}

      {/* Request Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
        <div className="flex flex-col items-start gap-4">
          <p className="text-sm text-gray-500">Request Detail</p>
          <textarea
            readOnly
            value={apiData?.requestDetail || 'No details provided'}
            className="w-full h-24 p-3 font-medium bg-[#F6EEE0] rounded-md resize-none overflow-y-auto"
          />
        </div>
        {/* Assignment & Actions */}
        <div className="flex flex-col items-start gap-4">
          <p className="text-sm text-gray-500">Assigned To</p>
          <div
            className="font-medium bg-[#F6EEE0] px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors w-full"
            onClick={() =>
              (mode === 'reception' ||
                mode === 'housekeeping' ||
                mode === 'inroomcontrol' ||
                mode === 'gym' ||
                mode === 'swimmingpool') &&
              setIsAssignModalOpen(true)
            }
          >
            <p className="font-medium w-full">
              {apiData?.assignedTo
                ? `${apiData.assignedTo.firstName} ${apiData.assignedTo.lastName}`
                : 'Unassigned'}
            </p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex flex-col items-start gap-4">
            <p className="text-sm text-gray-500">Request Type</p>
            <p className="font-medium bg-[#F6EEE0] px-3 py-2 rounded-md w-full">
              {mode === 'gym' && apiData?.facilityType
                ? apiData.facilityType
                : apiData?.requestType || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="flex flex-col items-start gap-4 ">
          <p className="text-sm text-gray-500">Response Detail</p>
          <textarea
            readOnly
            value={apiData?.responseDetail || 'No response yet'}
            className="w-full h-24 p-3 font-medium bg-[#F6EEE0] rounded-md resize-none overflow-y-auto"
          />
        </div>
        {(mode === 'gym' || mode === 'swimmingpool') && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 col-span-3">
            {/* Additional Information */}
            <div className="flex flex-col items-start gap-4">
              <p className="text-sm text-gray-500">
                {mode === 'swimmingpool' ? 'Time Slot' : 'Request Time'}
              </p>
              <p className="font-medium bg-[#F6EEE0] px-3 py-2 rounded-md w-full">
                {mode === 'swimmingpool' &&
                apiData?.startTime &&
                apiData?.endTime
                  ? `${apiData.startTime} - ${apiData.endTime}`
                  : apiData?.requestTime
                    ? formatDateTime(apiData.requestTime)
                    : 'N/A'}
              </p>
            </div>

            <div className="flex flex-col items-start gap-4">
              <p className="text-sm text-gray-500">Request Day</p>
              <p className="font-medium bg-[#F6EEE0] px-3 py-2 rounded-md w-full">
                {apiData?.requestedDay || 'N/A'}
              </p>
            </div>

            <div className="flex flex-col items-start gap-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Effective Cost</p>
              </div>
              <div className="font-medium bg-[#F6EEE0] px-3 py-2 rounded-md w-full">
                <p className="font-medium">
                  {apiData?.effectiveCost || 'No cost specified'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* create button of close */}
      {/* <Button
        variant="outline"
        onClick={() => router.back()}
        className="mt-4"
      >
        Close
      </Button> */}

      {/* Assign Modal - Only render when modal is open */}
      {isAssignModalOpen && (
        <AssignModal
          onClose={() => setIsAssignModalOpen(false)}
          requestId={requestId}
          onAssign={(employeeId: string) => {
            // Handle assignment logic here
            setIsAssignModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default RequestDetail;
