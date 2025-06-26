// 'use client';

// import { useEffect, useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { DataTable } from '@/components/ui/data-table';
// import { Settings } from 'lucide-react';

// import { useRouter } from 'next/navigation';
// import { columns } from './columns';
// import { InRoomControlData } from 'app/static/services-management/InRoomControl';
// import ToggleButton from '@/components/ui/toggleButton';
// import PriceTimeSettingInRoomControlModal from '@/components/modal/in-room-control/PriceTimeSetting';
// import apiCall from '@/lib/axios';
// import { PaginationControls } from '@/components/shared/PaginationControls';

// export const InRoomControlDataTable: React.FC = () => {
//   const router = useRouter();
//   const [data, setData] = useState(InRoomControlData || []);
//   const [filteredData, setFilteredData] = useState(InRoomControlData || []);
//   const [pageNo, setPageNo] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [loading, setLoading] = useState<boolean>();
//   const [totalRecords, setTotalRecords] = useState(data.length || 0);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await apiCall(
//           'GET',
//           'api/services/inroomcontrol/requests/'
//         );
//         if (response.success && Array.isArray(response.data)) {
//           // Map API data to table format
//           const mapped = response.data.map((item: any) => ({
//             requestID: item._id || 'N/A',
//             requestTime: {
//               date: item.requestTime
//                 ? new Date(item.requestTime).toLocaleDateString()
//                 : 'N/A',
//               time: item.requestTime
//                 ? new Date(item.requestTime).toLocaleTimeString()
//                 : 'N/A'
//             },
//             guestDetails: {
//               name: item.guest
//                 ? `${item.guest.firstName || ''} ${item.guest.lastName || ''}`.trim()
//                 : 'N/A',
//               guestID: item.guest?._id || 'N/A',
//               roomNo: item.roomNo || 'N/A'
//             },
//             status: item.status
//               ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
//               : 'N/A',
//             assignedTo: item.assignedTo || 'N/A',
//             serviceID: item._id,
//             estimatedTime: item.estimatedTime || '',
//             requestDetail: item.requestDetail || 'N/A',
//             requestType: item.serviceType || 'N/A',
//             wakeUpTime: item.wakeUpTime || '',
//             HotelId: item.HotelId || ''
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

//   const handlePageChange = (newPage: number) => {
//     if (newPage > 0 && newPage <= Math.ceil(totalRecords / limit)) {
//       setPageNo(newPage);
//     }
//   };

//   const [isModalOpen, setIsModalOpen] = useState(false);

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
//           <h2 className="text-coffee text-xl font-bold">In-room Control</h2>
//           <div className="flex items-center gap-2">
//             <h2 className="text-[0.8rem] font-semibold">
//               AUTO ACCEPT REQUESTS
//             </h2>
//             <ToggleButton />
//           </div>
//         </div>
//         <Settings
//           className="cursor-pointer"
//           onClick={() => setIsModalOpen(true)}
//         />
//         <PriceTimeSettingInRoomControlModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
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

//       <PaginationControls
//         totalRecords={totalRecords}
//         pageNo={pageNo}
//         limit={limit}
//         onPageChange={handlePageChange}
//         filteredCount={filteredData.length}
//       />
//     </>
//   );
// };


'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Settings } from 'lucide-react';
import ToggleButton from '@/components/ui/toggleButton';
import PriceTimeSettingInRoomControlModal from '@/components/modal/in-room-control/PriceTimeSetting';
import { columns } from './columns';
import apiCall from '@/lib/axios';

export type InRoomControlDataType = {

  requestID: string;
  orderID: string;
  serviceID: string;
  uniqueId: string;

  requestTime: {
    date: string;
    time: string;
  };
  estimatedTime: string;
  estimatedDeliveryTime?: string;

  wakeUpTime: string;


  guestDetails: {
    name: string;
    guestID: string;
    roomNo: string;
    phoneNumber?: string;
  };

  status: string;
  assignedTo: string;
  assignedToMobile?: string;

  requestType: string;
  issueType: string;
  requestDetail: string;


  HotelId: string;


  paymentStatus?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};


