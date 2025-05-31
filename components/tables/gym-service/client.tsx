'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Settings } from 'lucide-react';

import { useRouter } from 'next/navigation';
import { columns } from './columns';

import ToggleButton from '@/components/ui/toggleButton';
import PriceTimeSetting from '@/components/modal/PriceTimeSetting';
import ManageProductsModal from '@/components/modal/gym/manage-products';
import PriceTimeSettingGym from '@/components/modal/gym/PriceTimeSetting';
import { PaginationControls } from '@/components/shared/PaginationControls';
import apiCall from '@/lib/axios';
import { GymServiceDataType } from 'app/static/services-management/Gym';
export const GymServiceTable: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<GymServiceDataType[]>([]);
  const [filteredData, setFilteredData] = useState<GymServiceDataType[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState<boolean>();
  const [totalRecords, setTotalRecords] = useState(data.length || 0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await apiCall('GET', 'api/services/facility/requests');
      // Format the data according to the API response structure
      const formattedData = (response?.data || []).map((item: any) => ({
        requestID: item._id || 'N/A',
        requestDetail: item.requestDetail || 'N/A',
        responseDetail: 'N/A',
        requestAssignedTo: 'N/A',
        requestTime: {
          date: new Date(item.requestTime).toLocaleDateString() || 'N/A',
          time: new Date(item.requestTime).toLocaleTimeString() || 'N/A'
        },
        guestDetails: {
          guestID: item.guest?._id || 'N/A',
          name: `${item.guest?.firstName || ''} ${item.guest?.lastName || ''}`,
          roomNo: 'N/A',
          mobileNumber: 'N/A',
          email: 'N/A'
        },
        requestType: item.facilityType || 'N/A',
        status:
          item.status?.charAt(0).toUpperCase() + item.status?.slice(1) || 'N/A',
        assignedTo: item.assignedTo
          ? `${item.assignedTo.firstName} ${item.assignedTo.lastName}`
          : 'Unassigned'
      }));
      setData(formattedData);
      setFilteredData(formattedData);
      setTotalRecords(response?.data?.total || 0);
      console.log(formattedData);
    } catch (error) {
      console.error('Failed to fetch facility requests:', error);
      setData([]);
      setFilteredData([]);
      setTotalRecords(0);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(totalRecords / limit)) {
      setPageNo(newPage);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isManageProductsModalOpen, setIsManageProductsModalOpen] =
    useState(false);

  return (
    <>
      <div className="w-full pt-20 flex items-center gap-2 justify-end px-4 py-2 bg-white">
        <div className="flex w-full justify-between items-center">
          <h2 className="text-coffee text-xl font-bold">
            Gym/Conference hall/Community hall
          </h2>
          <Button
            onClick={() =>
              router.push('/hotel-panel/service-management/gym/add')
            }
            className="btn-primary h-8 2xl:h-9"
          >
            Manage Products
          </Button>
          {/* <div className="flex items-center gap-2">
            <h2 className="text-[0.8rem] font-semibold">
              AUTO ACCEPT REQUESTS
            </h2>
            <ToggleButton />
          </div> */}
        </div>
        {/* <Settings
          className="cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />
        <PriceTimeSettingGym
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        /> */}
      </div>
      <div className="w-full flex justify-end px-4">
        {/* <ManageProductsModal
          isOpen={isManageProductsModalOpen}
          onClose={() => setIsManageProductsModalOpen(false)}
        /> */}
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
        pageNo={pageNo}
        totalRecords={totalRecords}
        limit={limit}
        filteredCount={filteredData.length}
        onPageChange={handlePageChange}
      />
    </>
  );
};
