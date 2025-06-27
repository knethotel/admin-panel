'use client';
import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';
import { ReceptionDataType } from 'app/static/services-management/Reception';
import { useState } from 'react';
import apiCall from '@/lib/axios';

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
      const [updating, setUpdating] = useState(false);
      const [status, setStatus] = useState<'Pending' | 'In-Progress' | 'Completed'>(row.original.status);
      const serviceId = row.original._id || row.original.requestID;

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
