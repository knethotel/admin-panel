'use client';

import { useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useColumns, AdminDataType } from './columns';
import { getAllAdmins } from '@/lib/superAdmin/api/admin/getAdmins';

export const AdminTable: React.FC = () => {
  const router = useRouter();
  const columns = useColumns(); // Use hook directly at top level
  const [data, setData] = useState<AdminDataType[]>([]);
  const [filteredData, setFilteredData] = useState<AdminDataType[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedData = await getAllAdmins();
        setData(fetchedData);
        setFilteredData(fetchedData);
        setTotalRecords(fetchedData.length);
      } catch (error) {
        console.error('Error fetching admins:', error);
        setData([]);
        setFilteredData([]);
        setTotalRecords(0);
      } finally {
        setLoading(false);
      }
    };
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

  const handleSearchChange = (searchValue: string) => {
    setPageNo(1);
    if (searchValue.trim() === '') {
      setFilteredData(data);
      setTotalRecords(data.length);
    } else {
      const filtered = data.filter((item) =>
        `${item.firstName} ${item.lastName}`
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFilteredData(filtered);
      setTotalRecords(filtered.length);
    }
  };

  const handleOnClick = (actionName: string) => {
    if (actionName === 'add_admin') {
      router.push(`admin-management/add`);
    }
  };

  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-between">
          <Heading title="Admins (Loading...)" />
          <Button
            className="text-xs 2xl:text-sm md:text-sm btn-primary"
            onClick={() => handleOnClick('add_admin')}
            disabled
          >
            <Plus className="mr-2 h-4 w-4" />
            <span className="text-white group-hover:text-black">Add Admin</span>
          </Button>
        </div>
        <span>Loading...</span>
      </div>
    );
  }

  const paginatedData = filteredData.slice(
    (pageNo - 1) * limit,
    pageNo * limit
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Admins (${totalRecords})`} />
        <Button
          className="text-xs 2xl:text-sm md:text-sm btn-primary"
          onClick={() => handleOnClick('add_admin')}
        >
          <Plus className="mr-2 h-4 w-4" />
          <span className="text-white group-hover:text-black">Add Admin</span>
        </Button>
      </div>
      {paginatedData.length === 0 ? (
        <div className="text-center py-4">No admins found.</div>
      ) : (
        <DataTable
          searchKey="firstName"
          columns={columns}
          data={paginatedData}
          onSearch={handleSearchChange}
        />
      )}
      {totalRecords > 0 && (
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
      )}
    </>
  );
};
