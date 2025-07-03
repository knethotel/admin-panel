// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { DataTable } from '@/components/ui/data-table';
// import { Settings } from 'lucide-react';

// import { useRouter } from 'next/navigation';
// import { columns } from './columns';
// import { ConciergeServiceData } from 'app/static/services-management/Concierge';
// import ToggleButton from '@/components/ui/toggleButton';
// import ManageProductsModal from '@/components/modal/concierge/manage-products';
// import PriceTimeSettingConciergeModal from '@/components/modal/concierge/PriceTimeSetting';

// export const ConciergeServiceTable: React.FC = () => {
//   const router = useRouter();
//   const [data, setData] = useState(ConciergeServiceData || []);
//   const [filteredData, setFilteredData] = useState(ConciergeServiceData || []);
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
//           <h2 className="text-coffee text-xl font-bold">Concierge Service</h2>
//           <div className="flex items-center gap-2">
//             <h2 className="text-[0.8rem] font-semibold">
//               AUTO ACCEPT REQUESTS
//             </h2>
//             <ToggleButton />
//           </div>
//         </div>
//         <Settings className='cursor-pointer' onClick={() => setIsModalOpen(true)} />
//         <PriceTimeSettingConciergeModal
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
import { Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import ToggleButton from '@/components/ui/toggleButton';
import ManageProductsModal from '@/components/modal/concierge/manage-products';
import PriceTimeSettingConciergeModal from '@/components/modal/concierge/PriceTimeSetting';
import apiCall from '@/lib/axios'; // Make sure this exists and works like axios

export const ConciergeServiceTable: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isManageProductsModalOpen, setIsManageProductsModalOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await apiCall('GET', `/api/services/concierge/requests`);
      if (res?.success) {
        // const mapped = res.data.map((item: any) => ({
        //   serviceID: item._id,
        //   uniqueId: item.uniqueId || '',
        //   guestDetails: {
        //     name: `${item.guest?.firstName || ''} ${item.guest?.lastName || ''}`.trim(),
        //     guestID: item.guest?._id || '',
        //     roomNo: item.roomNo || 'N/A',
        //   },
        //   requestDetail: item.requestDetail || '-',
        //   paymentStatus: item.paymentStatus || 'N/A',
        //   status: item.status || 'N/A',
        //   requestType: item.requestType || '',
        //   conciergeItem: item.conciergeItem || {},
        //   amount: item.amount?.finalAmount || 0,
        //   requestTime: {
        //     date: item.requestTime ? new Date(item.requestTime).toLocaleDateString() : 'N/A',
        //     time: item.requestTime ? new Date(item.requestTime).toLocaleTimeString() : 'N/A',
        //   },
        //   transactionID: item.transaction || '',
        // }));

        const mapped = res.data.map((item: any) => ({
          serviceID: item._id || '',
          uniqueId: item.uniqueId || '',

          guestDetails: {
            name: `${item.guest?.firstName || ''} ${item.guest?.lastName || ''}`.trim(),
            guestID: item.guest?._id || '',
            roomNo: item.guest?.assignedRoomNumber || item.roomNo || 'N/A',
            phoneNumber: item.guest?.phoneNumber || 'N/A',
          },

          requestDetail: item.requestDetail || '-',
          paymentStatus: item.paymentStatus || 'N/A',
          status: item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : 'N/A',
          requestType: item.requestType || '',
          conciergeItem: item.conciergeItem || {},
          amount: item.amount?.finalAmount || 0,
          location: item.location || '-',

          requestTime: {
            date: item.requestTime
              ? new Date(item.requestTime).toLocaleDateString()
              : 'N/A',
            time: item.requestTime
              ? new Date(item.requestTime).toLocaleTimeString()
              : 'N/A',
          },

          bookingDate: item.date
            ? new Date(item.date).toLocaleDateString()
            : 'N/A',

          hotelId: typeof item.HotelId === 'object' ? item.HotelId._id || item.HotelId : item.HotelId || '',
          createdAt: item.createdAt
            ? new Date(item.createdAt).toLocaleString()
            : '',
          updatedAt: item.updatedAt
            ? new Date(item.updatedAt).toLocaleString()
            : '',
        }));

        setData(mapped);
        setFilteredData(mapped);
        setTotalRecords(res.total || mapped.length);
      }
    } catch (err) {
      console.error('Failed to fetch concierge data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNo, limit]);

  const handleSearchChange = (searchValue: string) => {
    if (!searchValue.trim()) {
      setFilteredData(data);
    } else {
      const lower = searchValue.toLowerCase();
      setFilteredData(
        data.filter((item) =>
          item.guestDetails.name.toLowerCase().includes(lower)
        )
      );
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(totalRecords / limit)) {
      setPageNo(newPage);
    }
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPageNo(1);
  };

  return (
    <>
      <div className="w-full pt-20 flex items-center gap-2 justify-end px-4 py-2 bg-white">
        <div className="flex w-full justify-between items-center">
          <h2 className="text-coffee text-xl font-bold">Concierge Service</h2>
          <div className="flex items-center gap-2">
            <h2 className="text-[0.8rem] font-semibold">
              AUTO ACCEPT REQUESTS
            </h2>
            {/* <ToggleButton /> */}
          </div>
        </div>
        <Settings
          className="cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />
        <PriceTimeSettingConciergeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
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
        <span className="px-4 py-6">Loading...</span>
      ) : (
        <DataTable
          searchKey="guestDetails.name"
          columns={columns}
          data={filteredData.slice((pageNo - 1) * limit, pageNo * limit)}
          onSearch={handleSearchChange}
        />
      )}

      <div className="flex justify-between items-center px-4 py-3">
        <div>
          <label className="text-sm mr-2">Rows per page:</label>
          <select
            value={limit}
            onChange={(e) => handleLimitChange(parseInt(e.target.value))}
            className="border px-2 py-1 rounded"
          >
            {[5, 10, 20, 50].map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
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
