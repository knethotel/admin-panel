import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';
import { RefundDataType } from 'app/static/PaymentManagement';

// Update type to match guestDataType for better type safety
export const columns: ColumnDef<RefundDataType>[] = [
  {
    accessorKey: 'refundID',
    header: 'Refund ID'
  },
  {
    accessorKey: 'userID',
    header: 'User ID'
  },
  {
    accessorKey: 'orderID',
    header: 'Order ID'
  },
  {
    accessorKey: 'hotelDetails',
    header: 'Hotel ID',
    cell: ({ row }) => {
      const hotelDetails = row.original.hotelDetails;
      return (
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-start">
            <span className="text-sm">{hotelDetails.hotelID}</span>
            <span className="text-xs opacity-55">{hotelDetails.hotelName}</span>
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: 'amount',
    header: 'Amount'
  },
  {
    accessorKey: 'statusDetails',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.statusDetails.status;
      const processedAt = row.original.statusDetails.processedAt;
      switch (status) {
        case 'INITIATED':
          return (
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-start">
                {' '}
                <span className="text-[#FC690E]">{status}</span>
                <span className="text-xs opacity-70">{processedAt}</span>
              </div>
            </div>
          );
        case 'REJECTED':
          return (
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-start">
                {' '}
                <span className="text-[#E5252A]">{status}</span>
                <span className="text-xs opacity-70">{processedAt}</span>
              </div>
            </div>
          );
        case 'IN-PROGRESS':
          return (
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-start">
                {' '}
                <span className="text-[#3787E3]">{status}</span>
                <span className="text-xs opacity-70">{processedAt}</span>
              </div>
            </div>
          );
        case 'COMPLETED':
          return (
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-start">
                {' '}
                <span className="text-[#78B150]">{status}</span>
                <span className="text-xs opacity-70">{processedAt}</span>
              </div>
            </div>
          );
        default:
          return (
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-start">
                <span className="text-gray-500">{status}</span>
                <span className="text-xs opacity-70">{processedAt}</span>
              </div>
            </div>
          );
      }
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
