'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { RoleDetailsDataType } from 'app/static/company-panel/RolesAndPermissions';
import apiCall from '@/lib/axios';

// Define interfaces and API function inline
interface Permission {
  module: string;
  access: string[];
  _id: string;
}

interface Role {
  _id: string;
  name: string;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface GetRolesResponse {
  status: boolean;
  roles: Role[];
}

const getAllRoles = async (): Promise<GetRolesResponse> => {
  return await apiCall<GetRolesResponse>(
    'GET',
    'api/superAdmin/role/get-all-roles'
  );
};

export const RolesAndPermissionHome: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<RoleDetailsDataType[]>([]);
  const [filteredData, setFilteredData] = useState<RoleDetailsDataType[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalRecords, setTotalRecords] = useState(0);

  // Fetch roles from API on component mount
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoading(true);
        const response = await getAllRoles();
        if (response.status) {
          // Transform API response to RoleDetailsDataType
          const transformedData: RoleDetailsDataType[] = response.roles.map(
            (role) => ({
              _id: role._id,
              role: role.name,
              permissions: role.permissions.length, // Count of permissions
              taggedUsers: 0 // Placeholder; update if you have user data
            })
          );
          setData(transformedData);
          setFilteredData(transformedData);
          setTotalRecords(transformedData.length);
        } else {
          console.error('API returned unsuccessful status');
        }
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(totalRecords / limit)) {
      setPageNo(newPage);
    }
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPageNo(1); // Reset to first page when limit changes
  };

  return (
    <>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <div>
          <DataTable
            searchKey="role" // Changed from "firstName" to match RoleDetailsDataType
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
