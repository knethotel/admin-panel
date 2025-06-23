
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import apiCall from '@/lib/axios';

type ModeType = 'add_guest' | 'add_booking';

export const GuestClient: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [mode, setMode] = useState<ModeType>();
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiCall('GET', `api/booking/hotel?page=${pageNo}&limit=${limit}`);
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

  const handleOnClick = async (actionName: string) => {
    if (actionName === 'add booking') {
      setMode('add_guest');
      router.push(`/hotel-panel/guest-management/add`);
    }

    if (actionName === 'view requests') {
      setMode('add_booking');
      try {
        setLoading(true);
        const res = await apiCall('GET', `api/booking/preCheckIns`);
        if (res?.success) {
          const bookings = res.bookings.map((booking: any) => ({
            _id: booking._id,
            guestId: booking.guest,
            uniqueId: booking.uniqueId,
            checkInDate: new Date(booking.checkInDate).toLocaleDateString(),
            checkInTime: new Date(booking.checkInDate).toLocaleTimeString(),
            checkOutDate: new Date(booking.checkOutDate).toLocaleDateString(),
            checkOutTime: new Date(booking.checkOutDate).toLocaleTimeString(),
            guestName: `${booking.firstName} ${booking.lastName}`,
            roomNo: booking.assignedRoomNumber || 'N/A',
            email: booking.email,
            phoneNumber: booking.phoneNumber,
            paymentStatus: booking.paymentStatus || 'N/A',
          }));

          setData(bookings);
          setFilteredData(bookings);
          setTotalRecords(bookings.length);
          setPageNo(1);
        } else {
          setError('Failed to load pre-check-ins');
        }
      } catch (err) {
        console.error('Error loading pre-check-ins:', err);
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    }
  };



  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Guests at Hotel`} />
        <div className="flex gap-3">
          <Button className="btn-primary text-xs 2xl:text-sm md:text-sm" onClick={() => handleOnClick('add booking')}>
            <Plus className="mr-2 h-4 w-4" /> <span>Add Booking</span>
          </Button>
          <Button className="btn-primary text-xs 2xl:text-sm md:text-sm" onClick={() => handleOnClick('view requests')}>
            <span className="text-white group-hover:text-black"> View Requests</span>
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-4">{error}</div>
      ) : (
        <DataTable
          searchKey="firstName"
          columns={columns}
          data={filteredData.slice(0, limit)}
        />
      )}

      <div className="flex justify-end space-x-2 px-3 py-2">
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => handlePageChange(pageNo - 1)} disabled={pageNo === 1}>
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
