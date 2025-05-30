import { ColumnDef } from '@tanstack/react-table';
import { GymServiceDataType } from 'app/static/services-management/Gym';
import CellAction from './cell-action';

export const columns: ColumnDef<GymServiceDataType>[] = [
  {
    accessorKey: 'requestID',
    header: 'Request ID',
    cell: ({ row }) => {
      const id = row.original.requestID;
      return <div className="text-sm">{id}</div>;
    }
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
            <p className="text-xs text-gray-600">{details.guestID || 'N/A'}</p>
            <p className="text-xs text-gray-600">{details.roomNo || 'N/A'}</p>
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: 'requestType',
    header: 'Request Type',
    cell: ({ row }) => {
      const type = row.original.requestType;
      return <div className="text-sm">{type}</div>;
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
          case 'pending':
            return 'text-[#3787E3]';
          case 'in-progress':
            return 'text-[#FC690E]';
          case 'completed':
            return 'text-[#78B150]';
          default:
            return 'text-gray-500';
        }
      };
      return <div className={`text-sm ${getStatusColor(status)}`}>{status}</div>;
    }
  },
  {
    accessorKey: 'assignedTo',
    header: 'Assigned to',
    cell: ({ row }) => {
      const assignedTo = row.original.assignedTo;
      return <div className="text-sm">{assignedTo}</div>;
    }
  },
  {
    accessorKey: 'actions',
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <CellAction data={row.original} />
      </div>
    )
  }
];
