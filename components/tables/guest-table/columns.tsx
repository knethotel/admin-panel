import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';
import { GuestDataType } from 'app/static/GuestData';

// Update type to match guestDataType for better type safety
export const columns: ColumnDef<GuestDataType>[] = [
  {
    accessorKey: 'guestId',
    header: 'Guest ID'
  },
  {
    accessorKey: 'checkInCheckOutDetails',
    header: 'Check-In & Check-Out Details',
    cell: ({ row }) => {
      const details = row.original.checkInCheckOutDetails;
      return (
        <div>
          {details.checkInDate} {details.checkInTime} - {details.checkOutDate}{' '}
          {details.CheckOutTime}
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
        <div>
          {details.name}, Room {details.roomNo}
        </div>
      );
    }
  },
  {
    accessorKey: 'contactDetails',
    header: 'Contact Details',
    cell: ({ row }) => {
      const details = row.original.contactDetails;
      return (
        <div>
          {details.email} / {details.mobileNo}
        </div>
      );
    }
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Payment Status',
    cell: ({ row }) => {
      const status = row.original.paymentStatus || 'N/A';
      switch (status) {
        case 'pending':
          return <div className="text-blue-500">{status}</div>;
        case 'paid':
          return <div className="text-green-500">{status}</div>;
        default:
          return <div className="text-gray-500">{status}</div>;
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

// Assuming guestDataType is imported or defined elsewhere
type TrackingStatusType = 'underReview' | 'pending' | 'submitted';
type PaymentStatusType = 'pending' | 'paid';

type guestDataType = {
  guestId: string;
  checkInCheckOutDetails: {
    checkInDate: string;
    checkInTime: string;
    CheckOutTime: string;
    checkOutDate: string;
  };
  guestDetails: {
    name: string;
    phoneNo: string;
    roomNo: string;
  };
  contactDetails: {
    email: string;
    mobileNo: string;
  };
  trackingStatus: TrackingStatusType;
  paymentStatus: PaymentStatusType;
};
