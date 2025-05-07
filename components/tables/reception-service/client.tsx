'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Settings, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../ui/select';

import {
  ReceptionData,
  ReceptionDataType
} from 'app/static/services-management/Reception';
import ToggleButton from '@/components/ui/toggleButton';
import PriceTimeSetting from '@/components/modal/PriceTimeSetting';

export const ReceptionServiceTable: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState(ReceptionData || []);
  const [filteredData, setFilteredData] = useState(ReceptionData || []);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState<boolean>();
  const [totalRecords, setTotalRecords] = useState(data.length || 0);
  const [isAssignModal, setIsAssignModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ReceptionDataType | null>(
    null
  );
  const [employeeName, setEmployeeName] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(totalRecords / limit)) {
      setPageNo(newPage);
    }
  };

  const handleAssignClick = (rowData: ReceptionDataType) => {
    setSelectedRow(rowData);
    setEmployeeName(rowData.assignedTo || '');
    setEstimatedTime(rowData.estimatedTime || '');
    setIsAssignModal(true);
  };

  const handleUpdate = () => {
    if (selectedRow) {
      const updatedData = {
        ...selectedRow,
        assignedTo: employeeName,
        estimatedTime: estimatedTime
      };

      // Update row data
      const updatedRows = data.map((row) =>
        row.requestID === selectedRow.requestID ? updatedData : row
      );

      setData(updatedRows);
      setIsAssignModal(false);
    }
  };

  const columnsWithAssignClick = columns(handleAssignClick);

  return (
    <>
      <div className="w-full pt-20 flex gap-2 justify-end items-center px-4 py-2">
        <div className="flex w-full justify-between items-center">
          <h2 className="text-coffee text-2xl font-bold">Reception</h2>
          <div className="flex items-center gap-2">
            <h2 className="text-[0.8rem] font-semibold">
              AUTO ACCEPT REQUESTS
            </h2>
            <ToggleButton />
          </div>
        </div>
        <Settings
          className="cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />
        <PriceTimeSetting
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <DataTable
          searchKey="firstName"
          columns={columnsWithAssignClick}
          data={filteredData.slice((pageNo - 1) * limit, pageNo * limit)}
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

      {isAssignModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-xl">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center text-gray-700">
                <h3 className="text-lg font-semibold">Assign Employee</h3>
                <X onClick={() => setIsAssignModal(false)} className="" />
              </div>
                <div className='flex items-center gap-6 w-full'>
                <label 
                  htmlFor="employeeName" 
                  className='text-sm text-gray-900 whitespace-nowrap'
                >
                  Employee name
                </label>
                <Select
                  onValueChange={(value) => setEmployeeName(value)}
                  value={employeeName}
                >
                  <SelectTrigger className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none">
                  <SelectValue placeholder="Select Employee" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 opacity-50"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                  </SelectTrigger>
                  <SelectContent className="bg-[#362913] rounded-2xl text-white border-2 shadow-md border-white">
                  {['Employee 1', 'Employee 2', 'Employee 3'].map((value) => (
                    <SelectItem key={value} value={value}>
                    {value}
                    </SelectItem>
                  ))}
                  </SelectContent>
                </Select>
                </div>

              <div className='flex items-center gap-6 w-full'>
                <label 
                  htmlFor="estimatedTime" 
                  className='text-sm text-gray-900 whitespace-nowrap'
                >
                  Estimated time
                </label>
                <input
                  id="estimatedTime"
                  type="time"
                  value={estimatedTime}
                  onChange={(e) => setEstimatedTime(e.target.value)}
                  className="p-2 rounded-md border bg-[#F6EEE0] text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-[#A07D3D]"
                  aria-label="Estimated time"
                />
              </div>

              <button
                onClick={handleUpdate}
                className="mt-4 bg-[#A07D3D] text-white p-2 rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
