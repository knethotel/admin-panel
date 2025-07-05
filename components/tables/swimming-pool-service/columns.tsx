'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';
import apiCall from '@/lib/axios';
import React, { useState } from 'react';

export type SwimmingpoolServiceDataType = {
  requestID: string;
  serviceID: string;
  poolID: string;
  uniqueId: string;
  requestDetail: string;
  responseDetail: string;
  requestAssignedTo: string;

  requestTime: {
    date: string;
    time: string;
  };
  amount: {
    subtotal: number;
    discount: number;
    finalAmount: number;
  };


  guestDetails: {
    guestID: string;
    name: string;
    roomNo: string;
    phoneNumber: string;
    email: string;
  };

  requestType: string;
  status: string;
  assignedTo: string;
  requestedTimeSlot: string;
  effectiveCost: string;
  paymentStatus: string;
  rulesAndRegulations: string;

  // Newly added fields
  hotelId: string;
  bookingDate: string;
  paymentDate: string;
  createdAt: string;
  updatedAt: string;
  additionalServicesSelected: string[];
};


export const columns: ColumnDef<SwimmingpoolServiceDataType>[] = [
  {
    accessorKey: 'uniqueId',
    header: 'Request ID',
    cell: ({ row }) => (
      <div className="text-sm font-medium text-gray-900">{row.original.uniqueId}</div>
    ),
  },
  {
    accessorKey: 'requestTime',
    header: 'Request Time',
    cell: ({ row }) => {
      const { date, time } = row.original.requestTime;
      return (
        <div className="flex flex-col gap-[2px] text-xs text-gray-700">
          <span>{date}</span>
          <span>{time}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'guestDetails',
    header: 'Guest Details',
    cell: ({ row }) => {
      const guest = row.original.guestDetails;
      return (
        <div className="flex flex-col gap-[1px] text-xs text-gray-800">
          <span className="font-medium text-gray-900">{guest.name}</span>
          <span>Room: {guest.roomNo}</span>
          <span>Phone: {guest.phoneNumber}</span>
          <span>Email: {guest.email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'requestDetail',
    header: 'Request Detail',
    cell: ({ row }) => (
      <div className="text-sm text-gray-800">{row.original.requestDetail || '-'}</div>
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
    header: 'Payment Status',
    cell: ({ row }) => (
      <div className="text-sm">{row.original.paymentStatus || 'Unpaid'}</div>
    ),
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
    accessorKey: 'bookingDate',
    header: 'Booking Date',
    cell: ({ row }) => (
      <div className="text-sm">{row.original.bookingDate}</div>
    ),
  },
  {
    accessorKey: 'paymentDate',
    header: 'Payment Date',
    cell: ({ row }) => (
      <div className="text-sm">{row.original.paymentDate}</div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => (
      <div className="text-xs">{row.original.createdAt}</div>
    ),
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => (
      <div className="text-xs">{row.original.updatedAt}</div>
    ),
  },
  {
    accessorKey: 'additionalServicesSelected',
    header: 'Add-on Services',
    cell: ({ row }) => (
      <ul className="text-xs list-disc list-inside text-gray-700">
        {row.original.additionalServicesSelected?.length > 0
          ? row.original.additionalServicesSelected.map((service, idx) => (
            <li key={idx}>{service}</li>
          ))
          : 'None'}
      </ul>
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

