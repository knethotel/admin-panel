'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { getAllAdmins } from '@/lib/superAdmin/api/admin/getAdmins';

// Define the admin data type based on your structure
interface Admin {
  _id: string;
  isSuperAdmin: boolean;
  roleId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  IsOtpVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

type ModeType = 'add_admin';

export const AdminTable: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<Admin[]>([]);
  const [filteredData, setFilteredData] = useState<Admin[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [mode, setMode] = useState<ModeType>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedData = await getAllAdmins();
        console.log(fetchedData);

        setData(fetchedData);
        setFilteredData(fetchedData);
        setTotalRecords(fetchedData.length);
      } catch (error) {
        console.error('Error fetching data:', error);
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
      const filtered = data.filter((item: Admin) =>
        // Search across both firstName and lastName
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
      setMode('add_admin');
      router.push(`admin-management/add`);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Admins (${totalRecords})`} />
        <Button
          className="text-xs md:text-sm btn-primary"
          onClick={() => handleOnClick('add_admin')}
        >
          <Plus className="mr-2 h-4 w-4" />
          <span className="text-white group-hover:text-black">Add Admin</span>
        </Button>
      </div>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <DataTable
          searchKey="firstName"
          columns={columns}
          data={filteredData.slice((pageNo - 1) * limit, pageNo * limit)}
          onSearch={handleSearchChange}
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
    </>
  );
};
