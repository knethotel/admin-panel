
'use client';

import { useEffect, useState } from 'react';
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
  const [isManageProductsModalOpen, setIsManageProductsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiCall('GET', 'api/services/housekeeping/requests');
        if (response.success && Array.isArray(response.data)) {

          const mapped = response.data.map((item: any) => ({
            requestID: item._id || 'N/A',
            uniqueId: item.uniqueId || 'N/A',

            requestTime: {
              date: item.requestTime ? new Date(item.requestTime).toLocaleDateString() : 'N/A',
              time: item.requestTime ? new Date(item.requestTime).toLocaleTimeString() : 'N/A'
            },

            createdAt: {
              date: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A',
              time: item.createdAt ? new Date(item.createdAt).toLocaleTimeString() : 'N/A'
            },

            updatedAt: {
              date: item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : 'N/A',
              time: item.updatedAt ? new Date(item.updatedAt).toLocaleTimeString() : 'N/A'
            },

            guestDetails: {
              name: `${item.guest?.firstName || ''} ${item.guest?.lastName || ''}`.trim(),
              guestID: item.guest?._id || 'N/A',
              phoneNumber: item.guest?.phoneNumber || 'N/A',
              roomNo: item.guest?.assignedRoomNumber || 'N/A',
            },

            status: item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : 'N/A',
            assignedTo: `${item.assignedTo?.firstName || ''} ${item.assignedTo?.lastName || ''}` || 'N/A',
            estimatedTime: item.estimatedDeliveryTime || '',
            requestDetail: item.requestDetail || 'N/A',
            requestType: item.requestType || 'N/A',
            paymentStatus: item.paymentStatus || 'N/A',

            amount: {
              subtotal: item.amount?.subtotal || 0,
              discount: item.amount?.discount || 0,
              finalAmount: item.amount?.finalAmount || 0,
            },

            coupon: {
              code: item.coupon?.code || 'N/A',
              type: item.coupon?.type || 'N/A',
              value: item.coupon?.value || 0,
            },

            items: item.items?.map((itm: any) => ({
              item: itm.item,
              quantity: itm.quantity,
              _id: itm._id
            })) || [],
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

  // Function to handle search input
  const handleSearchChange = (searchValue: string) => {
    console.log('Data before search:', data);
    if (searchValue.trim() === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.guestDetails.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      console.log('Filtered Data:', filtered);
      setFilteredData(filtered);
    }
  };

  return (
    <>
      <div className="w-full pt-20 flex items-center gap-2 justify-end px-4 py-2 bg-white">
        <div className="flex w-full justify-between items-center">
          <h2 className="text-coffee text-2xl font-bold">Housekeeping</h2>
          <div className="flex items-center gap-2">
            <h2 className="text-[0.8rem] font-semibold">
              AUTO ACCEPT REQUESTS
            </h2>
            {/* <ToggleButton /> */}
          </div>
        </div>
        <Settings className="cursor-pointer" onClick={() => setIsModalOpen(true)} />
        <PriceTimeSettingHouseKeeping isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>

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
        totalRecords={totalRecords}
        pageNo={pageNo}
        limit={limit}
        onPageChange={handlePageChange}
        filteredCount={filteredData.length}
      />
    </>
  );
};
