'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';
import apiCall from '@/lib/axios';
import React, { useState } from 'react';

export type SpaServiceDataType = {
  serviceID: string;
  uniqueId: string;

  guestDetails: {
    guestID: string;
    name: string;
    roomNo: string;
    phoneNumber: string;
  };

  serviceType: string;
  productCategory: string;
  productName: string;
  spaSalonProductID?: string;

  bookingDate: string;
  bookingTime: string;
  requestTime: string;

  status: string;
  paymentStatus: string;
  paymentDate?: string;

  amount: {
    subtotal: number;
    discount: number;
    finalAmount: number;
  };

  additionalServicesSelected: string[];
  description: string;
  assignedTo: string;
  estimatedDeliveryTime?: string;

  transaction?: string;
  HotelId: string;
  createdAt: string;
  updatedAt: string;
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
    accessorKey: 'guestDetails',
    header: 'Guest',
    cell: ({ row }) => {
      const guest = row.original.guestDetails;
      return (
        <div className="flex flex-col text-xs text-gray-700">
          <span className="text-sm font-medium">{guest.name}</span>
          <span>Room: {guest.roomNo}</span>
          <span>Ph: {guest.phoneNumber}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'bookingDate',
    header: 'Date',
    cell: ({ row }) => <div className="text-sm">{row.original.bookingDate}</div>
  },
  {
    accessorKey: 'bookingTime',
    header: 'Time',
    cell: ({ row }) => <div className="text-sm">{row.original.bookingTime}</div>
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
      <div className={`text-sm font-semibold ${row.original.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-500'}`}>
        {row.original.paymentStatus}
      </div>
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
    accessorKey: 'paymentDate',
    header: 'Payment Date',
    cell: ({ row }) => (
      <div className="text-xs">
        {row.original.paymentDate ? new Date(row.original.paymentDate).toLocaleString() : 'N/A'}
      </div>
    )
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => (
      <div className="text-xs opacity-60">{row.original.createdAt}</div>
    )
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => (
      <div className="text-xs opacity-60">{row.original.updatedAt}</div>
    )
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <CellAction data={row.original} />
      </div>
    )
  }
];