export const InRoomControlDataTable: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<InRoomControlDataType[]>([]);
  const [filteredData, setFilteredData] = useState<InRoomControlDataType[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDateTime = (iso: string) => {
    const d = new Date(iso);
    return {
      date: d.toLocaleDateString(),
      time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiCall('GET', 'api/services/inroomcontrol/requests');
        if (response.success && Array.isArray(response.data)) {
          // Map API data to table format
          // const mapped = response.data.map((item: any) => ({
          //   requestID: item._id || 'N/A',
          //   orderID: item.uniqueId || 'N/A',
          //   // serviceID: item._id,
          //   requestTime: {
          //     date: item.requestTime ? new Date(item.requestTime).toLocaleDateString() : 'N/A',
          //     time: item.requestTime ? new Date(item.requestTime).toLocaleTimeString() : 'N/A'
          //   },
          //   guestDetails: {
          //     // Ensure guestDetails.name is a string
          //     name: `${item.guest?.firstName || ''} ${item.guest?.lastName || ''}`.trim(),
          //     guestID: item.guest?._id || 'N/A',
          //     roomNo: item.roomNo || 'N/A',
          //   },
          //   status: item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : 'N/A',
          //   assignedTo: `${item.assignedTo?.firstName || ''} ${item.assignedTo?.lastName || ''}` || 'N/A',
          //   estimatedTime: item.estimatedTime || '',
          //   requestDetail: item.requestDetail || 'N/A',
          //   issueType: item.issueType || 'N/A',
          //   requestType: item.requestType || 'N/A',
          //   wakeUpTime: item.wakeUpTime || '',
          //   HotelId: item.HotelId || '',
          // }));

          const mapped = response.data.map((item: any) => ({
            requestID: item._id || 'N/A',
            orderID: item.uniqueId || 'N/A',
            serviceID: item._id || 'N/A',

            requestTime: {
              date: item.requestTime
                ? new Date(item.requestTime).toLocaleDateString()
                : 'N/A',
              time: item.requestTime
                ? new Date(item.requestTime).toLocaleTimeString()
                : 'N/A',
            },

            guestDetails: {
              name: `${item.guest?.firstName || ''} ${item.guest?.lastName || ''}`.trim(),
              guestID: item.guest?._id || 'N/A',
              roomNo: item.guest?.assignedRoomNumber || item.roomNo || 'N/A',
              phoneNumber: item.guest?.phoneNumber || 'N/A',
            },

            status: item.status
              ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
              : 'N/A',

            assignedTo: `${item.assignedTo?.firstName || ''} ${item.assignedTo?.lastName || ''}`.trim() || 'Unassigned',
            assignedToMobile: item.assignedTo?.mobileNumber || 'N/A',

            estimatedTime: item.estimatedTime || '',
            estimatedDeliveryTime: item.estimatedDeliveryTime || '',

            requestDetail: item.requestDetail || 'N/A',
            issueType: item.issueType || 'N/A',
            requestType: item.requestType || 'N/A',
            wakeUpTime: item.wakeUpTime || '',
            HotelId: item.HotelId || 'N/A',

            description: item.description || '-',
            paymentStatus: item.paymentStatus || 'N/A',

            createdAt: item.createdAt
              ? new Date(item.createdAt).toLocaleString()
              : 'N/A',

            updatedAt: item.updatedAt
              ? new Date(item.updatedAt).toLocaleString()
              : 'N/A',
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
      <div className="flex flex-col gap-4">
        <div className="w-full pt-20 flex items-center gap-2 justify-end px-4 py-2 bg-white">
          <div className="flex w-full justify-between items-center">
            <h2 className="text-coffee text-xl font-bold">In-room Control</h2>
            <div className="flex items-center gap-2">
              <h2 className="text-[0.8rem] font-semibold">AUTO ACCEPT REQUESTS</h2>
              <ToggleButton />
            </div>
          </div>
          <Settings className="cursor-pointer" onClick={() => setIsModalOpen(true)} />
          <PriceTimeSettingInRoomControlModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-4">{error}</div>
      ) : (
        <DataTable
          searchKey="guestDetails.name"
          columns={columns}
          data={filteredData.slice((pageNo - 1) * limit, pageNo * limit)}
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
