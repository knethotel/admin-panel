'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { useRouter } from 'next/navigation';
import { columns } from './columns';

// Sample data based on the image provided
const transactionsData = [
  {
    paymentID: 'RD17823450',
    dateTime: '10-02-2025 11:00AM',
    guestDetail: { guestName: 'MR. TIMOTHY CHALAMATE', guestID: '01953268' },
    serviceDetails: { serviceID: 'SDB73567', serviceName: 'Housekeeping' },
    paymentTransaction: { amount: 'INR 2341', method: 'via cash' },
    discountCoupon: 'NEW250',
    statusDetails: { status: 'COMPLETED', processedAt: '10-02-2025 11:05AM' },
  },
  {
    paymentID: 'RD17823451',
    dateTime: '10-02-2025 11:30AM',
    guestDetail: { guestName: 'MR. JAMES SMITH', guestID: '01953269' },
    serviceDetails: { serviceID: 'SDB73568', serviceName: 'Housekeeping' },
    paymentTransaction: { amount: 'INR 2341', method: 'Online' },
    discountCoupon: 'None',
    statusDetails: { status: 'IN-PROGRESS', processedAt: '10-02-2025 11:35AM' },
  },
  {
    paymentID: 'RD17823452',
    dateTime: '10-02-2025 12:00PM',
    guestDetail: { guestName: 'MR. JOHN DOE', guestID: '01953270' },
    serviceDetails: { serviceID: 'SDB73569', serviceName: 'Room Service' },
    paymentTransaction: { amount: 'INR 1500', method: 'via cash' },
    discountCoupon: 'WELCOME50',
    statusDetails: { status: 'REJECTED', processedAt: '10-02-2025 12:05PM' },
  },
];

export const Transactions: React.FC = () => {
  const [data, setData] = useState(transactionsData);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState(data.length);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(totalRecords / limit)) {
      setPageNo(newPage);
    }
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPageNo(1); // Reset to the first page when the limit changes
  };

  return (
    <>
      <div className="flex items-start justify-start">
        <div className="w-full flex justify-between items-center px-4">
          <Heading title="Transactions" />
        </div>
      </div>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <DataTable
          searchKey="guestName"
          columns={columns}
          data={data}
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
