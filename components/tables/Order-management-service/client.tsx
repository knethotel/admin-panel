// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { DataTable } from '@/components/ui/data-table';
// import { Plus, Settings } from 'lucide-react';

// import { columns } from './columns';
// import { OrderManagementData } from 'app/static/services-management/OrderManagement';
// import ToggleButton from '@/components/ui/toggleButton';
// import ManageProductsModal from '@/components/modal/order-management/ManageProductsModal';
// import PriceTimeSetting from '@/components/modal/PriceTimeSetting';
// import AddMenuModal from '@/components/modal/order-management/AddMenuModal';

// export const OrderManagementDataTable: React.FC = () => {
//   const [data, setData] = useState(OrderManagementData || []);
//   const [filteredData, setFilteredData] = useState(OrderManagementData || []);
//   const [pageNo, setPageNo] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [loading, setLoading] = useState<boolean>();
//   const [totalRecords, setTotalRecords] = useState(data.length || 0);

//   // **********Search Filter and pagination logic************
//   // const filters = [
//   //     {
//   //         label: 'Account Status',
//   //         key: 'accountStatus', // Backend key
//   //         subOptions: ['Active', 'Suspended'],
//   //     },
//   //     {
//   //         label: 'Verification Status',
//   //         key: 'verificationStatus',
//   //         subOptions: ['Verified', 'Pending', 'Rejected'],
//   //     },
//   //     {
//   //         label: 'Activity Status',
//   //         key: 'activityStatus',
//   //         subOptions: ['Active', 'Inactive'],
//   //     },
//   // ];

//   const handlePageChange = (newPage: number) => {
//     if (newPage > 0 && newPage <= Math.ceil(totalRecords / limit)) {
//       setPageNo(newPage);
//     }
//   };
//   const [isPriceTimeSettingModalOpen, setIsPriceTimeSettingModalOpen] =
//     useState(false);
//   const [isManageProductsModalOpen, setManageProductsModal] = useState(false);
//   const [isAddMenuModalOpen, setIsAddMenuModalOpen] = useState(false);

//   const handleLimitChange = (newLimit: number) => {
//     setLimit(newLimit);
//     setPageNo(1); // Reset to the first page when the limit changes
//   };

//   // Function to handle search input
//   const handleSearchChange = (searchValue: string) => {
//     if (searchValue.trim() === '') {
//       setFilteredData(data); // Reset if empty
//     } else {
//       const filtered = data.filter((item) =>
//         item.guestDetails.name.toLowerCase().includes(searchValue.toLowerCase())
//       );
//       setFilteredData(filtered);
//     }
//   };
//   return (
//     <>
//       <div className="w-full pt-20 flex flex-col items-end gap-2 justify-end px-4 py-2">
//         <div className="flex w-full justify-between items-center py-3">
//           <h2 className="text-coffee text-xl font-bold">Order management</h2>
//           <div className="flex items-center gap-3">
//             <h2 className="text-[0.8rem] xl:text-sm font-semibold">
//               AUTO ACCEPT REQUESTS
//             </h2>
//             <ToggleButton />
//           </div>
//         </div>
//         <div>
//           <div className="flex gap-2">
//             <Button
//               onClick={() => setIsAddMenuModalOpen(true)}
//               className="btn-primary gap-1"
//             >
//               {' '}
//               <Plus className="w-5 h-5" />
//               <span>Add Menu</span>
//             </Button>
//             <Button
//               onClick={() => setManageProductsModal(true)}
//               className="btn-primary"
//             >
//               Manage Products
//             </Button>
//           </div>
//         </div>
//         <PriceTimeSetting
//           isOpen={isPriceTimeSettingModalOpen}
//           onClose={() => setIsPriceTimeSettingModalOpen(false)}
//         />
//         <ManageProductsModal
//           isOpen={isManageProductsModalOpen}
//           onClose={() => setManageProductsModal(false)}
//         />
//         <AddMenuModal
//           isOpen={isAddMenuModalOpen}
//           onClose={() => setIsAddMenuModalOpen(false)}
//         />
//       </div>
//       {loading ? (
//         <span>Loading...</span>
//       ) : (
//         <DataTable
//           searchKey="firstName"
//           columns={columns}
//           data={filteredData.slice((pageNo - 1) * limit, pageNo * limit)} // Use filteredData instead of data while api integration
//           // onSearch={(searchValue) => {
//           //     const filtered = data.filter((item) =>
//           //         item.firstName.toLowerCase().includes(searchValue.toLowerCase())
//           //     );
//           //     setData(filtered);
//           // }}
//           // filters={filters}
//           //   onFilterChange={handleFilterChange}
//         />
//       )}
//       <div className="flex justify-end space-x-2 px-3 py-2">
//         <div className="space-x-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => handlePageChange(pageNo - 1)}
//             disabled={pageNo === 1}
//           >
//             Previous
//           </Button>
//           <span className="text-sm text-gray-600">
//             Page {pageNo} of {Math.ceil(totalRecords / limit)}
//           </span>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => handlePageChange(pageNo + 1)}
//             disabled={pageNo >= Math.ceil(totalRecords / limit)}
//           >
//             Next
//           </Button>
//         </div>
//       </div>
//     </>
//   );
// };


