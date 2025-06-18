// import { ColumnDef } from '@tanstack/react-table';
// import CellAction from './cell-action';
// import { GuestDataType } from 'app/static/GuestData';


// // Update type to match guestDataType for better type safety
// export const columns: ColumnDef<GuestDataType>[] = [
//   {
//     accessorKey: 'guestId',
//     header: 'Guest ID'
//   },
//   {
//     accessorKey: 'checkInCheckOutDetails',
//     header: 'Check-In & Check-Out Details',
//     cell: ({ row }) => {
//       const details = row.original.checkInCheckOutDetails;
//       return (
//         <div>
//           {details.checkInDate} {details.checkInTime} - {details.checkOutDate}{' '}
//           {details.CheckOutTime}
//         </div>
//       );
//     }
//   },
//   {
//     accessorKey: 'guestDetails',
//     header: 'Guest Details',
//     cell: ({ row }) => {
//       const details = row.original.guestDetails;
//       return (
//         <div>
//           {details.name}, Room {details.roomNo}
//         </div>
//       );
//     }
//   },
//   {
//     accessorKey: 'contactDetails',
//     header: 'Contact Details',
//     cell: ({ row }) => {
//       const details = row.original.contactDetails;
//       return (
//         <div>
//           {details.email} / {details.mobileNo}
//         </div>
//       );
//     }
//   },
//   {
//     accessorKey: 'paymentStatus',
//     header: 'Payment Status',
//     cell: ({ row }) => {
//       const status = row.original.paymentStatus || 'N/A';
//       switch (status) {
//         case 'pending':
//           return <div className="text-blue-500">{status}</div>;
//         case 'paid':
//           return <div className="text-green-500">{status}</div>;
//         default:
//           return <div className="text-gray-500">{status}</div>;
//       }
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

// // Assuming guestDataType is imported or defined elsewhere
// type TrackingStatusType = 'underReview' | 'pending' | 'submitted';
// type PaymentStatusType = 'pending' | 'paid';

// type guestDataType = {
//   guestId: string;
//   checkInCheckOutDetails: {
//     checkInDate: string;
//     checkInTime: string;
//     CheckOutTime: string;
//     checkOutDate: string;
//   };
//   guestDetails: {
//     name: string;
//     phoneNo: string;
//     roomNo: string;
//   };
//   contactDetails: {
//     email: string;
//     mobileNo: string;
//   };
//   trackingStatus: TrackingStatusType;
//   paymentStatus: PaymentStatusType;
// };


import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';

export interface GuestDataType {
  guestId: string;
  _id: string;

  // Flattened Check-In/Out details
  checkInDate: string;
  checkInTime: string;
  checkOutDate: string;
  checkOutTime: string;

  // Flattened Guest details
  guestName: string;
  roomNo: string;

  // Flattened Contact details
  email: string;
  phoneNumber: string;

  // Payment Status
  paymentStatus: 'pending' | 'paid' | string;
}


export const columns: ColumnDef<GuestDataType>[] = [
  {
    accessorKey: 'uniqueId',
    header: 'Guest ID',
  },
  {
    accessorKey: 'checkInDate',
    header: 'Check-In & Check-Out',
    cell: ({ row }) => {
      const {
        checkInDate,
        checkInTime,
        checkOutDate,
        checkOutTime,
      } = row.original;

      return (
        <div>
          {checkInDate} {checkInTime} - {checkOutDate} {checkOutTime}
        </div>
      );
    },
  },
  {
    accessorKey: 'guestName',
    header: 'Guest Details',
    cell: ({ row }) => {
      const { guestName, roomNo } = row.original;
      return (
        <div>
          {guestName}, Room {roomNo}
        </div>
      );
    },
  },
  {
    accessorKey: 'email',
    header: 'Contact Info',
    cell: ({ row }) => {
      const { email, phoneNumber } = row.original;
      return (
        <div>
          {email} / {phoneNumber}
        </div>
      );
    },
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Payment Status',
    cell: ({ row }) => {
      const status = row.original.paymentStatus || 'N/A';

      const statusMap: Record<string, string> = {
        pending: 'text-yellow-500',
        paid: 'text-green-500',
      };

      const statusClass = statusMap[status] || 'text-gray-500';

      return <span className={statusClass}>{status}</span>;
    },

  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <CellAction data={row.original} />
      </div>
    ),
  },
];
