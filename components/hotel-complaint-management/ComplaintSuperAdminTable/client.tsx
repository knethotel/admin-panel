'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { ComplaintDataType } from 'app/static/ComplaintData';
import apiCall from '@/lib/axios';

export const ComplaintSuperAdminTable: React.FC = () => {
  const [data, setData] = useState<ComplaintDataType[]>([]);
  const [filteredData, setFilteredData] = useState<ComplaintDataType[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await apiCall<any>('GET', 'api/complaint/hotel/my-complaints');
      const complaints = response?.complaints || [];

      const formattedData: ComplaintDataType[] = complaints.map((item: any) => ({
        complaintID: item._id,
        complaintType: item.complaintType,
        status: item.status.toUpperCase(),
        complaintTime: {
          date: new Date(item.createdAt).toLocaleDateString(),
          time: new Date(item.createdAt).toLocaleTimeString()
        },
        hotelId: item.HotelId || 'N/A',
        assignedTo: item.assignedTo
          ? `${item.assignedTo.firstName} ${item.assignedTo.lastName}`
          : 'Unassigned',
        employeeID: item.assignedTo?._id,
        guestId: item.raisedByAdmin?._id,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        description: item.description,
        feedback: item.feedback || '',
      }));

      setData(formattedData);
      setFilteredData(formattedData);
      setTotalRecords(response.pagination?.total || complaints.length);
    } catch (err) {
      console.error('Failed to fetch complaints:', err);
      setData([]);
      setFilteredData([]);
      setTotalRecords(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(totalRecords / limit)) {
      setPageNo(newPage);
    }
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPageNo(1);
  };

  const tableContent = (
    <DataTable
      searchKey="complaintType"
      columns={columns}
      data={filteredData.slice((pageNo - 1) * limit, pageNo * limit)}
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