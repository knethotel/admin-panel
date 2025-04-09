'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { RoleDetailsDataType } from 'app/static/company-panel/RolesAndPermissions';

import { AppDispatch, RootState } from '../../../../app/redux/store';
import { fetchRoles } from '../../../../app/redux/slices/roleSlice';

const RolesAndPermissionHome: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { roles, loading } = useSelector((state: RootState) => state.roles);

  const [data, setData] = useState<RoleDetailsDataType[]>([]);
  const [filteredData, setFilteredData] = useState<RoleDetailsDataType[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  // Fetch data using Redux
  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  // Transform roles from Redux for the table
  useEffect(() => {
    if (roles.length > 0) {
      const transformed: RoleDetailsDataType[] = roles.map((role) => ({
        _id: role._id,
        role: role.name,
        permissions: role.permissions.length,
        taggedUsers: 0 // Placeholder
      }));
      setData(transformed);
      setFilteredData(transformed);
      setTotalRecords(transformed.length);
    }
  }, [roles]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(totalRecords / limit)) {
      setPageNo(newPage);
    }
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPageNo(1);
  };

  const handleOnClick = () => {
    router.push('/super-admin/roles-and-permissions/add');
  };

  return (
    <>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <div>
          <div className="w-full flex justify-end">
            <Button
              className="text-xs md:text-sm btn-primary"
              onClick={handleOnClick}
            >
              <Plus className="mr-2 h-4 w-4" />
              <span className="text-white group-hover:text-black">
                Add Role
              </span>
            </Button>
          </div>

          <DataTable
            searchKey="role"
            columns={columns}
            data={filteredData.slice((pageNo - 1) * limit, pageNo * limit)}
          />

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
        </div>
      )}
    </>
  );
};

export default RolesAndPermissionHome;
