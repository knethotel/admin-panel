// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { DataTable } from '@/components/ui/data-table';
// import { Settings } from 'lucide-react';

// import { useRouter } from 'next/navigation';
// import { columns } from './columns';
// import { InRoomDiningData } from 'app/static/services-management/InRoomDining';
// import ToggleButton from '@/components/ui/toggleButton';
// import PriceTimeSetting from '@/components/modal/PriceTimeSetting';

// export const InRoomDiningDataTable: React.FC = () => {
//   const router = useRouter();
//   const [data, setData] = useState(InRoomDiningData || []);
//   const [filteredData, setFilteredData] = useState(InRoomDiningData || []);
//   const [pageNo, setPageNo] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [loading, setLoading] = useState<boolean>();
//   const [totalRecords, setTotalRecords] = useState(data.length || 0);



//   const handlePageChange = (newPage: number) => {
//     if (newPage > 0 && newPage <= Math.ceil(totalRecords / limit)) {
//       setPageNo(newPage);
//     }
//   };

//   const [isModalOpen, setIsModalOpen] = useState(false);

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
//       <div className="flex flex-col gap-4">
//         <div className="w-full pt-20 flex items-center gap-2 justify-end px-4 py-2 bg-white">
//           <div className="flex w-full justify-between items-center">
//             <h2 className="text-coffee text-xl font-bold">In-room Dining</h2>
//             <div className="flex items-center gap-2">
//               <h2 className="text-[0.8rem] font-semibold">
//                 AUTO ACCEPT REQUESTS
//               </h2>
//               <ToggleButton />
//             </div>
//           </div>
//           <Settings className='cursor-pointer' onClick={() => setIsModalOpen(true)} />
//           <PriceTimeSetting
//             isOpen={isModalOpen}
//             onClose={() => setIsModalOpen(false)}
//           />
//         </div>
//         <div className="flex justify-end px-4">
//           <Button
//             onClick={() => router.push(`/hotel-panel/service-management/inroomdining/menu`)}
//             className="btn-primary"
//           >
//             View Menu
//           </Button>
//         </div>
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
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Settings } from 'lucide-react';
import ToggleButton from '@/components/ui/toggleButton';
import PriceTimeSetting from '@/components/modal/PriceTimeSetting';
import { columns } from './columns';
import apiCall from '@/lib/axios';

export type InRoomDiningDataType = {
  orderID: string;
  serviceID: string;

  requestTime: {
    date: string;
    time: string;
  };

  guestDetails: {
    name: string;
    guestID: string;
    roomNo: string;
    phoneNumber?: string;
  };

  status: string;
  assignedTo: string;

  // ✅ Additional fields
  paymentStatus?: string;
  specialInstructions?: string;

  amount?: {
    subtotal: number;
    discount: number;
    finalAmount: number;
  };

  coupon?: {
    code: string;
    type: string;
    value: number;
  };

  orderedItems?: {
    _id: string;
    quantity: number;
    product: {
      _id: string;
      productName: string;
      productType: string;
      HotelId: string;
    };
  }[];

  transaction?: string;
  paymentDate?: string;
  createdAt?: string;
  updatedAt?: string;
};



export const InRoomDiningDataTable: React.FC = () => {
  const router = useRouter();

  const [data, setData] = useState<InRoomDiningDataType[]>([]);
  const [filteredData, setFilteredData] = useState<InRoomDiningDataType[]>([]);
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
      time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await apiCall(
        'GET',
        `api/services/inroomdining/bookings?page=${pageNo}&limit=${limit}`
      );

      if (res?.success && Array.isArray(res.data)) {

        const formatted = res.data.map((item: any): InRoomDiningDataType => ({
          serviceID: item._id,
          orderID: item.uniqueId || 'N/A',

          requestTime: formatDateTime(item.requestTime || item.createdAt),

          guestDetails: {
            name: `${item.guest?.firstName || ''} ${item.guest?.lastName || ''}`.trim(),
            guestID: item.guest?._id || 'N/A',
            roomNo: item.guest?.assignedRoomNumber || 'N/A',
            phoneNumber: item.guest?.phoneNumber || 'N/A',
          },

          assignedTo: item.assignedTo
            ? `${item.assignedTo.firstName || ''} ${item.assignedTo.lastName || ''}`.trim()
            : 'N/A',

          status: mapOrderStatus(item.status),
          paymentStatus: item.paymentStatus || 'N/A',
          specialInstructions: item.specialInstructions || 'N/A',

          amount: {
            subtotal: item.amount?.subtotal ?? 0,
            discount: item.amount?.discount ?? 0,
            finalAmount: item.amount?.finalAmount ?? 0,
          },

          coupon: {
            code: item.coupon?.code || 'N/A',
            type: item.coupon?.type || 'N/A',
            value: item.coupon?.value ?? 0,
          },

          orderedItems: (item.orderedItems || []).map((ordered: any) => ({
            _id: ordered._id,
            quantity: ordered.quantity,
            product: {
              _id: ordered.product?._id || 'N/A',
              productName: ordered.product?.productName || 'N/A',
              productType: ordered.product?.productType || 'N/A',
              HotelId: ordered.product?.HotelId || item.HotelId || 'N/A',
            },
          })),

          transaction: item.transaction || 'N/A',
          paymentDate: item.paymentDate || null,

          createdAt: item.createdAt || null,
          updatedAt: item.updatedAt || null,
        }));


        setData(formatted);
        setFilteredData(formatted);
        setTotalRecords(res.total ?? res.data.length);
      } else {
        setError('Failed to load bookings');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Something went wrong while fetching bookings.');
    } finally {
      setLoading(false);
    }
  };

  const mapOrderStatus = (status: string) => {
    switch (status) {
      case 'placed':
        return 'Order placed';
      case 'preparing':
        return 'Order is Preparing';
      case 'pickedup':
        return 'Order is Picked up';
      case 'transit':
        return 'Order in Transit';
      case 'delivered':
        return 'Order Delivered';
      case 'undelivered':
        return 'Undelivered';
      default:
        return status;
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNo, limit]);

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
            <h2 className="text-coffee text-xl font-bold">In-room Dining</h2>
            <div className="flex items-center gap-2">
              <h2 className="text-[0.8rem] font-semibold">AUTO ACCEPT REQUESTS</h2>
              {/* <ToggleButton /> */}
            </div>
          </div>
          <Settings className="cursor-pointer" onClick={() => setIsModalOpen(true)} />
          <PriceTimeSetting isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>

        <div className="flex justify-end px-4">
          <Button
            onClick={() => router.push('/hotel-panel/service-management/inroomdining/menu')}
            className="btn-primary"
          >
            View Menu
          </Button>
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
