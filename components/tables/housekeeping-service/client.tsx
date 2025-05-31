'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ToggleButton from '@/components/ui/toggleButton';
import ManageProductsModal from '@/components/modal/housekeeping/manage-products';
import PriceTimeSettingHouseKeeping from '@/components/modal/housekeeping/PriceTimeSetting';
import apiCall from '@/lib/axios';
import { columns } from './columns';
import { PaginationControls } from '@/components/shared/PaginationControls';
import { HousekeepingDataType } from 'app/static/services-management/Housekeeping';

export interface Guest {
  _id: string;
  firstName: string;
  lastName: string;
}

export interface HousekeepingRequest {
  _id: string;
  guest: Guest | null;
  status: string | null;
  requestDetail: string | null;
  HotelId: string | null;
  serviceType: string | null;
  requestType: string | null;
  items: any[];
  requestTime: string | null;
  __v?: number;
}

export const HousekeepingServiceTable: React.FC = () => {
  const router = useRouter();

  const [data, setData] = useState<HousekeepingDataType[]>([]);
  const [filteredData, setFilteredData] = useState<HousekeepingDataType[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalRecords, setTotalRecords] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isManageProductsModalOpen, setIsManageProductsModalOpen] =
    useState(false);

  // const capitalizeFirstLetter = (str: string) => {
  //   if (!str) return str;
  //   return str.charAt(0).toUpperCase() + str.slice(1);
  // };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiCall(
          'GET',
          'api/services/housekeeping/requests'
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
            assignedTo: item.assignedTo
              ? `${item.assignedTo.firstName} ${item.assignedTo.lastName}`
              : 'Unassigned',
            estimatedTime: item.estimatedTime || '',
            requestDetail: item.requestDetail || 'N/A',
            serviceType: item.serviceType || 'N/A',
            requestType: item.requestType || 'N/A',
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

  // const handleLimitChange = (newLimit: number) => {
  //   setLimit(newLimit);
  //   setPageNo(1);
  // };

  const handleSearchChange = (searchValue: string) => {
    if (searchValue.trim() === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.guestDetails.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filtered);
      setPageNo(1);
      setTotalRecords(filtered.length);
    }
  };

  return (
    <>
      <div className="w-full pt-20 flex gap-2 justify-end items-center px-4 py-2 bg-white">
        <div className="flex w-full justify-between items-center">
          <h2 className="text-coffee text-2xl font-bold">Housekeeping</h2>
          {/* <div className="flex items-center gap-2">
            <h2 className="text-[0.8rem] font-semibold">
              AUTO ACCEPT REQUESTS
            </h2>
            <ToggleButton />
          </div> */}
          <div className="w-full flex justify-end px-4">
            <Button
              onClick={() => setIsManageProductsModalOpen(true)}
              className="btn-primary h-8 2xl:h-9"
            >
              Manage Products
            </Button>
            <ManageProductsModal
              isOpen={isManageProductsModalOpen}
              onClose={() => setIsManageProductsModalOpen(false)}
            />
          </div>
        </div>
        {/* <Settings
          className="cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />
        <PriceTimeSettingHouseKeeping
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        /> */}
      </div>

      {loading ? (
        <span>Loading...</span>
      ) : error ? (
        <div className="text-red-500 p-4">{error}</div>
      ) : filteredData.length === 0 ? (
        <div className="p-4 text-center">No data available.</div>
      ) : (
        <DataTable
          searchKey="guestDetails.name"
          columns={columns}
          data={filteredData.slice((pageNo - 1) * limit, pageNo * limit)}
          onSearch={handleSearchChange}
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
