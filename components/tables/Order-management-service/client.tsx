'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Plus, Settings } from 'lucide-react';

import { columns } from './columns';
import { OrderManagementData } from 'app/static/services-management/OrderManagement';
import ToggleButton from '@/components/ui/toggleButton';
import ManageProductsModal from '@/components/modal/order-management/ManageProductsModal';
import PriceTimeSetting from '@/components/modal/PriceTimeSetting';
import AddMenuModal from '@/components/modal/order-management/AddMenuModal';

export const OrderManagementDataTable: React.FC = () => {
  const [data, setData] = useState(OrderManagementData || []);
  const [filteredData, setFilteredData] = useState(OrderManagementData || []);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState<boolean>();
  const [totalRecords, setTotalRecords] = useState(data.length || 0);

  // **********Search Filter and pagination logic************
  // const filters = [
  //     {
  //         label: 'Account Status',
  //         key: 'accountStatus', // Backend key
  //         subOptions: ['Active', 'Suspended'],
  //     },
  //     {
  //         label: 'Verification Status',
  //         key: 'verificationStatus',
  //         subOptions: ['Verified', 'Pending', 'Rejected'],
  //     },
  //     {
  //         label: 'Activity Status',
  //         key: 'activityStatus',
  //         subOptions: ['Active', 'Inactive'],
  //     },
  // ];

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(totalRecords / limit)) {
      setPageNo(newPage);
    }
  };
  const [isPriceTimeSettingModalOpen, setIsPriceTimeSettingModalOpen] =
    useState(false);
  const [isManageProductsModalOpen, setManageProductsModal] = useState(false);
  const [isAddMenuModalOpen, setIsAddMenuModalOpen] = useState(false);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPageNo(1); // Reset to the first page when the limit changes
  };

  // Function to handle search input
  const handleSearchChange = (searchValue: string) => {
    if (searchValue.trim() === '') {
      setFilteredData(data); // Reset if empty
    } else {
      const filtered = data.filter((item) =>
        item.guestDetails.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };
  return (
    <>
      <div className="w-full pt-20 flex flex-col items-end gap-2 justify-end px-4 py-2">
        <div className="flex w-full justify-between items-center">
          <h2 className="text-coffee text-xl font-bold">Order management</h2>
          <div className="flex items-center gap-2">
            <h2 className="text-[0.8rem] font-semibold">
              AUTO ACCEPT REQUESTS
            </h2>
            <ToggleButton />
          </div>
        </div>
        <div>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsAddMenuModalOpen(true)}
              className="bg-[#A07D3D] text-white hover:text-black hover:outline"
            >
              {' '}
              <Plus className="w-5 h-5 text-black" />
              Add Menu
            </Button>
            <Button
              onClick={() => setManageProductsModal(true)}
              className="bg-[#A07D3D] text-white hover:text-black hover:outline"
            >
              Manage Products
            </Button>
          </div>
        </div>
        <PriceTimeSetting
          isOpen={isPriceTimeSettingModalOpen}
          onClose={() => setIsPriceTimeSettingModalOpen(false)}
        />
        <ManageProductsModal
          isOpen={isManageProductsModalOpen}
          onClose={() => setManageProductsModal(false)}
        />
        <AddMenuModal
          isOpen={isAddMenuModalOpen}
          onClose={() => setIsAddMenuModalOpen(false)}
        />
      </div>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <DataTable
          searchKey="firstName"
          columns={columns}
          data={filteredData.slice((pageNo - 1) * limit, pageNo * limit)} // Use filteredData instead of data while api integration
          // onSearch={(searchValue) => {
          //     const filtered = data.filter((item) =>
          //         item.firstName.toLowerCase().includes(searchValue.toLowerCase())
          //     );
          //     setData(filtered);
          // }}
          // filters={filters}
          //   onFilterChange={handleFilterChange}
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
