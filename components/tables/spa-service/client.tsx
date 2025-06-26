
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
            serviceID: item._id || 'N/A',
            uniqueId: item.uniqueId || '',

            guestDetails: {
              guestID: item.guest?._id || 'N/A',
              name: `${item.guest?.firstName || ''} ${item.guest?.lastName || ''}`.trim(),
              phoneNumber: item.guest?.phoneNumber || 'N/A',
              roomNo: item.guest?.assignedRoomNumber || 'N/A',
            },

            serviceType: item.spaSalonProduct?.serviceType || 'N/A',
            productName: item.spaSalonProduct?.productName || 'N/A',
            productCategory: item.spaSalonProduct?.productCategory || 'N/A',
            spaSalonProductID: typeof item.spaSalonProduct === 'string' ? item.spaSalonProduct : item.spaSalonProduct?._id || 'N/A',

            bookingDate: item.bookingDate ? new Date(item.bookingDate).toLocaleDateString() : 'N/A',
            bookingTime: item.bookingTime || 'N/A',
            requestTime: item.requestTime ? new Date(item.requestTime).toLocaleString() : 'N/A',

            status: item.status || 'N/A',
            paymentStatus: item.paymentStatus || 'N/A',
            paymentDate: item.paymentDate ? new Date(item.paymentDate).toLocaleString() : 'N/A',

            description: item.description || item.notes || '-',

            assignedTo: item.assignedTo
              ? `${item.assignedTo.firstName || ''} ${item.assignedTo.lastName || ''}`.trim()
              : 'Unassigned',

            estimatedDeliveryTime: item.estimatedDeliveryTime
              ? new Date(item.estimatedDeliveryTime).toLocaleString()
              : '',

            amount: {
              subtotal: item.amount?.subtotal || 0,
              discount: item.amount?.discount || 0,
              finalAmount: item.amount?.finalAmount || 0,
            },

            additionalServicesSelected: item.additionalServicesSelected || [],

            transaction: item.transaction || 'N/A',
            HotelId: item.HotelId || 'N/A',
            createdAt: item.createdAt ? new Date(item.createdAt).toLocaleString() : 'N/A',
            updatedAt: item.updatedAt ? new Date(item.updatedAt).toLocaleString() : 'N/A',
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
          data={filteredData}
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
