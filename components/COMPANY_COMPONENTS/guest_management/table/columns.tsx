import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';
import { GuestDetailsDataType } from 'app/static/company-panel/GuestManagement';

// Update type to match guestDataType for better type safety
export const columns: ColumnDef<GuestDetailsDataType>[] = [
  {
    accessorKey: 'guestID',
    header: 'Guest ID'
  },
  {
    accessorKey: 'hotelName',
    header: 'Hotel Name'
  },
  {
    accessorKey: 'guestName',
    header: 'Guest Name'
  },
  {
    accessorKey: 'moblieNo',
    header: 'Contact Details'
  },
  {
    accessorKey: 'roomCategory',
    header: 'Room Category'
  },
  {
    accessorKey: 'checkInDetails',
    header: 'Check-In Details',
    cell: ({ row }) => {
      const details = row.original.checkInDetails;
      return (
        <div className="flex flex-row items-start justify-center text-xs text-success">
          <span>{details.date}</span>
          <span>{details.time}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'checkOutDetails',
    header: 'Check-Out Details',
    cell: ({ row }) => {
      const details = row.original.checkOutDetails;
      return (
        <div className="flex flex-row items-start justify-center text-xs text-warning">
          <span>{details.date}</span>
          <span>{details.time}</span>
        </div>
      );
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
