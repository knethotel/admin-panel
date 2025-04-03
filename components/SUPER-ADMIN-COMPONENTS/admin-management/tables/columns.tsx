import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';
import { AdminDummyDataType } from 'app/static/super-admin-panel/AdminManagement';

export const columns: ColumnDef<AdminDummyDataType>[] = [
  {
    accessorKey: 'adminID',
    header: 'Admin ID'
  },
  {
    accessorKey: 'adminDetails.name',
    header: 'Admin Name',
    cell: ({ row }) => {
      return (
        <div className="flex flex-col items-start justify-center">
          <span>{row.original.adminDetails.name}</span>
          <span className="text-xs opacity-60 pt-1">
            LOG IN: {row.original.loginDetails.time}
          </span>
          <span className="text-xs opacity-60">
            {row.original.loginDetails.date}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: 'adminDetails.mobileNo',
    header: 'Mobile no.'
  },
  {
    accessorKey: 'adminDetails.emailID',
    header: 'Email ID'
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const role = row.original.role || 'N/A';
      if (role === 'SOS') {
        return <div className="font-medium text-red-400">{role}</div>;
      } else {
        return <div className="text-black">{role}</div>;
      }
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status || 'N/A';
      if (status === 'ACTIVE') {
        return <div className="font-medium text-[#78B150]">{status}</div>;
      } else {
        return <div className="text-[#E5252A]">{status}</div>;
      }
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
