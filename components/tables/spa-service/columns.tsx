

// import { ColumnDef } from '@tanstack/react-table';
// import CellAction from './cell-action';

// // Define the SpaServiceDataType
// export type SpaServiceDataType = {
//   uniqueId: string;
//   serviceID: string;
//   requestType: string;
//   requestDetail: string;
//   responseDetail: string;
//   requestAssignedTo: string;
//   requestTime: {
//     date: string;
//     time: string;
//   };
//   guestDetails: {
//     guestID: string;
//     name: string;
//     roomNo: string;
//     mobileNumber: string;
//     email: string;
//   };
//   serviceCategory: string;
//   duration: string;
//   status: string;
//   assignedTo: string;
// };

// // Define columns for the table
// export const columns: ColumnDef<SpaServiceDataType>[] = [
//   {
//     accessorKey: 'uniqueId',
//     header: 'Unique ID',
//     cell: ({ row }) => {
//       const uniqueId = row.original.uniqueId;
//       return <div className="text-sm text-gray-900">{uniqueId || 'N/A'}</div>
//     }
//   },
//   {
//     accessorKey: 'requestTime',
//     header: 'Request Time',
//     cell: ({ row }) => {
//       const { date, time } = row.original.requestTime;
//       return (
//         <div className="flex justify-center items-center">
//           <div className="flex flex-col w-1/2 justify-center items-start gap-1">
//             <p className="text-xs opacity-50">{date}</p>
//             <p className="text-xs opacity-50">{time}</p>
//           </div>
//         </div>
//       );
//     }
//   },
//   {
//     accessorKey: 'guestDetails',
//     header: 'Guest Details',
//     cell: ({ row }) => {
//       const { name, guestID, roomNo } = row.original.guestDetails;
//       return (
//         <div className="flex justify-center items-center">
//           <div className="flex flex-col w-1/2 justify-center items-start gap-1">
//             <p className="text-sm text-gray-900">{name}</p>
//             <p className="text-xs text-gray-600">{guestID}</p>
//             <p className="text-xs text-gray-600">{roomNo}</p>
//           </div>
//         </div>
//       );
//     }
//   },
//   {
//     accessorKey: 'requestDetail',
//     header: 'Request Details',
//     cell: ({ row }) => <div className="text-sm text-gray-900">{row.original.requestDetail}</div>
//   },
//   {
//     accessorKey: 'requestType',
//     header: 'Request Type',
//     cell: ({ row }) => {
//       const requestType = row.original.requestType;
//       return <div className="text-sm">{requestType || 'N/A'}</div>;
//     }
//   },
//   {
//     accessorKey: 'status',
//     header: 'Status',
//     cell: ({ row }) => {
//       const status = row.original.status;
//       switch (status) {
//         case 'Pending':
//           return <div className="text-sm text-[#3787E3]">{status}</div>;
//         case 'In-Progress':
//           return <div className="text-sm text-[#FC690E]">{status}</div>;
//         case 'Completed':
//           return <div className="text-sm text-[#78B150]">{status}</div>;
//         default:
//           return <div className="text-sm text-gray-500">{status}</div>;
//       }
//     }
//   },
//   {
//     accessorKey: 'assignedTo',
//     header: 'Assigned to',
//     cell: ({ row }) => {
//       const assignedTo = row.original.assignedTo;
//       return <div className="text-sm text-gray-900">{assignedTo || 'Not Assigned'}</div>;
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

export type SpaServiceDataType = {
  serviceID: string;
  guestName: string;
  serviceType: string;
  productCategory: string;
  productName: string;
  bookingDate: string;
  bookingTime: string;
  status: string;
  paymentStatus: string;
  amount: number;
  description: string;
  uniqueId: string;
  assignedTo: string;
  estimatedDeliveryTime?: string;
};


export const columns: ColumnDef<SpaServiceDataType>[] = [
  {
    accessorKey: 'uniqueId',
    header: 'Booking ID',
    cell: ({ row }) => (
      <div className="text-sm font-semibold text-gray-800">
        {row.original.uniqueId}
      </div>
    )
  },
  {
    accessorKey: 'guestName',
    header: 'Guest Name',
    cell: ({ row }) => (
      <div className="text-sm text-gray-900">{row.original.guestName}</div>
    )
  },
  {
    accessorKey: 'productName',
    header: 'Product',
    cell: ({ row }) => (
      <div className="text-sm">{row.original.productName}</div>
    )
  },
  {
    accessorKey: 'productCategory',
    header: 'Category',
    cell: ({ row }) => (
      <div className="text-sm text-gray-700">{row.original.productCategory}</div>
    )
  },
  {
    accessorKey: 'serviceType',
    header: 'Service Type',
    cell: ({ row }) => (
      <div className="text-sm text-gray-600">{row.original.serviceType}</div>
    )
  },
  {
    accessorKey: 'bookingDate',
    header: 'Date',
    cell: ({ row }) => (
      <div className="text-sm">{row.original.bookingDate}</div>
    )
  },
  {
    accessorKey: 'bookingTime',
    header: 'Time',
    cell: ({ row }) => (
      <div className="text-sm">{row.original.bookingTime}</div>
    )
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className="text-sm text-blue-700 capitalize">{row.original.status}</div>
    )
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Payment',
    cell: ({ row }) => (
      <div className={`text-sm font-medium ${row.original.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-500'}`}>
        {row.original.paymentStatus}
      </div>
    )
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => (
      <div className="text-sm text-green-700 font-semibold">₹{row.original.amount}</div>
    )
  },
  {
    accessorKey: 'description',
    header: 'Note',
    cell: ({ row }) => (
      <div className="text-sm truncate max-w-[150px]">{row.original.description}</div>
    )
  },
  {
    accessorKey: 'assignedTo',
    header: 'Assigned To',
    cell: ({ row }) => (
      <div className="text-sm text-gray-700">{row.original.assignedTo}</div>
    )
  },
  {
    accessorKey: 'estimatedDeliveryTime',
    header: 'ETA',
    cell: ({ row }) => (
      <div className="text-sm text-gray-600">
        {row.original.estimatedDeliveryTime || '—'}
      </div>
    )
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <CellAction data={row.original} />
      </div>
    )
  }
];
