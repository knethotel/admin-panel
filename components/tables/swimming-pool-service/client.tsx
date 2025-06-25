// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { DataTable } from '@/components/ui/data-table';
// import { Settings } from 'lucide-react';

// import { useRouter } from 'next/navigation';
// import { columns } from './columns';
// import { SwimmingpoolServiceData } from 'app/static/services-management/SwimmingPool';
// import ToggleButton from '@/components/ui/toggleButton';
// import PriceTimeSetting from '@/components/modal/PriceTimeSetting';
// import ManageProductsModal from '@/components/modal/swimmingpool/manage-products';

// export const SwimmingpoolServiceDataTable: React.FC = () => {
//   const router = useRouter();
//   const [data, setData] = useState(SwimmingpoolServiceData || []);
//   const [filteredData, setFilteredData] = useState(
//     SwimmingpoolServiceData || []
//   );
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

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isManageProductsModalOpen, setIsManageProductsModalOpen] =
//     useState(false);

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
//       <div className="w-full pt-20 flex items-center gap-2 justify-end px-4 py-2 bg-white">
//         <div className="flex w-full justify-between items-center">
//           <h2 className="text-coffee text-xl font-bold">Swimming Pool</h2>
//           <div className="flex items-center gap-2">
//             <h2 className="text-[0.8rem] font-semibold">
//               AUTO ACCEPT REQUESTS
//             </h2>
//             <ToggleButton />
//           </div>
//         </div>
//         <Settings className='cursor-pointer' onClick={() => setIsModalOpen(true)} />
//         <PriceTimeSetting
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//         />
//       </div>
//       <div className="w-full flex justify-end px-4">
//         <Button
//           onClick={() => setIsManageProductsModalOpen(true)}
//           className="btn-primary h-8 2xl:h-9"
//         >
//           Manage Products
//         </Button>
//         <ManageProductsModal
//           isOpen={isManageProductsModalOpen}
//           onClose={() => setIsManageProductsModalOpen(false)}
//         />
//       </div>
//       {loading ? (
//         <span>Loading...</span>
//       ) : (
//         <DataTable
//           searchKey="firstName"
//           columns={columns}
//           data={filteredData.slice((pageNo - 1) * limit, pageNo * limit)} // Use filteredData instead of data while api integration
//         // onSearch={(searchValue) => {
//         //     const filtered = data.filter((item) =>
//         //         item.firstName.toLowerCase().includes(searchValue.toLowerCase())
//         //     );
//         //     setData(filtered);
//         // }}
//         // filters={filters}
//         //   onFilterChange={handleFilterChange}
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
import { Settings } from 'lucide-react';
import ToggleButton from '@/components/ui/toggleButton';
import apiCall from '@/lib/axios';

import PriceTimeSetting from '@/components/modal/PriceTimeSetting';
import ManageProductsModal from '@/components/modal/swimmingpool/manage-products';
import { columns } from './columns';

export const SwimmingpoolServiceDataTable: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalRecords, setTotalRecords] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isManageProductsModalOpen, setIsManageProductsModalOpen] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const response = await apiCall('GET', `/api/services/swimming-pool/requests?page=${pageNo}&limit=${limit}`);
        if (response.success && Array.isArray(response.data)) {
          const mapped = response.data.map((item: any) => ({
            serviceID: item._id || 'N/A',
            guestName: `${item.guest?.firstName || ''} ${item.guest?.lastName || ''}`.trim(),
            requestTime: {
              date: item.requestTime ? new Date(item.requestTime).toLocaleDateString() : 'N/A',
              time: item.requestTime ? new Date(item.requestTime).toLocaleTimeString() : 'N/A',
            },
            guestDetails: {
              name: item.guest ? `${item.guest.firstName || ''} ${item.guest.lastName || ''}`.trim() : 'N/A',
              guestID: item.guest?._id || 'N/A',
              roomNo: item.roomNo || 'N/A',
            },
            bookingDate: item.bookingDate ? new Date(item.bookingDate).toLocaleDateString() : 'N/A',
            startTime: item.startTime || 'N/A',
            endTime: item.endTime || 'N/A',
            status: item.status || 'N/A',
            paymentStatus: item.paymentStatus || 'N/A',
            amount: item.amount?.finalAmount || 0,
            requestDetail: item.requestDetail || '-',
            uniqueId: item.uniqueId || '',
            transaction: item.transaction || 'N/A',
          }));
          setData(mapped);
          setFilteredData(mapped);
          setTotalRecords(response.total || mapped.length);
        } else {
          setData([]);
          setFilteredData([]);
          setTotalRecords(0);
        }
      } catch (error) {
        console.error('Failed to fetch swimming pool requests:', error);
        setData([]);
        setFilteredData([]);
        setTotalRecords(0);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [pageNo, limit]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(totalRecords / limit)) {
      setPageNo(newPage);
    }
  };

  const handleSearchChange = (searchValue: string) => {
    if (!searchValue.trim()) {
      setFilteredData(data);
    } else {
      const lower = searchValue.toLowerCase();
      setFilteredData(data.filter((item) =>
        item.guestName.toLowerCase().includes(lower) ||
        item.uniqueId.toLowerCase().includes(lower)
      ));
    }
  };

  return (
    <>
      <div className="w-full pt-20 flex items-center gap-2 justify-end px-4 py-2 bg-white">
        <div className="flex w-full justify-between items-center">
          <h2 className="text-coffee text-xl font-bold">Swimming Pool</h2>
          <div className="flex items-center gap-2">
            <h2 className="text-[0.8rem] font-semibold">AUTO ACCEPT REQUESTS</h2>
            <ToggleButton />
          </div>
        </div>
        <Settings className="cursor-pointer" onClick={() => setIsModalOpen(true)} />
        <PriceTimeSetting isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>

      <div className="w-full flex justify-end px-4">
        <Button
          onClick={() => setIsManageProductsModalOpen(true)}
          className="btn-primary h-8 2xl:h-9"
        >
          Manage Products
        </Button>
        <ManageProductsModal
          isOpen={isManageProductsModalOpen}
          onClose={() => setIsManageProductsModalOpen(false)}
        />
      </div>

      {loading ? (
        <span className="px-4 py-8">Loading...</span>
      ) : filteredData.length === 0 ? (
        <span className="px-4 py-8">No requests found.</span>
      ) : (
        <DataTable
          searchKey="guestName"
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
