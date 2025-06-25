
// 'use client';

// import { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { DataTable } from '@/components/ui/data-table';
// import { Settings } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { columns } from './columns';

// import axios from 'axios';
// import ToggleButton from '@/components/ui/toggleButton';
// import PriceTimeSettingSpa from '@/components/modal/spa-service/PriceTimeSetting';
// import ManageProductsModal from '@/components/modal/spa-service/manage-products';
// import apiCall from '@/lib/axios';

// export const SpaServiceDataTable: React.FC = () => {
//   const router = useRouter();
//   const [data, setData] = useState<any[]>([]);
//   const [filteredData, setFilteredData] = useState<any[]>([]);
//   const [pageNo, setPageNo] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [totalRecords, setTotalRecords] = useState(0);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isManageProductsModalOpen, setIsManageProductsModalOpen] =
//     useState(false);

//   // Fetch data from API
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await apiCall('GET', 'api/services/reception/requests');
//         if (response.success && Array.isArray(response.data)) {
//           // Map API data to table format
//           const mapped = response.data.map((item: any) => ({
//             serviceID: item._id || 'N/A',
//             requestTime: {
//               date: item.requestTime ? new Date(item.requestTime).toLocaleDateString() : 'N/A',
//               time: item.requestTime ? new Date(item.requestTime).toLocaleTimeString() : 'N/A',
//             },
//             guestDetails: {
//               name: item.guest ? `${item.guest.firstName || ''} ${item.guest.lastName || ''}`.trim() : 'N/A',
//               guestID: item.guest?._id || 'N/A',
//               roomNo: item.roomNo || 'N/A',
//             },
//             status: item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : 'N/A',
//             assignedTo: item.assignedTo || 'N/A',
//             estimatedTime: item.estimatedTime || '',
//             requestDetail: item.requestDetail || 'N/A',
//             serviceType: item.serviceType || 'N/A',
//             requestType: item.requestType || 'N/A',
//             uniqueId: item.uniqueId || 'N/A',
//             wakeUpTime: item.wakeUpTime || '',
//             HotelId: item.HotelId || '',
//           }));
//           setData(mapped);
//           setFilteredData(mapped);
//           setTotalRecords(mapped.length);
//         } else {
//           setData([]);
//           setFilteredData([]);
//           setTotalRecords(0);
//         }
//       } catch (error) {
//         setData([]);
//         setFilteredData([]);
//         setTotalRecords(0);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // Call fetchData when the component mounts
//   // useEffect(() => {
//   //   fetchData();
//   // }, []);

//   const handlePageChange = (newPage: number) => {
//     if (newPage > 0 && newPage <= Math.ceil(totalRecords / limit)) {
//       setPageNo(newPage);
//     }
//   };

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
//         item.guestName.toLowerCase().includes(searchValue.toLowerCase())
//       );
//       setFilteredData(filtered);
//     }
//   };

//   // Check filteredData before rendering
//   console.log('Filtered Data:', filteredData);  // Log filteredData

//   return (
//     <>
//       <div className="w-full pt-20 flex items-center gap-2 justify-end px-4 py-2 bg-white">
//         <div className="flex w-full justify-between items-center">
//           <h2 className="text-coffee text-xl font-bold">Spa/Salon</h2>
//           <div className="flex items-center gap-2">
//             <h2 className="text-[0.8rem] font-semibold">AUTO ACCEPT REQUESTS</h2>
//             <ToggleButton />
//           </div>
//         </div>
//         <Settings className="cursor-pointer" onClick={() => setIsModalOpen(true)} />
//         <PriceTimeSettingSpa isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
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
//       ) : filteredData.length === 0 ? (
//         <span>No data available</span>
//       ) : (
//         <DataTable
//           searchKey="guestName"
//           columns={columns}
//           data={filteredData.slice((pageNo - 1) * limit, pageNo * limit)}
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
  const [isManageProductsModalOpen, setIsManageProductsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await apiCall('GET', `api/services/spasalon/bookings?page=${pageNo}&limit=${limit}`);
        if (response.success && Array.isArray(response.data)) {
          const mapped = response.data.map((item: any) => ({
            // bookingID: item._id,
            serviceID: item._id || 'N/A',
            guestName: `${item.guest?.firstName || ''} ${item.guest?.lastName || ''}`.trim(),
            serviceType: item.spaSalonProduct?.serviceType || 'N/A',
            productName: item.spaSalonProduct?.productName || 'N/A',
            productCategory: item.spaSalonProduct?.productCategory || 'N/A',
            bookingDate: item.bookingDate ? new Date(item.bookingDate).toLocaleDateString() : 'N/A',
            bookingTime: item.bookingTime || 'N/A',
            status: item.status || 'N/A',
            paymentStatus: item.paymentStatus || 'N/A',
            amount: item.amount?.finalAmount || 0,
            description: item.description || item.notes || '-',
            uniqueId: item.uniqueId || '',
            assignedTo: item.assignedTo ? `${item.assignedTo.firstName || ''} ${item.assignedTo.lastName || ''}` : 'Unassigned',
            estimatedDeliveryTime: item.estimatedDeliveryTime ? new Date(item.estimatedDeliveryTime).toLocaleString() : '',
          }));
          setData(mapped);
          setFilteredData(mapped);
          setTotalRecords(response.total || mapped.length); // assuming pagination
        } else {
          setData([]);
          setFilteredData([]);
          setTotalRecords(0);
        }
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
        setData([]);
        setFilteredData([]);
        setTotalRecords(0);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
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
        item.productName.toLowerCase().includes(lower) ||
        item.uniqueId.toLowerCase().includes(lower)
      ));
    }
  };

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
        <span className="px-4 py-8">Loading...</span>
      ) : filteredData.length === 0 ? (
        <span className="px-4 py-8">No bookings found.</span>
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
