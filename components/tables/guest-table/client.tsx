'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';

import { GuestData } from 'app/static/GuestData';

type ModeType = 'add_guest' | 'add_booking';

export const GuestClient: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState(GuestData || []);
  const [filteredData, setFilteredData] = useState(GuestData || []);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState<boolean>();
  const [totalRecords, setTotalRecords] = useState(data.length || 0);
  const [mode, setMode] = useState<ModeType>();

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
        item.guestDetails.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  //   Onclick event handler functions
  const handleOnClick = (actionName: string) => {
    if (actionName === 'add guest') {
      setMode('add_guest');
      router.push(`/guest-management/add`);
    }
    if (actionName === 'add booking') {
      setMode('add_booking');
      router.push(`/guest-management/add-booking`);
    }
  };
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title={`Guests (${totalRecords})`} />
        <div className="flex gap-3">
          <Button
            className="text-xs md:text-sm bg-button-light group hover:outline"
            onClick={() => handleOnClick('add guest')}
          >
            <Plus className="mr-2 h-4 w-4" />{' '}
            <span className="text-white group-hover:text-black">Add Guest</span>
          </Button>
          <Button
            className="text-xs md:text-sm bg-button-light group hover:outline"
            onClick={() => handleOnClick('add booking')}
          >
            <Plus className="mr-2 h-4 w-4" />{' '}
            <span className="text-white group-hover:text-black">
              {' '}
              Add Booking
            </span>
          </Button>
        </div>
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
      <div className="flex justify-end space-x-2 py-2">
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
