'use client';
import React, { useEffect, useState } from 'react';
import apiCall from '@/lib/axios';
import AssignModal from '@/components/shared/AssignModal';
import ToggleButton from '@/components/ui/toggleButton';

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
  assignedTo?: string;
  effectiveCost?: string | number;
  startTime?: string;
  endTime?: string;
  requestedTimeSlot?: string;
  requestedDay?: string;
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Guest Name</p>
          <p className="font-medium">
            {apiData?.guest
              ? `${apiData.guest.firstName} ${apiData.guest.lastName || ''}`.trim()
              : 'N/A'}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Mobile Number</p>
          <p className="font-medium">{apiData?.guest?.mobileNumber || 'N/A'}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Email</p>
          <p className="font-medium break-all">
            {apiData?.guest?.email || 'N/A'}
          </p>
        </div>
      </div>

      {apiData?.requestedTimeSlot && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-1">Time Slot</p>
          <p className="font-medium">{apiData?.requestedTimeSlot || 'N/A'}</p>
        </div>
      )}

      {/* Request Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Request & Response */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500 mb-2">Request Detail</p>
            <p className="bg-[#FAF6EF] p-3 rounded-md text-gray-800">
              {apiData?.requestDetail || 'No details provided'}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500 mb-2">Response Detail</p>
            <p className="bg-[#FAF6EF] p-3 rounded-md text-gray-800">
              {apiData?.responseDetail || 'No response yet'}
            </p>
          </div>
        </div>

        {/* Assignment & Actions */}
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Request Type</p>
            <p className="font-medium">
              {mode === 'gym' && apiData?.facilityType
                ? apiData.facilityType
                : apiData?.requestType || 'N/A'}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500 mb-2">Assigned To</p>
            <div
              className="bg-[#FAF6EF] p-3 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() =>
                (mode === 'reception' ||
                  mode === 'housekeeping' ||
                  mode === 'inroomcontrol' ||
                  mode === 'gym' ||
                  mode === 'swimmingpool') &&
                setIsAssignModalOpen(true)
              }
            >
              <p className="font-medium">
                {apiData?.assignedTo || 'Not assigned'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {(mode === 'gym' || mode === 'swimmingpool') && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Additional Information */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500 mb-1">
              {mode === 'swimmingpool' ? 'Time Slot' : 'Request Time'}
            </p>
            <p className="font-medium">
              {mode === 'swimmingpool' && apiData?.startTime && apiData?.endTime
                ? `${apiData.startTime} - ${apiData.endTime}`
                : apiData?.requestTime
                  ? formatDateTime(apiData.requestTime)
                  : 'N/A'}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Request Day</p>
            <p className="font-medium">{apiData?.requestedDay || 'N/A'}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-500">Effective Cost</p>
            </div>
            <div className="bg-[#FAF6EF] p-3 rounded-md mt-2">
              <p className="font-medium">
                {apiData?.effectiveCost || 'No cost specified'}
              </p>
            </div>
          </div>
        </div>
      )}

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
