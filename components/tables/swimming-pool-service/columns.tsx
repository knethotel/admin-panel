


import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';

export type SwimmingpoolServiceDataType = {
  requestID: string;
  poolID: string;
  uniqueId: string;
  requestDetail: string;
  responseDetail: string;
  requestAssignedTo: string;

  requestTime: {
    date: string;
    time: string;
  };
  amount: {
    subtotal: number;
    discount: number;
    finalAmount: number;
  };


  guestDetails: {
    guestID: string;
    name: string;
    roomNo: string;
    phoneNumber: string;
    email: string;
  };

  requestType: string;
  status: string;
  assignedTo: string;
  requestedTimeSlot: string;
  effectiveCost: string;
  paymentStatus: string;
  rulesAndRegulations: string;

  // Newly added fields
  hotelId: string;
  bookingDate: string;
  paymentDate: string;
  createdAt: string;
  updatedAt: string;
  additionalServicesSelected: string[];
};


export const columns: ColumnDef<SwimmingpoolServiceDataType>[] = [
  {
    accessorKey: 'uniqueId',
    header: 'Request ID',
    cell: ({ row }) => (
      <div className="text-sm font-medium text-gray-900">{row.original.uniqueId}</div>
    ),
  },
  {
    accessorKey: 'requestTime',
    header: 'Request Time',
    cell: ({ row }) => {
      const { date, time } = row.original.requestTime;
      return (
        <div className="flex flex-col gap-[2px] text-xs text-gray-700">
          <span>{date}</span>
          <span>{time}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'guestDetails',
    header: 'Guest Details',
    cell: ({ row }) => {
      const guest = row.original.guestDetails;
      return (
        <div className="flex flex-col gap-[1px] text-xs text-gray-800">
          <span className="font-medium text-gray-900">{guest.name}</span>
          <span>Room: {guest.roomNo}</span>
          <span>Phone: {guest.phoneNumber}</span>
          <span>Email: {guest.email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'requestDetail',
    header: 'Request Detail',
    cell: ({ row }) => (
      <div className="text-sm text-gray-800">{row.original.requestDetail || '-'}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const colorMap: Record<string, string> = {
        Pending: '#3787E3',
        'In-Progress': '#FC690E',
        Completed: '#78B150',
      };
      return (
        <span className="text-sm font-medium" style={{ color: colorMap[status] || '#6B7280' }}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Payment Status',
    cell: ({ row }) => (
      <div className="text-sm">{row.original.paymentStatus || 'Unpaid'}</div>
    ),
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
    accessorKey: 'bookingDate',
    header: 'Booking Date',
    cell: ({ row }) => (
      <div className="text-sm">{row.original.bookingDate}</div>
    ),
  },
  {
    accessorKey: 'paymentDate',
    header: 'Payment Date',
    cell: ({ row }) => (
      <div className="text-sm">{row.original.paymentDate}</div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => (
      <div className="text-xs">{row.original.createdAt}</div>
    ),
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => (
      <div className="text-xs">{row.original.updatedAt}</div>
    ),
  },
  {
    accessorKey: 'additionalServicesSelected',
    header: 'Add-on Services',
    cell: ({ row }) => (
      <ul className="text-xs list-disc list-inside text-gray-700">
        {row.original.additionalServicesSelected?.length > 0
          ? row.original.additionalServicesSelected.map((service, idx) => (
            <li key={idx}>{service}</li>
          ))
          : 'None'}
      </ul>
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

