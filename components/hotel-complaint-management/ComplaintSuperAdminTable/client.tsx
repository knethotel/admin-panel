'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { ComplaintDataType } from 'app/static/ComplaintData';

export const ComplaintSuperAdminTable: React.FC = () => {
  const [data, setData] = useState<ComplaintDataType[]>([]);
  const [filteredData, setFilteredData] = useState<ComplaintDataType[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState<boolean>();
  const [totalRecords, setTotalRecords] = useState(data.length || 0);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(totalRecords / limit)) {
      setPageNo(newPage);
    }
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPageNo(1); // Reset to the first page when the limit changes
  };

  const tableContent = (
    <DataTable
      searchKey="complaintType"
      columns={columns}
      data={filteredData.slice((pageNo - 1) * limit, pageNo * limit)} // Using the exact ComplaintData from your latest share
    />
  );

  return (
    <>
      <div className="flex flex-col w-full">
        {loading ? <span>Loading...</span> : tableContent}
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
              Page {pageNo} of {Math.ceil(totalRecords / limit) || 1}
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
      </div>
    </>
  );
};
