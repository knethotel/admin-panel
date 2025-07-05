


'use client';

import { ColumnDef } from '@tanstack/react-table';
import { InRoomControlDataType } from '@/components/tables/In_Room_Control-Service/client';
import CellAction from './cell-action';
import apiCall from '@/lib/axios';
import React, { useState } from 'react';

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
      const serviceId = row.original.requestID;

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
