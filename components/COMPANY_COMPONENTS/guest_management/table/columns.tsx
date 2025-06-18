// import { ColumnDef } from '@tanstack/react-table';
// import CellAction from './cell-action';
// import { GuestDetailsDataType } from 'app/static/company-panel/GuestManagement';

// // Update type to match guestDataType for better type safety
// export const columns: ColumnDef<GuestDetailsDataType>[] = [
//   {
//     accessorKey: 'guestID',
//     header: 'Guest ID'
//   },
//   {
//     accessorKey: 'hotelName',
//     header: 'Hotel Name'
//   },
//   {
//     accessorKey: 'guestName',
//     header: 'Guest Name'
//   },
//   {
//     accessorKey: 'mobileNo',
//     header: 'Contact Details',
//     cell: ({ row }) => {
//       return <span>+91-{row.original.mobileNo}</span>;
//     }
//   },
//   {
//     accessorKey: 'roomCategory',
//     header: 'Room Category'
//   },
//   {
//     accessorKey: 'checkInDetails',
//     header: 'Check-In Details',
//     cell: ({ row }) => {
//       const details = row.original.checkInDetails;
//       return (
//         <div className="flex flex-row items-start justify-center text-xs 2xl:text-sm text-success">
//           <span>{details.date}</span>
//           <span>{details.time}</span>
//         </div>
//       );
//     }
//   },
//   {
//     accessorKey: 'checkOutDetails',
//     header: 'Check-Out Details',
//     cell: ({ row }) => {
//       const details = row.original.checkOutDetails;
//       return (
//         <div className="flex flex-row items-start justify-center text-xs 2xl:text-sm text-warning">
//           <span>{details.date}</span>
//           <span>{details.time}</span>
//         </div>
//       );
//     }
//   },
//   {
//     accessorKey: 'actions',
//     id: 'actions',
//     header: 'Actions',
//     cell: ({ row }) => (
//       <div className="flex items-center justify-center">
//         <CellAction data={row.original} />
//       </div>
//     )
//   }
// ];


import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';

export interface GuestDetailsDataType {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  assignedRoomNumber: string;
  checkIn: string;
  checkOut: string;
  paymentStatus: string;
  status: string;
  sources?: string;
  HotelId?: string;
  email?: string;
  guestsCount?: number;
  createdAt?: string;
}


const formatDateTime = (isoString: string) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
};

export const columns: ColumnDef<GuestDetailsDataType>[] = [
  {
    accessorKey: '_id',
    header: 'Booking ID',
  },
  {
    accessorKey: 'firstName',
    header: 'Guest Name',
    cell: ({ row }) => {
      const { firstName, lastName } = row.original;
      return <span>{`${firstName} ${lastName}`}</span>;
    },
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Contact',
    cell: ({ row }) => <span>+91-{row.original.phoneNumber}</span>,
  },
  {
    accessorKey: 'assignedRoomNumber',
    header: 'Room',
  },
  {
    accessorKey: 'checkIn',
    header: 'Check-In',
    cell: ({ row }) => (
      <div className="text-success text-xs 2xl:text-sm">
        {formatDateTime(row.original.checkIn)}
      </div>
    ),
  },
  {
    accessorKey: 'checkOut',
    header: 'Check-Out',
    cell: ({ row }) => (
      <div className="text-warning text-xs 2xl:text-sm">
        {formatDateTime(row.original.checkOut)}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Booking Status',
    cell: ({ row }) => (
      <span className="capitalize font-medium">
        {row.original.status ?? 'N/A'}
      </span>
    ),
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Payment',
    cell: ({ row }) => (
      <span className="capitalize text-sm font-medium">
        {row.original.paymentStatus ?? 'Pending'}
      </span>
    ),
  },
  {
    accessorKey: 'actions',
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <CellAction data={row.original} />
      </div>
    ),
  },
];
