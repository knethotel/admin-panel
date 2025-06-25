// import { ColumnDef } from '@tanstack/react-table';
// import { ConciergeServiceDataType } from 'app/static/services-management/Concierge';
// import CellAction from './cell-action';
// // Updated columns to match
// export const columns: ColumnDef<ConciergeServiceDataType>[] = [
//   {
//     accessorKey: 'requestID',
//     header: 'Request ID'
//   },
//   {
//     accessorKey: 'requestTime',
//     header: 'Request Time',
//     cell: ({ row }) => {
//       const { date, time } = row.original.requestTime;
//       return (
//         <div className="flex flex-col justify-center">
//           <p className="text-xs 2xl:text-sm opacity-50">{date}</p>
//           <p className="text-xs 2xl:text-sm opacity-50">{time}</p>
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
//       const type = row.original.requestType;
//       return <div className="text-sm">{type}</div>;
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

export type ConciergeServiceDataType = {
  requestID: string;
  uniqueId: string;
  requestTime: {
    date: string;
    time: string;
  };
  guestDetails: {
    name: string;
    guestID: string;
    roomNo?: string;
  };
  requestType: string;
  status: string;
  assignedTo?: string;
  actions?: any;
};


export const columns: ColumnDef<ConciergeServiceDataType>[] = [
  {
    accessorKey: 'uniqueId',
    header: 'Request ID',
    cell: ({ row }) => (
      <p className="text-sm text-gray-800">{row.original.uniqueId}</p>
    ),
  },
  {
    accessorKey: 'requestTime',
    header: 'Request Time',
    cell: ({ row }) => {
      const { date, time } = row.original.requestTime;
      return (
        <div className="flex justify-center items-center">
          <div className="flex flex-col w-1/2 justify-center items-start gap-1">
            <p className="text-xs opacity-50">{date}</p>
            <p className="text-xs opacity-50">{time}</p>
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: 'guestDetails',
    header: 'Guest Details',
    cell: ({ row }) => {
      const { name, guestID, roomNo } = row.original.guestDetails || {};
      return (
        <div className="flex flex-col justify-center gap-1">
          <p className="text-sm text-gray-900">{name || '-'}</p>
          <p className="text-xs text-gray-600">{guestID || '-'}</p>
          <p className="text-xs text-gray-600">{roomNo || 'N/A'}</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'requestType',
    header: 'Request Type',
    cell: ({ row }) => (
      <span className="text-sm">{row.original.requestType || '-'}</span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColorMap: Record<string, string> = {
        Pending: '#3787E3',
        'In-Progress': '#FC690E',
        Completed: '#78B150',
      };

      const color = statusColorMap[status] || 'gray';
      return <div className={`text-sm text-[${color}]`}>{status || '-'}</div>;
    },
  },
  {
    accessorKey: 'assignedTo',
    header: 'Assigned To',
    cell: ({ row }) => (
      <span className="text-sm">{row.original.assignedTo || 'Unassigned'}</span>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <CellAction data={row.original} />
      </div>
    ),
  },
];
