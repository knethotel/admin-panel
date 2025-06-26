
import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';

export type ConciergeServiceDataType = {
  requestID: string;
  uniqueId: string;
  requestTime: {
    date: string;
    time: string;
  };
  bookingDate: string;
  createdAt: string;
  updatedAt: string;

  guestDetails: {
    name: string;
    guestID: string;
    roomNo?: string;
    phoneNumber?: string;
  };

  requestType: string;
  status: string;
  assignedTo?: string;

  hotelId: string;
  location?: string;
  transactionID?: string;
  paymentStatus?: string;
  amount?: number;

  actions?: any;
};



export const columns: ColumnDef<ConciergeServiceDataType>[] = [
  {
    accessorKey: 'uniqueId',
    header: 'Request ID',
    cell: ({ row }) => (
      <p className="text-sm text-gray-800">{row.original.uniqueId}</p>
    ),
  },
  {
    accessorKey: 'requestTime',
    header: 'Request Time',
    cell: ({ row }) => {
      const { date, time } = row.original.requestTime;
      return (
        <div className="flex flex-col text-xs text-gray-600">
          <span>{date}</span>
          <span>{time}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'bookingDate',
    header: 'Booking Date',
    cell: ({ row }) => <span className="text-sm">{row.original.bookingDate}</span>,
  },
  {
    accessorKey: 'guestDetails',
    header: 'Guest Details',
    cell: ({ row }) => {
      const { name, guestID, roomNo, phoneNumber } = row.original.guestDetails || {};
      return (
        <div className="flex flex-col text-sm gap-1">
          <p className="font-medium">{name || '-'}</p>
          <p className="text-xs text-gray-600">Room: {roomNo || 'N/A'}</p>
          <p className="text-xs text-gray-600">Ph: {phoneNumber || 'N/A'}</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'requestType',
    header: 'Request Type',
    cell: ({ row }) => (
      <span className="text-sm">{row.original.requestType || '-'}</span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColorMap: Record<string, string> = {
        Pending: '#3787E3',
        'In-Progress': '#FC690E',
        Completed: '#78B150',
      };
      const color = statusColorMap[status] || '#6B7280';
      return (
        <span className="text-sm font-medium" style={{ color }}>
          {status || '-'}
        </span>
      );
    },
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Payment',
    cell: ({ row }) => (
      <span className="text-sm">{row.original.paymentStatus || '-'}</span>
    ),
  },
  {
    accessorKey: 'assignedTo',
    header: 'Assigned To',
    cell: ({ row }) => (
      <span className="text-sm">{row.original.assignedTo || 'Unassigned'}</span>
    ),
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => (
      <span className="text-sm">{row.original.location || '-'}</span>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => (
      <span className="text-xs text-gray-500">{row.original.createdAt}</span>
    ),
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => (
      <span className="text-xs text-gray-500">{row.original.updatedAt}</span>
    ),
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