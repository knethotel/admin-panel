

'use client';

import { ColumnDef } from '@tanstack/react-table';
import { InRoomDiningDataType } from '@/components/tables/In_Room_Dining-Service/client';
import CellAction from './cell-action';
import apiCall from '@/lib/axios';
import { useState } from 'react';

export const columns: ColumnDef<InRoomDiningDataType, any>[] = [
  {
    accessorKey: 'orderID',
    header: 'Order ID'
  },
  {
    accessorKey: 'requestTime',
    header: 'Request Time',
    cell: ({ row }) => {
      const { date, time } = row.original.requestTime;
      return (
        <div className="flex flex-col text-xs 2xl:text-sm opacity-50">
          <span>{date}</span>
          <span>{time}</span>
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
        <div className="flex flex-col text-xs gap-1 text-gray-600">
          <p className="text-sm text-gray-900">{details.name || 'N/A'}</p>
          <p>{details.roomNo || 'N/A'}</p>
          <p>{details.phoneNumber || 'N/A'}</p>
        </div>
      );
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const [updating, setUpdating] = useState(false);
      const validStatuses = ['Pending', 'In-Progress', 'Completed'] as const;
      type ValidStatus = typeof validStatuses[number];

      const getSafeStatus = (status: string): ValidStatus =>
        validStatuses.includes(status as ValidStatus) ? (status as ValidStatus) : 'Pending';

      const [status, setStatus] = useState<ValidStatus>(getSafeStatus(row.original.status));
      const serviceId = row.original.serviceID;

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
            setStatus(newStatus); // or router.refresh();
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
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Payment Status',
    cell: ({ row }) => (
      <div className="text-sm">{row.original.paymentStatus || 'N/A'}</div>
    )
  },
  {
    accessorKey: 'specialInstructions',
    header: 'Special Instructions',
    cell: ({ row }) => (
      <div className="text-sm truncate max-w-[250px]">{row.original.specialInstructions || 'N/A'}</div>
    )
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const amt = row.original?.amount;
      return amt ? (
        <div className="flex flex-col text-xs">
          <span>Subtotal: ₹{amt.subtotal ?? 0}</span>
          <span>Discount: ₹{amt.discount ?? 0}</span>
          <span>Total: ₹{amt.finalAmount ?? 0}</span>
        </div>
      ) : (
        <span className="text-xs text-gray-500">N/A</span>
      );
    }
  },
  {
    accessorKey: 'coupon',
    header: 'Coupon',
    cell: ({ row }) => {
      const cp = row.original?.coupon;
      return cp?.code ? (
        <div className="flex flex-col text-xs">
          <span>Code: {cp.code}</span>
          <span>Type: {cp.type}</span>
          <span>Value: {cp.value}%</span>
        </div>
      ) : (
        <span className="text-xs text-gray-500">N/A</span>
      );
    }
  },
  {
    accessorKey: 'paymentDate',
    header: 'Payment Date',
    cell: ({ row }) => (
      <div className="text-sm">
        {row.original.paymentDate
          ? new Date(row.original.paymentDate).toLocaleString()
          : 'N/A'}
      </div>
    )
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => (
      <div className="text-xs opacity-60">
        {row.original.createdAt
          ? new Date(row.original.createdAt).toLocaleString()
          : 'N/A'}
      </div>
    )
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => (
      <div className="text-xs opacity-60">
        {row.original.updatedAt
          ? new Date(row.original.updatedAt).toLocaleString()
          : 'N/A'}
      </div>
    )
  },
  {
    accessorKey: 'assignedTo',
    header: 'Assigned To',
    cell: ({ row }) => (
      <div className="text-sm">{row.original.assignedTo || 'N/A'}</div>
    )
  },
  {
    accessorKey: 'actions',
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <CellAction data={row.original} />
      </div>
    )
  }
];
