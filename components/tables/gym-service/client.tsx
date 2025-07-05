
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import ToggleButton from '@/components/ui/toggleButton';
import { PaginationControls } from '@/components/shared/PaginationControls';
import apiCall from '@/lib/axios';
import { GymServiceDataType } from 'app/static/services-management/Gym';
import { columns } from './columns';

export const GymServiceTable: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<GymServiceDataType[]>([]);
  const [filteredData, setFilteredData] = useState<GymServiceDataType[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiCall('GET', 'api/services/facility/requests');
        if (response.success && Array.isArray(response.data)) {

          const mapped = response.data.map((item: any) => ({
            serviceID: item.uniqueId || 'N/A',
            requestID: item._id || 'N/A',

            requestTime: {
              date: item.requestTime ? new Date(item.requestTime).toLocaleDateString() : 'N/A',
              time: item.requestTime ? new Date(item.requestTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A',
            },

            guestDetails: {
              name: `${item.guest?.firstName || ''} ${item.guest?.lastName || ''}`.trim(),
              guestID: item.guest?._id || 'N/A',
              roomNo: item.guest?.assignedRoomNumber || item.slot?.roomNo || 'N/A',
              phoneNumber: item.guest?.phoneNumber || 'N/A',
            },

            status: item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : 'N/A',

            assignedTo: item.assignedTo
              ? `${item.assignedTo.firstName || ''} ${item.assignedTo.lastName || ''}`.trim()
              : 'N/A',

            estimatedTime: item.slot?.startTime || 'N/A',
            wakeUpTime: item.slot?.endTime || 'N/A',

            requestDetail: item.requestDetail || 'N/A',
            requestType: item.requestType || 'N/A',
            facilityType: item.facilityType || 'N/A',
            facility: item.facility || 'N/A',

            HotelId: item.HotelId || 'N/A',

            paymentStatus: item.paymentStatus || 'N/A',
            paymentDate: item.paymentDate
              ? new Date(item.paymentDate).toLocaleString()
              : 'N/A',

            transaction: item.transaction || 'N/A',

            createdAt: item.createdAt
              ? new Date(item.createdAt).toLocaleString()
              : 'N/A',

            updatedAt: item.updatedAt
              ? new Date(item.updatedAt).toLocaleString()
              : 'N/A',

            slot: {
              dayOfWeek: item.slot?.dayOfWeek || 'N/A',
              startTime: item.slot?.startTime || 'N/A',
              endTime: item.slot?.endTime || 'N/A',
              price: item.slot?.price || 0,
              maxCapacity: item.slot?.maxCapacity || 0,
              currentCapacity: item.slot?.currentCapacity || 0,
            },
          }));


          setData(mapped);
          setFilteredData(mapped);
          setTotalRecords(mapped.length);
        } else {
          setData([]);
          setFilteredData([]);
          setTotalRecords(0);
        }
      } catch (error) {
        console.error(error);
        setData([]);
        setFilteredData([]);
        setTotalRecords(0);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(filteredData.length / limit)) {
      setPageNo(newPage);
    }
  };

  return (
    <>
      <div className="w-full pt-20 px-4 py-2 bg-white flex justify-between items-center">
        <h2 className="text-xl font-bold text-coffee">GYM / COMMUNITY / CONFERENCE HALL</h2>
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold">AUTO ACCEPT REQUESTS</h2>
          {/* <ToggleButton /> */}
        </div>
      </div>

      <div className="w-full flex justify-end px-4 py-2">
        <Button
          className="btn-primary h-8"
          onClick={() => router.push('/hotel-panel/service-management/gym/add')}
        >
          Manage Products
        </Button>
      </div>

      {loading ? (
        <p className="text-center py-10">Loading...</p>
      ) : (
        <>
          <DataTable
            columns={columns}
            data={filteredData.slice((pageNo - 1) * limit, pageNo * limit)}
            searchKey="guest.firstName"
          />
          <PaginationControls
            pageNo={pageNo}
            totalRecords={filteredData.length}
            limit={limit}
            filteredCount={filteredData.length}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};
