'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';

import { EmployeeDataType } from 'app/static/EmployeeManagement';
import apiCall from '@/lib/axios';

type ModeType = 'add_employee';

export const EmployeeTable: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<EmployeeDataType[]>([]);
  const [filteredData, setFilteredData] = useState<EmployeeDataType[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalRecords, setTotalRecords] = useState(data.length || 0);
  const [mode, setMode] = useState<ModeType>();

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiCall<{
          status: boolean;
          employees: any[];
        }>('GET', 'api/employee/');

        if (response.status && Array.isArray(response.employees)) {
          // Map API data to EmployeeDataType
          const mappedEmployees: EmployeeDataType[] = response.employees.map(
            (emp) => ({
              employeeID: emp._id,
              employeeDetails: {
                name: emp.firstName + ' ' + emp.lastName,
                roomNo: '', // No roomNo in API, set blank or handle separately
                mobileNo: emp.mobileNumber || '',
                emailID: emp.email || emp.emailID || ''
              },
              role: emp.roleId?.name || 'N/A',
              status:
                emp.status && emp.status.toUpperCase() === 'ACTIVE'
                  ? 'ACTIVE'
                  : 'INACTIVE'
            })
          );
          setData(mappedEmployees);
          setFilteredData(mappedEmployees);
          setTotalRecords(mappedEmployees.length);
        } else {
          setError('Invalid response from server');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch employees');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
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
    } else {
      const filtered = data.filter((item) =>
        item.employeeDetails.name
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handleOnClick = (actionName: string) => {
    if (actionName === 'add employee') {
      setMode('add_employee');
      router.push(`/hotel-panel/employee-management/add`);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Employees (${totalRecords})`} />
        <Button
          className="btn-primary text-xs 2xl:text-sm md:text-sm"
          onClick={() => handleOnClick('add employee')}
        >
          <Plus className="mr-2 h-4 w-4" />
          <span className="text-white">Add Employee</span>
        </Button>
      </div>
      {loading ? (
        <span>Loading...</span>
      ) : error ? (
        <span className="text-red-500">{error}</span>
      ) : (
        <DataTable
          searchKey="firstName"
          columns={columns}
          data={filteredData.slice((pageNo - 1) * limit, pageNo * limit)}
          // onSearch={(searchValue) => {
          //     const filtered = data.filter((item) =>
          //         item.firstName.toLowerCase().includes(searchValue.toLowerCase())
          //     );
          //     setData(filtered);
          // }}
          // filters={filters}
          // onFilterChange={handleFilterChange}
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
