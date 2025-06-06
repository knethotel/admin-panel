import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';
import { SubHotelDataType } from 'app/static/company-panel/SubHotelManagement';

// Update type to match guestDataType for better type safety
export const columns: ColumnDef<SubHotelDataType>[] = [
  {
    accessorKey: 'hotelID',
    header: 'Hotel ID'
  },
  {
    accessorKey: 'parentHotel',
    header: 'Parent Hotel'
  },
  {
    accessorKey: 'hotelName',
    header: 'Hotel Name'
  },
  {
    accessorKey: 'mobileNo',
    header: 'Mobile No.',
    cell: ({ row }) => {
      return <span>+91-{row.original.mobileNo}</span>;
    }
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'subscriptionDetails',
    header: 'Subscription Details',
    cell: ({ row }) => {
      const details = row.original.subscriptionDetails;
      return (
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-start">
            <span>{details.planName}</span>
            <span className="opacity-60">INR-{details.cost}/month</span>
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      let statusElement;
      switch (status) {
        case 'ACTIVE':
          statusElement = <span className="text-success">{status}</span>;
          break;
        case 'INACTIVE':
          statusElement = <span className="text-danger">{status}</span>;
        default:
          statusElement = <span className="text-gray-500">{status}</span>;
          break;
      }
      return statusElement;
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
