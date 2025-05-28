'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Settings } from 'lucide-react';

import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { InRoomControlData } from 'app/static/services-management/InRoomControl';
import ToggleButton from '@/components/ui/toggleButton';
import PriceTimeSettingInRoomControlModal from '@/components/modal/in-room-control/PriceTimeSetting';
import apiCall from '@/lib/axios';
import { PaginationControls } from '@/components/shared/PaginationControls';

export const InRoomControlDataTable: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState(InRoomControlData || []);
  const [filteredData, setFilteredData] = useState(InRoomControlData || []);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState<boolean>();
  const [totalRecords, setTotalRecords] = useState(data.length || 0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiCall(
          'GET',
          'api/services/inroomcontrol/requests/'
        );
        if (response.success && Array.isArray(response.data)) {
          // Map API data to table format
          const mapped = response.data.map((item: any) => ({
            requestID: item._id || 'N/A',
            requestTime: {
              date: item.requestTime
                ? new Date(item.requestTime).toLocaleDateString()
                : 'N/A',
              time: item.requestTime
                ? new Date(item.requestTime).toLocaleTimeString()
                : 'N/A'
            },
            guestDetails: {
              name: item.guest
                ? `${item.guest.firstName || ''} ${item.guest.lastName || ''}`.trim()
                : 'N/A',
              guestID: item.guest?._id || 'N/A',
              roomNo: item.roomNo || 'N/A'
            },
            status: item.status
              ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
              : 'N/A',
            assignedTo: item.assignedTo || 'N/A',
            estimatedTime: item.estimatedTime || '',
            requestDetail: item.requestDetail || 'N/A',
            requestType: item.serviceType || 'N/A',
            wakeUpTime: item.wakeUpTime || '',
            HotelId: item.HotelId || ''
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
    if (newPage > 0 && newPage <= Math.ceil(totalRecords / limit)) {
      setPageNo(newPage);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle search input
  const handleSearchChange = (searchValue: string) => {
    if (searchValue.trim() === '') {
      setFilteredData(data); // Reset if empty
    } else {
      const filtered = data.filter((item) =>
        item.guestDetails.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };
  return (
    <>
      <div className="w-full pt-20 flex items-center gap-2 justify-end px-4 py-2 bg-white">
        <div className="flex w-full justify-between items-center">
          <h2 className="text-coffee text-xl font-bold">In-room Control</h2>
          <div className="flex items-center gap-2">
            <h2 className="text-[0.8rem] font-semibold">
              AUTO ACCEPT REQUESTS
            </h2>
            <ToggleButton />
          </div>
        </div>
        <Settings
          className="cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />
        <PriceTimeSettingInRoomControlModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>

      {loading ? (
        <span>Loading...</span>
      ) : (
        <DataTable
          searchKey="firstName"
          columns={columns}
          data={filteredData.slice((pageNo - 1) * limit, pageNo * limit)} // Use filteredData instead of data while api integration
          // onSearch={(searchValue) => {
          //     const filtered = data.filter((item) =>
          //         item.firstName.toLowerCase().includes(searchValue.toLowerCase())
          //     );
          //     setData(filtered);
          // }}
          // filters={filters}
          //   onFilterChange={handleFilterChange}
        />
      )}

      <PaginationControls
        totalRecords={totalRecords}
        pageNo={pageNo}
        limit={limit}
        onPageChange={handlePageChange}
        filteredCount={filteredData.length}
      />
    </>
  );
};
