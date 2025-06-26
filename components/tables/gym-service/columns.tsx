

import { ColumnDef } from '@tanstack/react-table';
import { GymServiceDataType } from 'app/static/services-management/Gym';
import CellAction from './cell-action';

export const columns: ColumnDef<GymServiceDataType>[] = [
  {
    accessorKey: 'requestID',
    header: 'Request ID'
  },
  {
    accessorKey: 'requestTime',
    header: 'Request Time',
    cell: ({ row }) => {
      const { date, time } = row.original.requestTime;
      return (
        <div className="flex flex-col justify-center">
          <p className="text-xs 2xl:text-sm opacity-50">{date}</p>
          <p className="text-xs 2xl:text-sm opacity-50">{time}</p>
        </div>
      );
    }
  },
  {
    accessorKey: 'guestDetails',
    header: 'Guest Details',
    cell: ({ row }) => {
      const details = row.original.guestDetails;
      return (
        <div className="flex justify-center items-center">
          <div className="flex flex-col w-1/2 justify-center items-start gap-1">
            <p className="text-sm text-gray-900">{details.name || 'N/A'}</p>
            <p>{details.roomNo || 'N/A'}</p>
            <p>{details.phoneNumber || 'N/A'}</p>
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: 'facilityType',
    header: 'Facility',
    cell: ({ row }) => <div className="text-sm">{row.original.facilityType}</div>
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const color =
        status === 'pending'
          ? 'text-yellow-600'
          : status === 'completed'
            ? 'text-green-600'
            : 'text-blue-600';
      return <div className={`text-sm font-medium ${color}`}>{status}</div>;
    }
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Payment',
    cell: ({ row }) => <div className="text-sm">{row.original.paymentStatus}</div>
  },
  {
    accessorKey: 'paymentDate',
    header: 'Payment Date',
    cell: ({ row }) => <div className="text-xs opacity-70">{row.original.paymentDate}</div>
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => <div className="text-xs opacity-70">{row.original.createdAt}</div>
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => <div className="text-xs opacity-70">{row.original.updatedAt}</div>
  },
  {
    accessorKey: 'slot',
    header: 'Slot Details',
    cell: ({ row }) => {
      const slot = row.original.slot;
      return (
        <div className="text-xs leading-5 text-gray-700">
          <p><span className="font-medium text-gray-800">Day:</span> {slot?.dayOfWeek || 'N/A'}</p>
          <p>
            <span className="font-medium text-gray-800">Time:</span> {slot?.startTime || '--'} - {slot?.endTime || '--'}
          </p>
          <p><span className="font-medium text-gray-800">Price:</span> ₹{slot?.price ?? 0}</p>
          <p>
            <span className="font-medium text-gray-800">Capacity:</span> {slot?.currentCapacity ?? 0}/{slot?.maxCapacity ?? 0}
          </p>
        </div>
      );
    }
  },
  {
    accessorKey: 'actions',
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <CellAction data={row.original} />
      </div>
    )
  }
];
