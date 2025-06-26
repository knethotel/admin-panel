// import { ColumnDef } from '@tanstack/react-table';
// import CellAction from './cell-action';
// import { ReceptionDataType } from 'app/static/services-management/Reception';

// export const columns = (): ColumnDef<ReceptionDataType>[] => [
//   {
//     accessorKey: 'uniqueId',
//     header: 'Request ID'
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
//       const details = row.original.guestDetails;
//       return (
//         <div className="flex justify-center items-center">
//           <div className="flex flex-col w-1/2 justify-center items-start gap-1">
//             <p className="text-sm text-gray-900">{details.name}</p>
//             <p className="text-xs text-gray-600">{details.guestID}</p>
//             <p className="text-xs text-gray-600">{details.roomNo}</p>
//           </div>
//         </div>
//       );
//     }
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
//       return <div className="text-sm">{assignedTo}</div>;
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
import { ReceptionDataType } from 'app/static/services-management/Reception';

export const columns = (): ColumnDef<ReceptionDataType>[] => [
  {
    accessorKey: 'orderID',
    header: 'Request ID'
  },
  {
    accessorKey: 'requestTime',
    header: 'Request Time',
    cell: ({ row }) => {
      const { date, time } = row.original.requestTime || {};
      return (
        <div className="flex flex-col text-xs opacity-50">
          <p>{date || 'N/A'}</p>
          <p>{time || 'N/A'}</p>
        </div>
      );
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const { date, time } = row.original.createdAt || {};
      return (
        <div className="flex flex-col text-xs opacity-50">
          <p>{date || 'N/A'}</p>
          <p>{time || 'N/A'}</p>
        </div>
      );
    }
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => {
      const { date, time } = row.original.updatedAt || {};
      return (
        <div className="flex flex-col text-xs opacity-50">
          <p>{date || 'N/A'}</p>
          <p>{time || 'N/A'}</p>
        </div>
      );
    }
  },
  {
    accessorKey: 'guestDetails',
    header: 'Guest Details',
    cell: ({ row }) => {
      const details = row.original.guestDetails || {};
      return (
        <div className="flex flex-col text-xs gap-1 text-gray-600">
          <p className="text-sm text-gray-900">{details.name || 'N/A'}</p>
          <p>{details.roomNo || 'N/A'}</p>
          <p>{details.phoneNumber || 'N/A'}</p>
        </div>
      );
    }
  },
  {
    accessorKey: 'requestType',
    header: 'Request Type',
    cell: ({ row }) => {
      return <div className="text-sm">{row.original.requestType || 'N/A'}</div>;
    }
  },
  {
    accessorKey: 'wakeUpTime',
    header: 'Wake-up Time',
    cell: ({ row }) => {
      return <div className="text-sm">{row.original.wakeUpTime || 'N/A'}</div>;
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const baseClass = 'text-sm';
      switch (status) {
        case 'Pending':
          return <div className={`${baseClass} text-[#3787E3]`}>{status}</div>;
        case 'In-Progress':
          return <div className={`${baseClass} text-[#FC690E]`}>{status}</div>;
        case 'Completed':
          return <div className={`${baseClass} text-[#78B150]`}>{status}</div>;
        default:
          return <div className={`${baseClass} text-gray-500`}>{status || 'N/A'}</div>;
      }
    }
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Payment Status',
    cell: ({ row }) => {
      return <div className="text-sm">{row.original.paymentStatus || 'N/A'}</div>;
    }
  },
  {
    accessorKey: 'assignedTo',
    header: 'Assigned To',
    cell: ({ row }) => {
      return <div className="text-sm">{row.original.assignedTo || 'N/A'}</div>;
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
