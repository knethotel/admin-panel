// import { ColumnDef } from '@tanstack/react-table';
// import { SpaServiceDataType } from 'app/static/services-management/Spa'; // Corrected import
// import CellAction from './cell-action';

// // Updated columns to match ReceptionDataType
// export const columns: ColumnDef<SpaServiceDataType>[] = [
//   {
//     accessorKey: 'serviceID',
//     header: 'Request ID'
//   },
//   {
//     accessorKey: 'serviceType',
//     header: 'Service Type'
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
//     accessorKey: 'serviceCategory',
//     header: 'Service Category',
//     cell: ({ row }) => {
//       const type = row.original.serviceCategory;
//       return <div className="text-sm">{type}</div>;
//     }
//   },
//   {
//     accessorKey: 'duration',
//     header: 'Duration'
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

// Define the SpaServiceDataType
export type SpaServiceDataType = {
  uniqueId: string;
  requestType: string;
  requestDetail: string;
  responseDetail: string;
  requestAssignedTo: string;
  requestTime: {
    date: string;
    time: string;
  };
  guestDetails: {
    guestID: string;
    name: string;
    roomNo: string;
    mobileNumber: string;
    email: string;
  };
  serviceCategory: string;
  duration: string;
  status: string;
  assignedTo: string;
};

// Define columns for the table
export const columns: ColumnDef<SpaServiceDataType>[] = [
  {
    accessorKey: 'uniqueId',
    header: 'Unique ID',
    cell: ({ row }) => {
      const uniqueId = row.original.uniqueId;
      return <div className="text-sm text-gray-900">{uniqueId || 'N/A'}</div>
    }
  },
  {
    accessorKey: 'requestType',
    header: 'Request Type',
    cell: ({ row }) => {
      const requestType = row.original.requestType;
      return <div className="text-sm">{requestType || 'N/A'}</div>;
    }
  },
  {
    accessorKey: 'guestDetails',
    header: 'Guest Details',
    cell: ({ row }) => {
      const { name, guestID, roomNo } = row.original.guestDetails;
      return (
        <div className="flex justify-center items-center">
          <div className="flex flex-col w-1/2 justify-center items-start gap-1">
            <p className="text-sm text-gray-900">{name}</p>
            <p className="text-xs text-gray-600">{guestID}</p>
            <p className="text-xs text-gray-600">{roomNo}</p>
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: 'serviceCategory',
    header: 'Service Category',
    cell: ({ row }) => <div className="text-sm text-gray-900">{row.original.serviceCategory}</div>
  },
  {
    accessorKey: 'duration',
    header: 'Duration',
    cell: ({ row }) => <div className="text-sm text-gray-900">{row.original.duration}</div>
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      switch (status) {
        case 'Pending':
          return <div className="text-sm text-[#3787E3]">{status}</div>;
        case 'In-Progress':
          return <div className="text-sm text-[#FC690E]">{status}</div>;
        case 'Completed':
          return <div className="text-sm text-[#78B150]">{status}</div>;
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
      return <div className="text-sm text-gray-900">{assignedTo || 'Not Assigned'}</div>;
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
