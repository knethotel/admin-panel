import { ColumnDef } from '@tanstack/react-table';
import { InRoomDiningDataType } from 'app/static/services-management/InRoomDining';
// Updated columns to match
export const columns: ColumnDef<InRoomDiningDataType>[] = [
  {
    accessorKey: 'orderID',
    header: 'Order ID'
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
            <p className="text-sm text-gray-900">{details.name}</p>
            <p className="text-xs text-gray-600">{details.guestID}</p>
            <p className="text-xs text-gray-600">{details.roomNo}</p>
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: 'serviceID',
    header: 'Service ID'
  },
  {
    accessorKey: 'orderStatus',
    header: 'Order Status',
    cell: ({ row }) => {
      const status = row.original.orderStatus;
      switch (status) {
        case 'Order in Transit':
          return <div className="text-sm text-[#3787E3]">{status}</div>;
        case 'Order is Preparing':
          return <div className="text-sm text-[#FC690E]">{status}</div>;
        case 'Order is Picked up':
          return <div className="text-sm text-[#FC690E]">{status}</div>;
        case 'Order placed':
          return <div className="text-sm text-[#78B150]">{status}</div>;
        case 'Undelivered':
          return <div className="text-sm text-[#FB1218]">{status}</div>;
        case 'Order Delivered':
          return <div className="text-sm text-[#3787E3]">{status}</div>;
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
