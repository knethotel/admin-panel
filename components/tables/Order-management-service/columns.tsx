// import { ColumnDef } from '@tanstack/react-table';
// import { OrderManagementDataType } from 'app/static/services-management/OrderManagement';
// // Updated columns to match
// export const columns: ColumnDef<OrderManagementDataType>[] = [
//   {
//     accessorKey: 'orderID',
//     header: 'Order ID'
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
//     accessorKey: 'serviceID',
//     header: 'Service ID'
//   },
//   {
//     accessorKey: 'orderStatus',
//     header: 'Order Status',
//     cell: ({ row }) => {
//       const status = row.original.orderStatus;
//       switch (status) {
//         case 'Order in Transit':
//           return <div className="text-sm text-[#3787E3]">{status}</div>;
//         case 'Order is Preparing':
//           return <div className="text-sm text-[#FC690E]">{status}</div>;
//         case 'Order is Picked up':
//           return <div className="text-sm text-[#FC690E]">{status}</div>;
//         case 'Order placed':
//           return <div className="text-sm text-[#78B150]">{status}</div>;
//         case 'Undelivered':
//           return <div className="text-sm text-[#FB1218]">{status}</div>;
//         case 'Order Delivered':
//           return <div className="text-sm text-[#3787E3]">{status}</div>;
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
//   }
// ];


import { OrderManagementDataType } from '@/components/tables/Order-management-service/client';
import apiCall from '@/lib/axios';
import { ColumnDef } from '@tanstack/react-table';
import React, { useState } from 'react';

export const columns: ColumnDef<OrderManagementDataType, any>[] = [
  {
    accessorKey: 'orderID',
    header: 'Order ID'
  },
  {
    accessorKey: 'requestTime',
    header: 'Request Time',
    cell: ({ row }) => {
      const { date, time } = row.original.requestTime || {};
      return (
        <div className="flex flex-col justify-center">
          <p className="text-xs 2xl:text-sm opacity-50">{date || '-'}</p>
          <p className="text-xs 2xl:text-sm opacity-50">{time || '-'}</p>
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
        <div className="flex justify-center items-center">
          <div className="flex flex-col w-1/2 justify-center items-start gap-1">
            <p className="text-sm text-gray-900">{details.name || 'N/A'}</p>
            <p className="text-xs text-gray-600">{details.guestID || '-'}</p>
            <p className="text-xs text-gray-600">{details.roomNo || '-'}</p>
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: 'serviceID',
    header: 'Service ID',
    cell: ({ row }) => (
      <div className="text-sm">{row.original.serviceID || 'N/A'}</div>
    )
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const serviceId = row.original.serviceID;

      // Map UI display values to backend values
      const statusMap = {
        Pending: 'pending',
        'In-Progress': 'in-progress',
        Completed: 'completed',
      } as const;

      // Normalize backend value to match UI expected values
      const normalizeStatus = (statusFromBackend: string): keyof typeof statusMap => {
        switch (statusFromBackend.toLowerCase()) {
          case 'pending':
            return 'Pending';
          case 'in-progress':
            return 'In-Progress';
          case 'completed':
            return 'Completed';
          default:
            return 'Pending';
        }
      };

      const [updating, setUpdating] = React.useState(false);
      const [status, setStatus] = React.useState<keyof typeof statusMap>(
        normalizeStatus(row.original.status)
      );

      const statusOptions: Array<keyof typeof statusMap> = ['Pending', 'In-Progress', 'Completed'];

      const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as keyof typeof statusMap;
        setUpdating(true);

        try {
          const data = await apiCall('PATCH', `/api/services/status/${serviceId}`, {
            status: statusMap[newStatus], // Send lowercase value to backend
          });

          if (
            data.success ||
            data.status === 'ok' ||
            data.message?.toLowerCase().includes('status updated')
          ) {
            setStatus(newStatus);
            // ✅ No need to reload, UI is already in sync
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
    },
  }
  ,
  {
    accessorKey: 'assignedTo',
    header: 'Assigned to',
    cell: ({ row }) => (
      <div className="text-sm">{row.original.assignedTo || 'Not Assigned'}</div>
    )
  }
];
