
// import { ColumnDef } from '@tanstack/react-table';
// import { InRoomControlDataType } from '@/components/tables/In_Room_Control-Service/client';
// import CellAction from './cell-action';

// export const columns: ColumnDef<InRoomControlDataType, any>[] = [
//   {
//     accessorKey: 'orderID',
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
//     accessorKey: 'issueType',
//     header: 'Issue Type'
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


'use client';

import { ColumnDef } from '@tanstack/react-table';
import { InRoomControlDataType } from '@/components/tables/In_Room_Control-Service/client';
import CellAction from './cell-action';
import apiCall from '@/lib/axios';
import { useState } from 'react';

export const columns: ColumnDef<InRoomControlDataType, any>[] = [
  {
    accessorKey: 'orderID',
    header: 'Request ID',
    cell: ({ row }) => <div className="text-sm">{row.original.orderID}</div>
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
        <div className="flex justify-center items-start">
          <div className="flex flex-col w-full gap-1">
            <p className="text-sm text-gray-900">{details.name}</p>
            <p className="text-xs text-gray-600">Room: {details.roomNo}</p>
            <p className="text-xs text-gray-600">Phone: {details.phoneNumber}</p>
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: 'issueType',
    header: 'Issue Type',
    cell: ({ row }) => <div className="text-sm">{row.original.issueType}</div>
  },
  {
    accessorKey: 'estimatedDeliveryTime',
    header: 'Estimated Delivery Time',
    cell: ({ row }) => (
      <div className="text-sm">
        {row.original.estimatedDeliveryTime
          ? new Date(row.original.estimatedDeliveryTime).toLocaleString()
          : '-'}
      </div>
    )
  },
  {
    accessorKey: 'assignedTo',
    header: 'Assigned To',
    cell: ({ row }) => (
      <div className="flex flex-col text-sm">
        <span>{row.original.assignedTo}</span>
        <span className="text-xs text-gray-500">{row.original.assignedToMobile}</span>
      </div>
    )
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const [updating, setUpdating] = useState(false);
      const validStatuses = ['Pending', 'In-Progress', 'Completed'] as const;

      type ValidStatus = typeof validStatuses[number];

      const getSafeStatus = (value: string): ValidStatus => {
        return validStatuses.includes(value as ValidStatus) ? (value as ValidStatus) : 'Pending';
      };

      const [status, setStatus] = useState<ValidStatus>(getSafeStatus(row.original.status));

      const serviceId = row.original.requestID;

      const statusMap = {
        Pending: 'pending',
        'In-Progress': 'in-progress',
        Completed: 'completed'
      } as const;

      const statusOptions: Array<keyof typeof statusMap> = ['Pending', 'In-Progress', 'Completed'];

      const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as keyof typeof statusMap;
        setUpdating(true);

        try {
          const data = await apiCall('PATCH', `/api/services/status/${serviceId}`, {
            status: statusMap[newStatus]
          });

          if (
            data.success ||
            data.status === 'ok' ||
            data.message?.toLowerCase().includes('status updated')
          ) {
            setStatus(newStatus);
            window.location.reload(); // or router.refresh();
          } else {
            console.error('Failed to update status:', data.message || data);
          }
        } catch (error) {
          console.error('Error updating status:', error);
        } finally {
          setUpdating(false);
        }
      };


      return (
        <select
          value={status}
          onChange={handleStatusChange}
          disabled={updating}
          className={`text-sm px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring ${status === 'Pending'
            ? 'text-[#3787E3]'
            : status === 'In-Progress'
              ? 'text-[#FC690E]'
              : status === 'Completed'
                ? 'text-[#78B150]'
                : 'text-gray-500'
            }`}
        >
          {statusOptions.map(option => (
            <option key={option} value={option} className="text-black">
              {option}
            </option>
          ))}
        </select>
      );
    }
  }
  ,
  {
    accessorKey: 'paymentStatus',
    header: 'Payment',
    cell: ({ row }) => <div className="text-sm">{row.original.paymentStatus}</div>
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => <div className="text-sm">{row.original.description}</div>
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => <div className="text-xs">{row.original.createdAt}</div>
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => <div className="text-xs">{row.original.updatedAt}</div>
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
