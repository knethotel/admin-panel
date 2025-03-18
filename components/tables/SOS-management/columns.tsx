import { ColumnDef } from '@tanstack/react-table';
import { SOSManagementDataType } from 'app/static/services-management/SOS';
// Updated columns to match
export const columns: ColumnDef<SOSManagementDataType>[] = [
  {
    accessorKey: 'guestID',
    header: 'Guest ID'
  },
  {
    accessorKey: 'requestTime',
    header: 'Request Time',
    cell: ({ row }) => {
      const { date, time } = row.original.requestTime;
      return (
        <div className="flex flex-col justify-center">
          <p className="text-xs opacity-50">{date}</p>
          <p className="text-xs opacity-50">{time}</p>
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
        <div className="flex flex-col justify-center">
          <p className="text-start pl-5 text-sm opacity-50">{details.name}</p>
          <p className="text-start pl-5 text-xs opacity-50">
            {details.mobileNumber}
          </p>
          <p className="text-start pl-5 text-xs opacity-50">{details.roomNo}</p>
        </div>
      );
    }
  },
  {
    accessorKey: 'emergencyType',
    header: 'Emergency Type',
    cell: ({ row }) => {
      const status = row.original.EmergencyType;
      switch (status) {
        case 'Fire':
          return <div className="text-sm text-[#E5252A]">{status}</div>;
        case 'Medical':
          return <div className="text-sm text-[#3787E3]">{status}</div>;
        default:
          return <div className="text-sm text-gray-500">{status}</div>;
      }
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      switch (status) {
        case 'Pending':
          return <div className="text-sm text-[#FC690E]">{status}</div>;
        case 'Resolved':
          return <div className="text-sm text-[#3787E3]">{status}</div>;
        default:
          return <div className="text-sm text-gray-500">{status}</div>;
      }
    }
  },
  {
    accessorKey: 'assignedTo',
    header: 'Assigned Staff',
    cell: ({ row }) => {
      const assignedTo = row.original.assignedTo;
      return <div className="text-sm">{assignedTo}</div>;
    }
  }
];
