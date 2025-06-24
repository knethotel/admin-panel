'use client';
import React, { useEffect, useState } from 'react';
import apiCall from '@/lib/axios';
import AssignModal from '@/components/shared/AssignModal';

type Props<T> = {
  requestId: string;
  mode?: 'reception' | 'other' | 'housekeeping' | 'inroomcontrol' | 'gym' | 'inroomdining';
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
  requestType: string;
  assignedTo?: string;
}

const RequestDetail = <T extends Record<string, any>>({
  requestId,
  mode = 'other'
}: Props<T>) => {
  const [apiData, setApiData] = useState<RequestData | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (mode === 'reception' && requestId) {
        setLoading(true);
        try {
          const result = await apiCall('GET', `api/services/reception/requests/${requestId}`);
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
          const result = await apiCall('GET', `api/services/housekeeping/requests/${requestId}`);
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
          const result = await apiCall('GET', `api/services/inroomcontrol/requests/${requestId}`);
          if (result.success) {
            setApiData(result.data);
          }
        } catch (error) {
          console.error('Error fetching in-room control request details:', error);
        } finally {
          setLoading(false);
        }
      } else if (mode === 'gym' && requestId) {
        setLoading(true);
        try {
          const result = await apiCall('GET', `api/services/facility/requests/${requestId}`);
          if (result.success) {
            setApiData(result.data);
          }
        } catch (error) {
          console.error('Error fetching gym request details:', error);
        } finally {
          setLoading(false);
        }
      } else if (mode === 'inroomdining' && requestId) {
        setLoading(true);
        try {
          const result = await apiCall('GET', `api/services/inroomdining/bookings/${requestId}`);
          console.log('API Response:', result);
          if (result.success) {
            setApiData(result.data);
          }
        } catch (error) {
          console.error('Error fetching gym request details:', error);
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
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <>
      <div className="bg-[#FAF6EF] rounded-md shadow-custom px-8 pb-10 pt-6 flex font-medium flex-col gap-16 w-full">
        {/* Header */}
        <div className="flex gap-16 text-sm opacity-55">
          <p>Guest ID: {apiData?.guest?._id || 'N/A'}</p>
          <p>Request ID: {apiData?._id || 'N/A'}</p>
        </div>

        {/* Details */}
        <div className="space-y-8">
          {/* Upper Part (3-column layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex gap-2 items-center text-sm">
              <span className="opacity-75">Guest name</span>{' '}
              <span className="bg-[#F6EEE0] rounded-md px-6 py-1">
                {apiData?.guest ? `${apiData.guest.firstName} ${apiData.guest.lastName}`.toUpperCase() : 'N/A'}
              </span>
            </div>
            <div className="flex gap-2 items-center text-sm">
              <span className="opacity-75">Mobile number</span>{' '}
              <span className="bg-[#F6EEE0] rounded-md px-6 py-1">
                {apiData?.guest?.mobileNumber || 'N/A'}
              </span>
            </div>
            <div className="flex gap-2 items-center text-sm">
              <span className="opacity-75">Email</span>{' '}
              <span className="bg-[#F6EEE0] rounded-md px-6 py-1">
                {apiData?.guest?.email || 'N/A'}
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
                  "{apiData?.requestDetail || 'N/A'}"
                </span>
              </div>
              <div className="flex flex-col gap-2 items-start text-sm">
                <span className="opacity-75">Response Detail</span>{' '}
                <span className="bg-[#F6EEE0] w-full max-w-96 py-2 rounded-md px-6">
                  "{apiData?.responseDetail || 'N/A'}"
                </span>
              </div>
            </div>

            {/* Right part */}
            <div className="space-y-8">
              <div className="flex flex-col gap-2 items-start text-sm">
                <span className="opacity-75">Request Assigned to</span>{' '}
                <div
                  className="bg-[#F6EEE0] rounded-md px-10 py-1 cursor-pointer hover:bg-[#F0E6D6] transition-colors"
                  onClick={() => (mode === 'reception' || mode === 'housekeeping' || mode === 'inroomcontrol' || mode === 'inroomdining') && setIsAssignModalOpen(true)}
                >
                  {'N/A'}
                </div>
              </div>
              <div className="flex flex-col gap-2 items-start text-sm">
                <span className="opacity-75">Estimated delivery time</span>{' '}
                <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
                  {apiData?.estimatedDeliveryTime || 'N/A'}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-start text-sm">
              <span className="opacity-75">Request Type</span>{' '}
              <span className="bg-[#F6EEE0] rounded-md px-10 py-1">
                {apiData?.requestType || 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <AssignModal
        onClose={() => setIsAssignModalOpen(false)}
        // onAssign={handleAssign}
        requestId={isAssignModalOpen ? requestId : undefined}
        title="Assign Request to Employee"
      />
    </>
  );
};

export default RequestDetail;
