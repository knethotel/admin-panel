

import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';
import { format, parseISO } from 'date-fns';

export interface GuestDataType {
  guestId: string;
  _id: string;
  checkInDate: string;
  checkInTime: string;
  checkOutDate: string;
  checkOutTime: string;
  guestName: string;
  roomNo: string;
  assignedRoomNumber?: number;
  paymentMode: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  paymentStatus: 'Pending' | 'Confirmed' | 'Cancelled' | string;
  status: 'Pending' | 'Confirmed' | 'Checked-In' | 'Checked-Out' | 'Cancelled' | string;
}


export const columns: ColumnDef<GuestDataType>[] = [
  {
    accessorKey: 'uniqueId',
    header: 'Guest ID',
  },
  {
    accessorKey: 'checkInDate',
    header: 'Check-In & Check-Out',
    cell: ({ row }) => {
      const {
        checkInDate,
        checkInTime,
        checkOutDate,
        checkOutTime,
      } = row.original;

      const checkIn = checkInDate && checkInTime
        ? parseISO(`${checkInDate}T${checkInTime}`)
        : null;

      const checkOut = checkOutDate && checkOutTime
        ? parseISO(`${checkOutDate}T${checkOutTime}`)
        : null;

      return (
        <div className="flex flex-col text-xs opacity-70 leading-tight">
          <span>
            {checkInDate ? format(checkInDate, 'dd MMM yyyy, hh:mm a') : 'N/A'}
          </span>
          <span className="text-[12px] text-gray-700">
            {checkOutDate ? format(checkOutDate, 'dd MMM yyyy, hh:mm a') : 'N/A'}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: 'guestName',
    header: 'Guest Details',
    cell: ({ row }) => {
      const { firstName, lastName, assignedRoomNumber } = row.original;

      return (
        <div>
          {firstName} {lastName}<br />
          {assignedRoomNumber}
        </div>
      );
    },
  },
  {
    accessorKey: 'email',
    header: 'Contact Info',
    cell: ({ row }) => {
      const { email, phoneNumber } = row.original;
      return (
        <div>
          {email} <br />
          {phoneNumber}
        </div>
      );
    },
  },
  {
    accessorKey: 'paymentMode',
    header: 'Payment Mode',
    cell: ({ row }) => {
      const paymentModeRaw = row.original.paymentMode || 'Unknown';
      const paymentMode = paymentModeRaw.toLowerCase();

      const paymentModeMap: Record<string, { label: string; className: string }> = {
        cash: { label: 'Cash', className: 'text-yellow-500' },
        upi: { label: 'UPI', className: 'text-blue-500' },
        card: { label: 'Card', className: 'text-green-600' },
      };

      const paymentModeData = paymentModeMap[paymentMode] || {
        label: paymentModeRaw,
        className: 'text-gray-400',
      };

      return <span className={paymentModeData.className}>{paymentModeData.label}</span>;
    },
  }
  ,
  {
    accessorKey: 'paymentStatus',
    header: 'Payment Status',
    cell: ({ row }) => {
      const status = row.original.paymentStatus || 'N/A';

      const statusMap: Record<string, string> = {
        pending: 'text-yellow-500',
        paid: 'text-green-500',
      };

      const statusClass = statusMap[status] || 'text-gray-500';

      return <span className={statusClass}>{status}</span>;
    },

  },
  {
    accessorKey: 'status',
    header: 'Booking Status',
    cell: ({ row }) => {
      const statusRaw = row.original.status || 'Unknown';
      const status = statusRaw.toLowerCase();

      const statusMap: Record<string, { label: string; className: string }> = {
        pending: { label: 'Pending', className: 'text-yellow-500' },
        confirmed: { label: 'Confirmed', className: 'text-green-600' },
        'checked-in': { label: 'Checked-In', className: 'text-blue-500' },
        'checked-out': { label: 'Checked-Out', className: 'text-indigo-500' },
        cancelled: { label: 'Cancelled', className: 'text-red-500' },
      };

      const statusData = statusMap[status] || {
        label: statusRaw,
        className: 'text-gray-400',
      };

      return <span className={statusData.className}>{statusData.label}</span>;
    },
  },

  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <CellAction data={row.original} />
      </div>
    ),
  },
];
