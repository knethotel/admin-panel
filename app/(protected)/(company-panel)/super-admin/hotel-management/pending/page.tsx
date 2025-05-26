'use client';

import { Eye } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { Heading } from '@/components/ui/heading';
import { useEffect, useState } from 'react';
import apiCall from '@/lib/axios';

type PendingRequest = {
  id: string;
  hotelName: string;
  mobileNumber: string;
  email: string;
  address: string;
  status: string;
};

export default function HotelManagementPendingPage() {
  const router = useRouter();
  const [pendingData, setPendingData] = useState<PendingRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiCall<{
          status: string;
          count: number;
          requests: any[];
        }>('GET', 'api/hotel/pending-requests');

        if (response.status === 'success' && Array.isArray(response.requests)) {
          const formattedData: PendingRequest[] = response.requests.map(
            (req) => ({
              id: req._id,
              status: req.status,
              hotelName: req.hotelData?.name || 'N/A',
              mobileNumber: req.hotelData?.phoneNo || 'N/A',
              email: req.hotelData?.email || 'N/A',
              address: req.hotelData?.address || 'N/A'
            })
          );

          setPendingData(formattedData);
        } else {
          setPendingData([]);
          setError('No pending requests found');
        }
      } catch (err) {
        setError('Failed to load pending requests.');
        console.error('API fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPendingRequests();
  }, []);

  const pendingColumns: ColumnDef<PendingRequest>[] = [
    {
      accessorKey: 'hotelName',
      header: 'Hotel name',
      cell: ({ row }) => <span>{row.getValue('hotelName')}</span>
    },
    {
      accessorKey: 'mobileNumber',
      header: 'Mobile Number',
      cell: ({ row }) => <span>{row.getValue('mobileNumber')}</span>
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => (
        <span className="text-gray-600">{row.getValue('email')}</span>
      )
    },
    {
      accessorKey: 'address',
      header: 'Address',
      cell: ({ row }) => (
        <span className=" uppercase">{row.getValue('address')}</span>
      )
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className="text-red-600 ">{row.getValue('status')}</span>
      )
    },
    {
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex justify-center">
          <button
            className="p-2 rounded-md hover:bg-[#e6dcc4]"
            onClick={() =>
              router.push(
                `/super-admin/hotel-management/pending/view/${row.original.id}`
              )
            }
          >
            <Eye className="h-4 w-4 text-black" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col w-full">
      <Navbar active search />
      <div className="w-full min-h-screen pt-8 mt-14 px-0 md:px-6">
        <Heading title="Pending Hotel Requests" />
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <DataTable
            columns={pendingColumns}
            data={pendingData}
            searchKey="hotelName"
          />
        )}
      </div>
    </div>
  );
}
