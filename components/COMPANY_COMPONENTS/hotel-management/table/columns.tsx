import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';
import { HotelDataType } from 'app/static/company-panel/HotelManagement';

// Update type to match guestDataType for better type safety
export const columns: ColumnDef<HotelDataType>[] = [
  {
    accessorKey: 'serviceID',
    header: 'Hotel ID'
  },
  {
    accessorKey: 'hotelName',
    header: 'Hotel Name'
  },
  {
    accessorKey: 'mobileNo',
    header: 'Mobile No.',
    cell: ({ row }) => {
      return <span>{row.original.mobileNo}</span>;
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
            <span>{details.subscriptionPlan}</span>
            <span>
              {new Date(details.subscriptionEndDate).toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
            </span>

            <span className="opacity-60">INR-{details.subscriptionPrice}/month</span>
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
