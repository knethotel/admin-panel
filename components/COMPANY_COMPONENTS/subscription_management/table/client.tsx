'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';

import { columns } from './columns';

import { subscriptionData } from 'app/static/company-panel/SubscriptionManagement';
import { Heading } from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const SubscriptionManagementHomePage: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState(subscriptionData || []);
  const [filteredData, setFilteredData] = useState(subscriptionData || []);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState<boolean>();
  const [totalRecords, setTotalRecords] = useState(data.length || 0);

  // const filters = [
  //     {
  //         label: 'Account Status',
  //         key: 'accountStatus', // Backend key
  //         subOptions: ['Active', 'Suspended'],
  //     },
  //     {
  //         label: 'Verification Status',
  //         key: 'verificationStatus',
  //         subOptions: ['Verified', 'Pending', 'Rejected'],
  //     },
  //     {
  //         label: 'Activity Status',
  //         key: 'activityStatus',
  //         subOptions: ['Active', 'Inactive'],
  //     },
  // ];

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(totalRecords / limit)) {
      setPageNo(newPage);
    }
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPageNo(1); // Reset to the first page when the limit changes
  };

  // Function to handle search input
  const handleSearchChange = (searchValue: string) => {
    if (searchValue.trim() === '') {
      setFilteredData(data); // Reset if empty
    } else {
      const filtered = data.filter((item) =>
        item.planDetails.planName
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handleOnClick = () => {
    router.push('/super-admin/subscription-management/add');
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Subscription(s) (${totalRecords})`} />
        <Button
          className="btn-primary text-xs 2xl:text-sm md:text-sm"
          onClick={() => handleOnClick()}
        >
          <Plus className="mr-2 h-4 w-4" />
          <span className="text-white">Create Subscription</span>
        </Button>
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
      <div className="flex justify-end space-x-2 px-3 py-2">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pageNo - 1)}
            disabled={pageNo === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {pageNo} of {Math.ceil(totalRecords / limit)}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pageNo + 1)}
            disabled={pageNo >= Math.ceil(totalRecords / limit)}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};
