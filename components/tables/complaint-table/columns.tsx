import { ColumnDef } from '@tanstack/react-table';
import { ComplaintDataType } from '../../../app/static/ComplaintData'; // Adjust the import path

export const columns: ColumnDef<ComplaintDataType>[] = [
  {
    accessorKey: 'complaintID',
    header: 'Complaint ID'
  },
  {
    accessorKey: 'complaintTime',
    header: 'Date & Time',
    cell: ({ row }) => {
      const { date, time } = row.original.complaintTime;
      return (
        <div>
          {date} {time}
        </div>
      );
    }
  },
  {
    accessorKey: 'guestId',
    header: 'Guest ID'
  },
  {
    accessorKey: 'complaintType',
    header: 'Complaint Type',
    cell: ({ row }) => {
      const type = row.original.complaintType;
      return <div>{type}</div>;
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      switch (status) {
        case 'OPEN':
          return <div className="text-orange-500">{status}</div>;
        case 'CLOSED':
          return <div className="text-green-500">{status}</div>;
        default:
          return <div className="text-gray-500">{status}</div>;
      }
    }
  },
  {
    accessorKey: 'assignedTo',
    header: 'Assigned To',
    cell: ({ row }) => {
      const assigned = row.original.assignedTo;
      return <div>{assigned}</div>;
    }
  }
];
