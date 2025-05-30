import { ColumnDef } from '@tanstack/react-table';
import { ComplaintDataType } from '../../../app/static/ComplaintData';
import CellAction from './cell.action';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import apiCall from '@/lib/axios';

const updateComplaint = async (
  complaintID: string,
  updateData: { [key: string]: any }
) => {
  try {
    await apiCall(
      'PUT',
      `api/complaint/platform/complaints/${complaintID}`,
      updateData
    );
  } catch (err) {
    console.error('Update failed:', err);
  }
};

export const columns: ColumnDef<ComplaintDataType>[] = [
  {
    accessorKey: 'complaintID',
    header: 'Complaint ID'
  },
  {
    accessorKey: 'hotelId',
    header: 'Hotel ID'
  },
  {
    accessorKey: 'complaintType',
    header: 'Complaint Type',
    cell: ({ row }) => <div>{row.original.complaintType}</div>
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const [status, setStatus] = useState(row.original.status);
      const router = useRouter();
      const complaintID = row.original.complaintID;

      const statusOptions = ['Open', 'Inprogress', 'Resolved', 'Closed'].filter(
        (s) => s.toUpperCase() !== status
      );

      const handleStatusChange = async (newStatus: string) => {
        const formattedStatus =
          newStatus.charAt(0).toUpperCase() + newStatus.slice(1).toLowerCase(); // Format to 'Open', 'Inprogress', etc.

        setStatus(newStatus.toUpperCase()); // Display version in uppercase
        setOpen(false);
        await updateComplaint(complaintID, { status: formattedStatus });
      };

      return (
        <div className="text-center">
          <DropdownMenu.Root open={open} onOpenChange={setOpen}>
            <DropdownMenu.Trigger asChild>
              <button className="text-[#E5252A] font-medium text-sm flex items-center mx-auto gap-1">
                {status.toUpperCase()}
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
                className="bg-white rounded-md shadow-md text-sm z-50 px-2 py-1 w-[140px]"
              >
                {statusOptions.map((option) => (
                  <DropdownMenu.Item
                    key={option}
                    className="px-2 py-1 cursor-pointer outline-none hover:bg-gray-100 text-black"
                    onClick={() => handleStatusChange(option)}
                  >
                    {option}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          {status !== 'OPEN' && (
            <button
              onClick={() =>
                router.push(
                  `/super-admin/complaint-management/view/${complaintID}`
                )
              }
              className="text-[#78B150] text-[10px] pr-3 mt-1"
            >
              View Feedback
            </button>
          )}
        </div>
      );
    }
  },
  {
    accessorKey: 'assignedTo',
    header: 'Assigned To',
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const [employees, setEmployees] = useState<any[]>([]);
      const [loading, setLoading] = useState(false);
      const [selected, setSelected] = useState(row.original.assignedTo);
      const complaintID = row.original.complaintID;

      const fetchEmployees = async () => {
        try {
          setLoading(true);
          const res = await apiCall<{ employees: any[] }>(
            'GET',
            'api/employee/'
          );
          setEmployees(res.employees);
        } catch (err) {
          console.error('Failed to fetch employees:', err);
        } finally {
          setLoading(false);
        }
      };

      const handleAssign = async (emp: any) => {
        const fullName = `${emp.firstName} ${emp.lastName}`;
        setSelected(fullName);
        setOpen(false);
        await updateComplaint(complaintID, { assignedTo: emp._id });
      };

      return (
        <div className="flex flex-col items-center">
          <DropdownMenu.Root
            open={open}
            onOpenChange={(val) => {
              setOpen(val);
              if (val && employees.length === 0) fetchEmployees();
            }}
          >
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
                className="bg-white rounded-md shadow-md text-sm z-50 px-2 py-1 w-[200px] max-h-[300px] overflow-y-auto"
              >
                {loading ? (
                  <DropdownMenu.Item className="px-2 py-1 text-sm text-gray-500">
                    Loading...
                  </DropdownMenu.Item>
                ) : (
                  employees.map((emp) => (
                    <DropdownMenu.Item
                      key={emp._id}
                      className="px-2 py-1 cursor-pointer text-sm text-black outline-none hover:bg-gray-100"
                      onClick={() => handleAssign(emp)}
                    >
                      {emp.firstName} {emp.lastName}
                    </DropdownMenu.Item>
                  ))
                )}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
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