'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Plus } from 'lucide-react';

import { columns } from './columns';
import ToggleButton from '@/components/ui/toggleButton';
import ManageProductsModal from '@/components/modal/order-management/ManageProductsModal';
import PriceTimeSetting from '@/components/modal/PriceTimeSetting';
import AddMenuModal from '@/components/modal/order-management/AddMenuModal';
import apiCall from '@/lib/axios';

export type OrderManagementDataType = {
  orderID: string;
  requestTime: {
    date: string;
    time: string;
  };
  guestDetails: {
    name: string;
    guestID: string;
    roomNo: string;
  };
  serviceID: string;
  orderStatus: string;
  assignedTo: string;
};



export const OrderManagementDataTable: React.FC = () => {
  const [data, setData] = useState<OrderManagementDataType[]>([]);
  const [filteredData, setFilteredData] = useState<OrderManagementDataType[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);

  const [isPriceTimeSettingModalOpen, setIsPriceTimeSettingModalOpen] = useState(false);
  const [isManageProductsModalOpen, setManageProductsModal] = useState(false);
  const [isAddMenuModalOpen, setIsAddMenuModalOpen] = useState(false);

  const formatDateTime = (iso: string) => {
    const d = new Date(iso);
    return {
      date: d.toLocaleDateString(),
      time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const fetchData = async () => {
    try {
      const response = await apiCall('GET', 'api/services/orders');

      const dataArray = response?.serviceRequests; // ✅ Correct key

      if (Array.isArray(dataArray)) {
        const mapped = dataArray.map((item: any) => ({
          orderID: item.uniqueId || item._id,
          requestTime: formatDateTime(item.requestTime || item.createdAt),
          guestDetails: {
            name: `${item.guest?.firstName || ''} ${item.guest?.lastName || ''}`.trim(),
            guestID: item.guest?._id || '-',
            roomNo: item.guest?.roomNumber || '-' // optional
          },
          serviceID: item._id || '-',
          orderStatus: item.status || 'Unknown',
          assignedTo: item.assignedTo
            ? `${item.assignedTo.firstName || ''} ${item.assignedTo.lastName || ''}`
            : 'Not Assigned'
        }));

        setData(mapped);
        setFilteredData(mapped);
        setTotalRecords(mapped.length);
      } else {
        console.error('serviceRequests not an array:', response);
        setData([]);
        setFilteredData([]);
      }
    } catch (error) {
      console.error('API fetch error:', error);
      setData([]);
      setFilteredData([]);
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

  const handleSearchChange = (value: string) => {
    const keyword = value.toLowerCase();
    const filtered = data.filter((item) =>
      item.guestDetails.name.toLowerCase().includes(keyword)
    );
    setFilteredData(filtered);
    setPageNo(1);
  };

  return (
    <>
      <div className="w-full pt-20 flex flex-col items-end gap-2 justify-end px-4 py-2">
        <div className="flex w-full justify-between items-center py-3">
          <h2 className="text-coffee text-xl font-bold">Order management</h2>
          <div className="flex items-center gap-3">
            <h2 className="text-[0.8rem] xl:text-sm font-semibold">AUTO ACCEPT REQUESTS</h2>
            <ToggleButton />
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsAddMenuModalOpen(true)} className="btn-primary gap-1">
            <Plus className="w-5 h-5" />
            <span>Add Menu</span>
          </Button>
          <Button onClick={() => setManageProductsModal(true)} className="btn-primary">
            Manage Products
          </Button>
        </div>

        <PriceTimeSetting isOpen={isPriceTimeSettingModalOpen} onClose={() => setIsPriceTimeSettingModalOpen(false)} />
        <ManageProductsModal isOpen={isManageProductsModalOpen} onClose={() => setManageProductsModal(false)} />
        <AddMenuModal isOpen={isAddMenuModalOpen} onClose={() => setIsAddMenuModalOpen(false)} />
      </div>

      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <DataTable
          searchKey="guestDetails.name"
          columns={columns}
          data={filteredData}
          onSearch={handleSearchChange}
        />
      )}

      <div className="flex justify-end space-x-2 px-3 py-2">
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
    </>
  );
};
