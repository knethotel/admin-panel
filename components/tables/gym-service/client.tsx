// 'use client';

// import { useEffect, useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { DataTable } from '@/components/ui/data-table';
// import { Settings } from 'lucide-react';

// import { useRouter } from 'next/navigation';
// import { columns } from './columns';

// import { GymServiceData } from 'app/static/services-management/Gym';
// import ToggleButton from '@/components/ui/toggleButton';
// import PriceTimeSetting from '@/components/modal/PriceTimeSetting';
// import ManageProductsModal from '@/components/modal/gym/manage-products';
// import PriceTimeSettingGym from '@/components/modal/gym/PriceTimeSetting';
// import { PaginationControls } from '@/components/shared/PaginationControls';
// import apiCall from '@/lib/axios';

// export const GymServiceTable: React.FC = () => {
//   const router = useRouter();
//   const [data, setData] = useState(GymServiceData || []);
//   const [filteredData, setFilteredData] = useState(GymServiceData || []);
//   const [pageNo, setPageNo] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [loading, setLoading] = useState<boolean>();
//   const [totalRecords, setTotalRecords] = useState(data.length || 0);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await apiCall('GET', 'api/services/facility/requests');
//       setData(response?.data || []);
//       setFilteredData(response?.data || []);
//       setTotalRecords(response?.data?.length || 0);
//     } catch (error) {
//       console.error('Failed to fetch facility requests:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

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
//           <h2 className="text-coffee text-xl font-bold">
//             Gym/Conference hall/Community hall
//           </h2>
//           <div className="flex items-center gap-2">
//             <h2 className="text-[0.8rem] font-semibold">
//               AUTO ACCEPT REQUESTS
//             </h2>
//             <ToggleButton />
//           </div>
//         </div>
//         {/* <Settings
//           className="cursor-pointer"
//           onClick={() => setIsModalOpen(true)}
//         />
//         <PriceTimeSettingGym
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//         /> */}
//       </div>
//       <div className="w-full flex justify-end px-4">
//         <Button
//           onClick={() => router.push('/hotel-panel/service-management/gym/add')}
//           className="btn-primary h-8 2xl:h-9"
//         >
//           Manage Products
//         </Button>
//         {/* <ManageProductsModal
//           isOpen={isManageProductsModalOpen}
//           onClose={() => setIsManageProductsModalOpen(false)}
//         /> */}
//       </div>
//       {loading ? (
//         <span>Loading...</span>
//       ) : (
//         <DataTable
//           searchKey="firstName"
//           columns={columns}
//           data={filteredData.slice((pageNo - 1) * limit, pageNo * limit)} // Use filteredData instead of data 
//         />
//       )}
//       <PaginationControls
//         pageNo={pageNo}
//         totalRecords={totalRecords}
//         limit={limit}
//         filteredCount={filteredData.length}
//         onPageChange={handlePageChange}
//       />
//     </>
//   );
// };


'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import ToggleButton from '@/components/ui/toggleButton';
import { PaginationControls } from '@/components/shared/PaginationControls';
import apiCall from '@/lib/axios';
import { GymServiceDataType } from 'app/static/services-management/Gym';
import { columns } from './columns';

export const GymServiceTable: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<GymServiceDataType[]>([]);
  const [filteredData, setFilteredData] = useState<GymServiceDataType[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await apiCall('GET', 'api/services/facility/requests');
      const records: GymServiceDataType[] = response?.data || [];
      console.log(response?.data)
      setData(records);
      setFilteredData(records);
    } catch (err) {
      console.error('Failed to fetch:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(filteredData.length / limit)) {
      setPageNo(newPage);
    }
  };

  return (
    <>
      <div className="w-full pt-20 px-4 py-2 bg-white flex justify-between items-center">
        <h2 className="text-xl font-bold text-coffee">Facility Requests</h2>
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold">AUTO ACCEPT REQUESTS</h2>
          <ToggleButton />
        </div>
      </div>

      <div className="w-full flex justify-end px-4 py-2">
        <Button
          className="btn-primary h-8"
          onClick={() => router.push('/hotel-panel/service-management/gym/add')}
        >
          Manage Products
        </Button>
      </div>

      {loading ? (
        <p className="text-center py-10">Loading...</p>
      ) : (
        <>
          <DataTable
            columns={columns}
            data={filteredData.slice((pageNo - 1) * limit, pageNo * limit)}
            searchKey="guest.firstName"
          />
          <PaginationControls
            pageNo={pageNo}
            totalRecords={filteredData.length}
            limit={limit}
            filteredCount={filteredData.length}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};
