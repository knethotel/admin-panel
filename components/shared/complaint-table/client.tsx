'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { PaginationControls } from '../PaginationControls';
import type { ComplaintDataType } from 'app/static/ComplaintData';
import { apiCall } from '@/lib/axios';

export const ComplaintTable: React.FC = () => {
  // const router = useRouter();
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

  const handleSearchChange = (searchValue: string) => {
    if (searchValue.trim() === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.complaintType.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true);
        const res = await apiCall<{ complaints: any[] }>(
          'GET',
          'api/complaint/platform/complaints'
        );

        const mappedData = res.complaints.map((item): ComplaintDataType => {
          const createdDate = new Date(item.createdAt);
          return {
            complaintID: item._id,
            complaintType: item.complaintType,
            hotelId: item.HotelId?.name || 'N/A',
            status: (
              item.status || 'OPEN'
            ).toUpperCase(),
            assignedTo: item.assignedTo
              ? `${item.assignedTo.firstName} ${item.assignedTo.lastName}`
              : 'Unassigned',
            complaintTime: {
              date: createdDate.toLocaleDateString('en-IN'),
              time: createdDate.toLocaleTimeString('en-IN')
            }
          };
        });

        setData(mappedData);
        setFilteredData(mappedData);
        setTotalRecords(mappedData.length);
      } catch (error: any) {
        console.error('Failed to fetch complaints:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // Table generation specifically for ComplaintData
  const tableContent = (
    <DataTable
      searchKey="complaintType"
      columns={columns}
      data={filteredData.slice((pageNo - 1) * limit, pageNo * limit)} // Using the exact ComplaintData from your latest share
    />
  );

  return (
    <>
      <div className="py-6 flex flex-col w-full">
        {loading ? <span>Loading...</span> : tableContent}
        <PaginationControls
          pageNo={pageNo}
          totalRecords={totalRecords}
          limit={limit}
          filteredCount={filteredData.length}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};
