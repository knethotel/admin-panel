import { ColumnDef } from '@tanstack/react-table';
import { SwimmingpoolServiceDataType } from 'app/static/services-management/SwimmingPool';
// Updated columns to match
export const columns: ColumnDef<SwimmingpoolServiceDataType>[] = [
  {
    accessorKey: 'requestID',
    header: 'Request ID'
  },
  {
    accessorKey: 'requestTime',
    header: 'Request Time'
  },
  {
    accessorKey: 'guestDetails',
    header: 'Guest Details',
    cell: ({ row }) => {
      const details = row.original.guestDetails;
      return (
        <div className="flex flex-col justify-center">
          <p className="text-start pl-5 text-sm opacity-50">{details.name}</p>
          <p className="text-start pl-5 text-xs opacity-50">
            {details.guestID}
          </p>
          <p className="text-start pl-5 text-xs opacity-50">{details.roomNo}</p>
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
      switch (status) {
        case 'Pending':
          return <div className="text-sm text-[#3787E3]">{status}</div>;
        case 'In-Progress':
          return <div className="text-sm text-[#FC690E]">{status}</div>;
        case 'Completed':
          return <div className="text-sm text-[#78B150]">{status}</div>;
        default:
          return <div className="text-sm text-gray-500">{status}</div>;
      }
    }
  },
  {
    accessorKey: 'assignedTo',
    header: 'Assigned to',
    cell: ({ row }) => {
      const assignedTo = row.original.assignedTo;
      return <div className="text-sm">{assignedTo}</div>;
    }
  }
];
