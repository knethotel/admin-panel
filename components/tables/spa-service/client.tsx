'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Settings } from 'lucide-react';
import { columns } from './columns';
import ToggleButton from '@/components/ui/toggleButton';
import ManageProductsModal from '@/components/modal/spa-service/manage-products';
import PriceTimeSettingSpa from '@/components/modal/spa-service/PriceTimeSetting';
import { apiCall } from '@/lib/axios';
import { SpaBooking, SpaBookingsResponse } from '@/types/spa-booking';

export const SpaServiceDataTable: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await apiCall<SpaBookingsResponse>(
          'GET',
          'api/services/spasalon/bookings'
        );

        if (response.success) {
          const mappedData = response.data.map((booking: SpaBooking) => ({
            serviceID: booking._id,
            serviceType: booking.spaSalonProduct.serviceType,
            requestDetail: booking.notes || 'No special requests',
            responseDetail: '',
            requestAssignedTo: 'Staff',
            requestTime: {
              date: new Date(booking.bookingDate).toLocaleDateString(),
              time: booking.bookingTime
            },
            guestDetails: {
              guestID: booking.guest._id,
              name: `${booking.guest.firstName} ${booking.guest.lastName}`,
              roomNo: 'N/A', // Room number not available in the API response
              mobileNumber: 'N/A', // Mobile number not available in the API response
              email: 'N/A' // Email not available in the API response
            },
            serviceCategory: booking.spaSalonProduct.productCategory,
            duration: 'N/A', // Duration not available in the API response
            status: booking.status.charAt(0).toUpperCase() + booking.status.slice(1).toLowerCase(),
            assignedTo: 'Unassigned' // Assigned staff not available in the API response
          }));

          setData(mappedData);
          setFilteredData(mappedData);
          setTotalRecords(mappedData.length);
        }
      } catch (err: any) {
        console.error('Error fetching spa bookings:', err);
        setError(err.message || 'Failed to fetch spa bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(totalRecords / limit)) {
      setPageNo(newPage);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isManageProductsModalOpen, setIsManageProductsModalOpen] = useState(false);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPageNo(1);
  };

  const handleSearchChange = (searchValue: string) => {
    if (searchValue.trim() === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.guestDetails.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };
  return (
    <>
      <div className="w-full pt-20 flex items-center gap-2 justify-end px-4 py-2 bg-white">
        <div className="flex w-full justify-between items-center">
          <h2 className="text-coffee text-xl font-bold">Spa/Salon</h2>
          <div className="flex items-center gap-2">
            <h2 className="text-[0.8rem] font-semibold">
              AUTO ACCEPT REQUESTS
            </h2>
            <ToggleButton />
          </div>
        </div>
        <Settings className='cursor-pointer' onClick={() => setIsModalOpen(true)} />
        <PriceTimeSettingSpa
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
