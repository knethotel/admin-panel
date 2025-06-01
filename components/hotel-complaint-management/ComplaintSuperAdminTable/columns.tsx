import { ColumnDef } from '@tanstack/react-table';
import { ComplaintDataType } from 'app/static/ComplaintData';
import CellAction from './cell.action';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const columns: ColumnDef<ComplaintDataType>[] = [
  {
    accessorKey: 'complaintID',
    header: 'Complaint ID'
  },
  {
    accessorKey: 'datetime',
    header: 'Date & Time',
    cell: ({ row }) => {
      const date = row.original.complaintTime.date;
      const time = row.original.complaintTime.time;
      return (
        <div>
          <span>{date}</span>
          <span>{time}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'complaintType',
    header: 'Complaint Type',
    cell: ({ row }) => {
      const type = row.original.complaintType;
      return <div>{type}</div>;
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status.toUpperCase();
      const complaintID = row.original.complaintID;
      const router = useRouter();

      // Color for status text
      const getStatusColor = (s: string) => {
        switch (s) {
          case 'OPEN':
            return 'text-[#E5252A]'; // red
          case 'INPROGRESS':
            return 'text-yellow-600'; // yellow
          case 'RESOLVED':
          case 'CLOSED':
            return 'text-green-600'; // green
          default:
            return 'text-black';
        }
      };

      return (
        <div className="flex flex-col items-center gap-1">
          <span className={`${getStatusColor(status)} font-medium text-sm`}>
            {status}
          </span>

          {(status === 'RESOLVED' || status === 'CLOSED') && (
            <button
              onClick={() =>
                router.push(
                  `/super-admin/complaint-management/view/${complaintID}`
                )
              }
              className="text-[#78B150] text-[10px] hover:underline"
            >
              View Feedback
            </button>
          )}
        </div>
      );
    }
  },
  {
    accessorKey: 'Remark',
    header: 'Remark'
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
