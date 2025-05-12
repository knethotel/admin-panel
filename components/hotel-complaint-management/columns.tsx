import { ColumnDef } from '@tanstack/react-table';
import { ComplaintDataType } from 'app/static/ComplaintData';
import CellAction from './cell.action';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export const columns: ColumnDef<ComplaintDataType>[] = [
  {
    accessorKey: 'complaintID',
    header: 'Complaint ID'
  },
  {
    accessorKey: 'hotelId',
    header: 'User ID'
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
      const status = row.original.status;
      const [open, setOpen] = useState(false);

      return (
        <div className="text-center">
          {status === 'OPEN' ? (
            <DropdownMenu.Root open={open} onOpenChange={setOpen}>
              <DropdownMenu.Trigger asChild>
                <button className="text-[#E5252A] font-medium text-sm flex items-center mx-auto gap-1">
                  OPEN
                  {open ? (
                    <ChevronUp className="h-4 w-4 text-black" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-black" />
                  )}
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  side="bottom"
                  align="start"
                  className="bg-white rounded-md shadow-md text-sm z-50 px-2 py-1 w-[100px]"
                >
                  <DropdownMenu.Item className="text-[#78B15099] px-2 py-1 cursor-pointer outline-none">
                    CLOSED
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          ) : (
            <div className="flex flex-col">
              <span className="text-[#78B15099] font-medium text-sm">
                CLOSED
              </span>
              <button className="text-[#78B150] text-[10px] pr-3">
                Give Feedback
              </button>
            </div>
          )}
        </div>
      );
    }
  },
  {
    accessorKey: 'assignedTo',
    header: 'Assigned To',
    cell: ({ row }) => {
      const employeeList = ['EMPLOYEE 1', 'EMPLOYEE 2', 'EMPLOYEE 3'];
      const selected = row.original.assignedTo;
      const loginTime = '10:00AM';
      const loginDate = '10-02-25';
      const [open, setOpen] = useState(false);

      return (
        <div className="flex flex-col items-center">
          <DropdownMenu.Root open={open} onOpenChange={setOpen}>
            <DropdownMenu.Trigger asChild>
              <button className="text-black font-medium text-sm flex items-center gap-1">
                {selected}
                {open ? (
                  <ChevronUp className="h-4 w-4 text-black" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-black" />
                )}
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                side="bottom"
                align="end"
                className="bg-white rounded-md shadow-md text-sm z-50 px-2 py-1 w-[150px]"
              >
                {employeeList.map((emp) => (
                  <DropdownMenu.Item
                    key={emp}
                    className="px-2 py-1 cursor-pointer text-sm text-black outline-none"
                  >
                    {emp}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
          <div className="flex flex-col">
            <p className="text-[10px] text-gray-500">LOG IN : {loginDate}</p>
            <span className="text-[10px] text-gray-500 text-end -mt-1">
              {loginTime}
            </span>
          </div>
        </div>
      );
    }
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
