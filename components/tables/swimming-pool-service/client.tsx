'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import ManageProductsModal from '@/components/modal/swimmingpool/manage-products';
import { PaginationControls } from '@/components/shared/PaginationControls';
import { SwimmingpoolServiceDataType } from 'app/static/services-management/SwimmingPool';
import apiCall from '@/lib/axios';

export const SwimmingpoolServiceDataTable: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<SwimmingpoolServiceDataType[]>([]);
  const [filteredData, setFilteredData] = useState<
    SwimmingpoolServiceDataType[]
  >([]);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState<boolean>();
  const [totalRecords, setTotalRecords] = useState(data.length || 0);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(totalRecords / limit)) {
      setPageNo(newPage);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isManageProductsModalOpen, setIsManageProductsModalOpen] =
    useState(false);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPageNo(1); // Reset to the first page when the limit changes
  };

  // Function to handle search input
  const handleSearchChange = (searchValue: string) => {
    if (searchValue.trim() === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.guestDetails.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    const fetchSwimmingPoolRequests = async () => {
      try {
        setLoading(true);
        const res = await apiCall<any>(
          'GET',
          'api/services/swimming-pool/requests'
        );

        const transformedData: SwimmingpoolServiceDataType[] = res.data.map(
          (item: any) => ({
            requestID: item._id,
            requestDetail: item.requestDetail,
            requestTime: `${item.startTime} - ${item.endTime}`,
            bookingDate: item.bookingDate,
            guestDetails: {
              guestID: item.guest._id,
              name: `${item.guest.firstName} ${item.guest.lastName}`
            },
            requestType: 'Swimming Pool',
            assignedTo: item.assignedTo
              ? `${item.assignedTo.firstName} ${item.assignedTo.lastName}`
              : 'Unassigned',
            status: (item.status || 'Pending').replace(/^\w/, (c: any) =>
              c.toUpperCase()
            ) as SwimmingpoolServiceDataType['status']
          })
        );

        setData(transformedData);
        setFilteredData(transformedData);
        setTotalRecords(transformedData.length);
      } catch (err: any) {
        console.error('Failed to fetch swimming pool requests:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSwimmingPoolRequests();
  }, []);

  return (
    <>
      <div className="w-full pt-20 flex items-center gap-2 justify-end px-4 py-2 bg-white">
        <div className="flex w-full justify-between items-center">
          <h2 className="text-coffee text-xl font-bold">Swimming Pool</h2>
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
          {/* <div className="flex items-center gap-2">
            <h2 className="text-[0.8rem] font-semibold">
              AUTO ACCEPT REQUESTS
            </h2>
            <ToggleButton />
          </div> */}
        </div>
        {/* <Settings className='cursor-pointer' onClick={() => setIsModalOpen(true)} />
        <PriceTimeSetting
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
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
