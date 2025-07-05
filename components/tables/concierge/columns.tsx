'use string';
import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';
import apiCall from '@/lib/axios';
import React, { useState } from 'react';

export type ConciergeServiceDataType = {
  requestID: string;
  serviceID: string;
  uniqueId: string;
  requestTime: {
    date: string;
    time: string;
  };
  bookingDate: string;
  createdAt: string;
  updatedAt: string;
  assignedTo: {
    _id: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
  }

  guestDetails: {
    name: string;
    guestID: string;
    roomNo?: string;
    phoneNumber?: string;
  };

  requestType: string;
  status: string;

  hotelId: string;
  location?: string;
  transactionID?: string;
  paymentStatus?: string;
  amount?: number;

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
        <div className="flex flex-col text-xs text-gray-600">
          <span>{date}</span>
          <span>{time}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'bookingDate',
    header: 'Booking Date',
    cell: ({ row }) => <span className="text-sm">{row.original.bookingDate}</span>,
  },
  {
    accessorKey: 'guestDetails',
    header: 'Guest Details',
    cell: ({ row }) => {
      const { name, guestID, roomNo, phoneNumber } = row.original.guestDetails || {};
      return (
        <div className="flex flex-col text-sm gap-1">
          <p className="font-medium">{name || '-'}</p>
          <p className="text-xs text-gray-600">Room: {roomNo || 'N/A'}</p>
          <p className="text-xs text-gray-600">Ph: {phoneNumber || 'N/A'}</p>
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
    accessorKey: 'paymentStatus',
    header: 'Payment',
    cell: ({ row }) => (
      <span className="text-sm">{row.original.paymentStatus || '-'}</span>
    ),
  },
  {
    accessorKey: 'assignedTo',
    header: 'Assigned To',
    cell: ({ row }) => {
      const assigned = row.original.assignedTo;
      return assigned?.firstName ? (
        <div className="text-sm">
          <div>{`${assigned.firstName} ${assigned.lastName}`}</div>
          <div className="text-xs text-gray-500">{assigned.mobileNumber}</div>
        </div>
      ) : (
        <span className="text-sm">Unassigned</span>
      );
    },
  }

  ,
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => (
      <span className="text-sm">{row.original.location || '-'}</span>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => (
      <span className="text-xs text-gray-500">{row.original.createdAt}</span>
    ),
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => (
      <span className="text-xs text-gray-500">{row.original.updatedAt}</span>
    ),
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