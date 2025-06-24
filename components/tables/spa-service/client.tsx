// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { DataTable } from '@/components/ui/data-table';
// import { Settings } from 'lucide-react';

// import { useRouter } from 'next/navigation';
// import { columns } from './columns';

// import { SpaServiceData } from 'app/static/services-management/Spa';
// import ToggleButton from '@/components/ui/toggleButton';
// import PriceTimeSetting from '@/components/modal/PriceTimeSetting';
// import ManageProductsModal from '@/components/modal/spa-service/manage-products';
// import PriceTimeSettingSpa from '@/components/modal/spa-service/PriceTimeSetting';

// export const SpaServiceDataTable: React.FC = () => {
//   const router = useRouter();
//   const [data, setData] = useState(SpaServiceData || []);
//   const [filteredData, setFilteredData] = useState(SpaServiceData || []);
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
//           <h2 className="text-coffee text-xl font-bold">Spa/Salon</h2>
//           <div className="flex items-center gap-2">
//             <h2 className="text-[0.8rem] font-semibold">
//               AUTO ACCEPT REQUESTS
//             </h2>
//             <ToggleButton />
//           </div>
//         </div>
//         <Settings className='cursor-pointer' onClick={() => setIsModalOpen(true)} />
//         <PriceTimeSettingSpa
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

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';

import axios from 'axios';
import ToggleButton from '@/components/ui/toggleButton';
import PriceTimeSettingSpa from '@/components/modal/spa-service/PriceTimeSetting';
import ManageProductsModal from '@/components/modal/spa-service/manage-products';
import apiCall from '@/lib/axios';

export const SpaServiceDataTable: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalRecords, setTotalRecords] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isManageProductsModalOpen, setIsManageProductsModalOpen] =
    useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiCall('GET', 'api/services/reception/requests');
        if (response.success && Array.isArray(response.data)) {
          // Map API data to table format
          const mapped = response.data.map((item: any) => ({
            requestID: item._id || 'N/A',
            requestTime: {
              date: item.requestTime ? new Date(item.requestTime).toLocaleDateString() : 'N/A',
              time: item.requestTime ? new Date(item.requestTime).toLocaleTimeString() : 'N/A',
            },
            guestDetails: {
              name: item.guest ? `${item.guest.firstName || ''} ${item.guest.lastName || ''}`.trim() : 'N/A',
              guestID: item.guest?._id || 'N/A',
              roomNo: item.roomNo || 'N/A',
            },
            status: item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : 'N/A',
            assignedTo: item.assignedTo || 'N/A',
            estimatedTime: item.estimatedTime || '',
            requestDetail: item.requestDetail || 'N/A',
            serviceType: item.serviceType || 'N/A',
            requestType: item.requestType || 'N/A',
            uniqueId: item.uniqueId || 'N/A',
            wakeUpTime: item.wakeUpTime || '',
            HotelId: item.HotelId || '',
          }));
          setData(mapped);
          setFilteredData(mapped);
          setTotalRecords(mapped.length);
        } else {
          setData([]);
          setFilteredData([]);
          setTotalRecords(0);
        }
      } catch (error) {
        setData([]);
        setFilteredData([]);
        setTotalRecords(0);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Call fetchData when the component mounts
  // useEffect(() => {
  //   fetchData();
  // }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(totalRecords / limit)) {
      setPageNo(newPage);
    }
  };

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
        item.guestName.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  // Check filteredData before rendering
  console.log('Filtered Data:', filteredData);  // Log filteredData

  return (
    <>
      <div className="w-full pt-20 flex items-center gap-2 justify-end px-4 py-2 bg-white">
        <div className="flex w-full justify-between items-center">
          <h2 className="text-coffee text-xl font-bold">Spa/Salon</h2>
          <div className="flex items-center gap-2">
            <h2 className="text-[0.8rem] font-semibold">AUTO ACCEPT REQUESTS</h2>
            <ToggleButton />
          </div>
        </div>
        <Settings className="cursor-pointer" onClick={() => setIsModalOpen(true)} />
        <PriceTimeSettingSpa isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
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
        <span>Loading...</span>
      ) : filteredData.length === 0 ? (
        <span>No data available</span>
      ) : (
        <DataTable
          searchKey="guestName"
          columns={columns}
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
    </>
  );
};
