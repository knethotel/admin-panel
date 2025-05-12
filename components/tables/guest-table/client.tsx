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

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(totalRecords / limit)) {
      setPageNo(newPage);
    }
  };

  //   Onclick event handler functions
  const handleOnClick = (actionName: string) => {
    if (actionName === 'add booking') {
      setMode('add_guest');
      router.push(`/hotel-panel/guest-management/add`);
    }
    if (actionName === 'view requests') {
      setMode('add_booking');
      router.push(`/hotel-panel/guest-management/pending`);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Guests at Hotel`} />
        <div className="flex gap-3">
          <Button
            className="btn-primary text-xs 2xl:text-sm md:text-sm"
            onClick={() => handleOnClick('add booking')}
          >
            <Plus className="mr-2 h-4 w-4" /> <span>Add Booking</span>
          </Button>
          <Button
            className="btn-primary text-xs 2xl:text-sm md:text-sm"
            onClick={() => handleOnClick('view requests')}
          >
            <span className="text-white group-hover:text-black">
              {' '}
              View Requests
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
