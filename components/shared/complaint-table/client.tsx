'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { Pagination, type PaginationData } from '../Pagination';
import type { ComplaintDataType } from 'app/static/ComplaintData';
import { apiCall } from '@/lib/axios';

interface ApiResponse {
  complaints: any[];
  pagination: PaginationData;
}

export const ComplaintTable: React.FC = () => {
  // const router = useRouter();
  const [data, setData] = useState<ComplaintDataType[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPageNo(newPage);
    }
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPageNo(1); // Reset to the first page when the limit changes
  };

  const handleSearchChange = async (searchValue: string) => {
    // Reset to first page when searching
    setPageNo(1);
    await fetchComplaints(1, limit, searchValue);
  };

  const fetchComplaints = async (page: number, pageLimit: number, search = '') => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: pageLimit.toString(),
        ...(search && { search })
      });

      const res = await apiCall<ApiResponse>(
        'GET',
        `api/complaint/platform/complaints?${queryParams}`
      );

      const mappedData = res.complaints.map((item): ComplaintDataType => {
        const createdDate = new Date(item.createdAt);
        return {
          complaintID: item._id,
          complaintType: item.complaintType,
          hotelId: item.raisedByAdmin?._id || 'N/A',
          status: (item.status || 'OPEN').toUpperCase(),
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
      setPagination({
        total: res.pagination.total,
        page: res.pagination.page,
        limit: res.pagination.limit,
        totalPages: res.pagination.totalPages,
        hasNextPage: res.pagination.hasNextPage,
        hasPrevPage: res.pagination.hasPrevPage,
      });
    } catch (error: any) {
      console.error('Failed to fetch complaints:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints(pageNo, limit);
  }, [pageNo, limit]);

  return (
    <div className="py-6 flex flex-col w-full">
      {data.length === 0 && !loading ? (
        <div className="text-center py-4">No complaints found.</div>
      ) : (
        <>
          <DataTable
            searchKey="complaintType"
            columns={columns}
            data={data}
            onSearch={handleSearchChange}
            currentPage={pagination.page}
            itemsPerPage={pagination.limit}
            // loading={loading}
          />
          <Pagination 
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            totalItems={pagination.total}
            itemsPerPage={pagination.limit}
            onPageChangeAction={handlePageChange}
            onItemsPerPageChangeAction={handleLimitChange}
          />
        </>
      )}
    </div>
  );
};
