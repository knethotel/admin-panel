import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';

// Updated interface to match your API response
export interface AdminDataType {
  _id: string;
  isSuperAdmin: boolean;
  roleId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  IsOtpVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const columns: ColumnDef<AdminDataType>[] = [
  {
    accessorKey: 'firstName',
    header: 'Admin Name',
    cell: ({ row }) => {
      const fullName = `${row.original.firstName} ${row.original.lastName}`;
      return (
        <div className="flex flex-col items-start justify-center">
          <span>{fullName}</span>
          {/* Since login details aren't in the response, we'll show created date instead */}
          <span className="text-xs opacity-60 pt-1">
            CREATED: {new Date(row.original.createdAt).toLocaleTimeString()}
          </span>
          <span className="text-xs opacity-60">
            {new Date(row.original.createdAt).toLocaleDateString()}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: 'phoneNo', // Note: Your sample data doesn't have this field
    header: 'Mobile no.',
    cell: ({ row }) => {
      // Since phone number isn't in the sample data, we'll show N/A, un-comment this as soon as phone no. arrives
      // return row.original.phoneNo || 'N/A';
      return 'N/A';
    }
  },
  {
    accessorKey: 'email',
    header: 'Email ID'
  },
  {
    accessorKey: 'roleId',
    header: 'Role',
    cell: ({ row }) => {
      // Note: This shows roleId since role name isn't in the response
      // You might need to fetch role details separately to show the role name
      const role = row.original.roleId || 'N/A';
      if (role === '67f0b1e2f570748052516630') {
        // Super admin role ID from your data
        return <div className="font-medium text-red-400">Super Admin</div>;
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
      if (status === 'Active') {
        // Match your data's status value
        return <div className="font-medium text-[#78B150]">ACTIVE</div>;
      } else {
        return <div className="text-[#E5252A]">{status.toUpperCase()}</div>;
      }
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
