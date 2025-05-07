'use client';

import { Eye, Trash } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { Heading } from '@/components/ui/heading';

type GuestRequest = {
  id: string;
  guestId: string;
  checkIn: string;
  checkOut: string;
  guestDetails: string;
  contactDetails: string;
  status: string;
};

export default function GuestPendingPage() {
  const router = useRouter();
  const pendingData: GuestRequest[] = [
    {
      id: '1',
      guestId: 'GD17823450',
      checkIn: '10-02-2025 1:00AM',
      checkOut: '13-02-2025 00:00',
      guestDetails: 'MR. TIMOTHY CHALAMATE\n01953268\n501',
      contactDetails: 'Muskanshah@gmail.com\n6203770138',
      status: 'Under Review'
    },
    {
      id: '2',
      guestId: 'GD17823450',
      checkIn: '10-02-2025 1:00AM',
      checkOut: '13-02-2025 10:00AM',
      guestDetails: 'MR. TIMOTHY CHALAMATE\n01953268\n501',
      contactDetails: 'Muskanshah@gmail.com\n6203770138',
      status: 'Under Review'
    }
  ];

  const pendingColumns: ColumnDef<GuestRequest>[] = [
    {
      accessorKey: 'guestId',
      header: 'Guest ID',
      cell: ({ row }) => <span>{row.getValue('guestId')}</span>
    },
    {
      id: 'checkInOut',
      header: 'check-in & check-out Details',
      cell: ({ row }) => (
        <div className="whitespace-pre-line">
          {`${row.original.checkIn}\n${row.original.checkOut}`}
        </div>
      )
    },
    {
      accessorKey: 'guestDetails',
      header: 'Guest Details',
      cell: ({ row }) => (
        <div className="whitespace-pre-line text-left">
          {row.getValue('guestDetails')}
        </div>
      )
    },
    {
      accessorKey: 'contactDetails',
      header: 'Contact Details',
      cell: ({ row }) => (
        <div className="whitespace-pre-line text-left">
          {row.getValue('contactDetails')}
        </div>
      )
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className="text-orange-600">{row.getValue('status')}</span>
      )
    },
    {
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <button
            className="p-2 rounded-md bg-[#F6EEE0] hover:bg-[#e6dcc4]"
            onClick={() =>
              router.push(`/guest-management/pending/view/${row.original.id}`)
            }
          >
            <Eye className="h-4 w-4 text-black" />
          </button>
          <button
            // onClick={() => setOpen(true)}
            className="p-1 rounded-md group hover:bg-[#a07d3d5e]"
          >
            <Trash className=" w-4 text-button-dark group-hover:text-white" />
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
          <Heading
            title="Pending Pre-CheckIn Requests"
            className="mb-2 md:px-4"
          />
          <DataTable
            columns={pendingColumns}
            data={pendingData}
            searchKey="guestId"
          />
        </div>
      </div>
    </div>
  );
}
