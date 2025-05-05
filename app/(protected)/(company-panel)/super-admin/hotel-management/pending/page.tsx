'use client';

import { Eye } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { Heading } from '@/components/ui/heading';

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
  const pendingData: PendingRequest[] = [
    {
      id: '1',
      hotelName: 'Namaste village',
      mobileNumber: '010-026-6724',
      email: 'Namaste_Village@gmail.com',
      address: 'JAIPUR',
      status: 'PENDING'
    },
    {
      id: '2',
      hotelName: 'Namaste village',
      mobileNumber: '010-026-6724',
      email: 'Namaste_Village@gmail.com',
      address: 'JAIPUR',
      status: 'PENDING'
    }
  ];

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
            className="p-2 rounded-md bg-[#F6EEE0] hover:bg-[#e6dcc4]"
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
      <div className="w-full min-h-screen pt-8 mt-14">
        <div className="container mx-auto">
          <Heading title='Pending Hotel Requests'/>
          <DataTable
            columns={pendingColumns}
            data={pendingData}
            searchKey="hotelName"
          />
        </div>
      </div>
    </div>
  );
}
