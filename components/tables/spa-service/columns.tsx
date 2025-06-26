

import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';

export type SpaServiceDataType = {
  serviceID: string;
  uniqueId: string;

  guestDetails: {
    guestID: string;
    name: string;
    roomNo: string;
    phoneNumber: string;
  };

  serviceType: string;
  productCategory: string;
  productName: string;
  spaSalonProductID?: string;

  bookingDate: string;
  bookingTime: string;
  requestTime: string;

  status: string;
  paymentStatus: string;
  paymentDate?: string;

  amount: {
    subtotal: number;
    discount: number;
    finalAmount: number;
  };

  additionalServicesSelected: string[];
  description: string;
  assignedTo: string;
  estimatedDeliveryTime?: string;

  transaction?: string;
  HotelId: string;
  createdAt: string;
  updatedAt: string;
};


export const columns: ColumnDef<SpaServiceDataType>[] = [
  {
    accessorKey: 'uniqueId',
    header: 'Booking ID',
    cell: ({ row }) => (
      <div className="text-sm font-semibold text-gray-800">
        {row.original.uniqueId}
      </div>
    )
  },
  {
    accessorKey: 'guestDetails',
    header: 'Guest',
    cell: ({ row }) => {
      const guest = row.original.guestDetails;
      return (
        <div className="flex flex-col text-xs text-gray-700">
          <span className="text-sm font-medium">{guest.name}</span>
          <span>Room: {guest.roomNo}</span>
          <span>Ph: {guest.phoneNumber}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'bookingDate',
    header: 'Date',
    cell: ({ row }) => <div className="text-sm">{row.original.bookingDate}</div>
  },
  {
    accessorKey: 'bookingTime',
    header: 'Time',
    cell: ({ row }) => <div className="text-sm">{row.original.bookingTime}</div>
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className="text-sm capitalize font-medium text-blue-600">{row.original.status}</div>
    )
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Payment',
    cell: ({ row }) => (
      <div className={`text-sm font-semibold ${row.original.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-500'}`}>
        {row.original.paymentStatus}
      </div>
    )
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const amt = row.original?.amount;
      return amt ? (
        <div className="flex flex-col text-xs">
          <span>Subtotal: ₹{amt.subtotal ?? 0}</span>
          <span>Discount: ₹{amt.discount ?? 0}</span>
          <span>Total: ₹{amt.finalAmount ?? 0}</span>
        </div>
      ) : (
        <span className="text-xs text-gray-500">N/A</span>
      );
    }
  },
  {
    accessorKey: 'description',
    header: 'Note',
    cell: ({ row }) => (
      <div className="text-sm truncate max-w-[150px]">{row.original.description}</div>
    )
  },
  {
    accessorKey: 'assignedTo',
    header: 'Assigned To',
    cell: ({ row }) => (
      <div className="text-sm text-gray-700">{row.original.assignedTo}</div>
    )
  },
  {
    accessorKey: 'estimatedDeliveryTime',
    header: 'ETA',
    cell: ({ row }) => (
      <div className="text-sm text-gray-600">
        {row.original.estimatedDeliveryTime || '—'}
      </div>
    )
  },
  {
    accessorKey: 'paymentDate',
    header: 'Payment Date',
    cell: ({ row }) => (
      <div className="text-xs">
        {row.original.paymentDate ? new Date(row.original.paymentDate).toLocaleString() : 'N/A'}
      </div>
    )
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => (
      <div className="text-xs opacity-60">{row.original.createdAt}</div>
    )
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => (
      <div className="text-xs opacity-60">{row.original.updatedAt}</div>
    )
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <CellAction data={row.original} />
      </div>
    )
  }
];

