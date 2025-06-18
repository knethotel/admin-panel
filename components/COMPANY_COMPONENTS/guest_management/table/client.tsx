// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { DataTable } from '@/components/ui/data-table';
// import { Heading } from '@/components/ui/heading';

// import { useRouter } from 'next/navigation';
// import { columns } from './columns';

// import { GuestDetailsDummyData } from 'app/static/company-panel/GuestManagement';

// export const CompanyPanelGuestManagementHome: React.FC = () => {
//   const router = useRouter();
//   const [data, setData] = useState(GuestDetailsDummyData || []);
//   const [filteredData, setFilteredData] = useState(GuestDetailsDummyData || []);
//   const [pageNo, setPageNo] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [loading, setLoading] = useState<boolean>();
//   const [totalRecords, setTotalRecords] = useState(data.length || 0);

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

//   return (
//     <>
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
//       <div className="flex justify-end space-x-2 px-3">
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
import { Heading } from '@/components/ui/heading';
import { columns } from './columns';
import apiCall from '@/lib/axios';

export const CompanyPanelGuestManagementHome: React.FC = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiCall('GET', `api/booking/platform?page=${pageNo}&limit=${limit}`);
      if (res?.success) {
        setData(res.bookings || []);
        setFilteredData(res.bookings || []);
        setTotalRecords(res.totalRecords || res.bookings?.length || 0);
      } else {
        setError('Failed to load bookings');
      }
    } catch (err) {
      console.error('API fetch error:', err);
      setError('Something went wrong while fetching bookings.');
    } finally {
      setLoading(false);
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

  const handleSearchChange = (searchValue: string) => {
    if (searchValue.trim() === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item: any) =>
        `${item.firstName} ${item.lastName}`.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Heading title="All Guest Bookings" />
      </div>

      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-4">{error}</div>
      ) : (
        <DataTable
          searchKey="firstName"
          columns={columns}
          data={filteredData.slice((pageNo - 1) * limit, pageNo * limit)}
          onSearch={handleSearchChange}
        />
      )}

      {/* Pagination always at the bottom */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-6 px-3 py-4 border-t">
        <div className="text-sm">
          Showing {Math.min((pageNo - 1) * limit + 1, totalRecords)} to{' '}
          {Math.min(pageNo * limit, totalRecords)} of {totalRecords} entries
        </div>
        <div className="flex items-center space-x-2">
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
    </div>
  );
};
