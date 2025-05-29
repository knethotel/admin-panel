'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Settings, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import ToggleButton from '@/components/ui/toggleButton';
import PriceTimeSetting from '@/components/modal/PriceTimeSetting';
import { PaginationControls } from '@/components/shared/PaginationControls';
import apiCall from '@/lib/axios';

export const ReceptionServiceTable: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isAssignModal, setIsAssignModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [employeeName, setEmployeeName] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');

  // Fetch data from API on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiCall('GET', 'api/services/reception/requests');
        if (response.success && Array.isArray(response.data)) {
          // Map API data to table format
          const mapped = response.data.map((item: any) => ({
            requestID: item._id || 'N/A',
            requestTime: {
              date: item.requestTime ? new Date(item.requestTime).toLocaleDateString() : 'N/A',
              time: item.requestTime ? new Date(item.requestTime).toLocaleTimeString() : 'N/A',
            },
            guestDetails: {
              name: item.guest ? `${item.guest.firstName || ''} ${item.guest.lastName || ''}`.trim() : 'N/A',
              guestID: item.guest?._id || 'N/A',
              roomNo: item.roomNo || 'N/A',
            },
            status: item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : 'N/A',
            assignedTo: item.assignedTo || 'N/A',
            estimatedTime: item.estimatedTime || '',
            requestDetail: item.requestDetail || 'N/A',
            serviceType: item.serviceType || 'N/A',
            requestType: item.requestType || 'N/A',
            wakeUpTime: item.wakeUpTime || '',
            HotelId: item.HotelId || '',
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

  const handleUpdate = () => {
    if (selectedRow) {
      const updatedData = {
        ...selectedRow,
        assignedTo: employeeName,
        estimatedTime: estimatedTime
      };

      // Update row data
      const updatedRows = data.map((row) =>
        row.requestID === selectedRow.requestID ? updatedData : row
      );

      setData(updatedRows);
      setIsAssignModal(false);
    }
  };

  return (
    <>
      <div className="w-full pt-20 flex gap-2 justify-end items-center px-4 py-2">
        <div className="flex w-full justify-between items-center">
          <h2 className="text-coffee text-2xl font-bold">Reception</h2>
          <div className="flex items-center gap-2">
            <h2 className="text-[0.8rem] font-semibold">
              AUTO ACCEPT REQUESTS
            </h2>
            <ToggleButton />
          </div>
        </div>
        {/* <Settings
          className="cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        /> */}
        {/* <PriceTimeSetting
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        /> */}
      </div>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <DataTable
          searchKey="firstName"
          columns={columns()}
          data={filteredData.slice((pageNo - 1) * limit, pageNo * limit)}
        />
      )}
      <PaginationControls
        pageNo={pageNo}
        totalRecords={totalRecords}
        limit={limit}
        filteredCount={filteredData.length}
        onPageChange={handlePageChange}
      />
    </>
  );
};
