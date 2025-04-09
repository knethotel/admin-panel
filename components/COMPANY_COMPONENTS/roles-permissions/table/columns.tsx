import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';
import { RoleDetailsDataType } from 'app/static/company-panel/RolesAndPermissions';

// Update type to match guestDataType for better type safety
export const columns: ColumnDef<RoleDetailsDataType>[] = [
  {
    accessorKey: '_id',
    header: 'Role ID'
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      if (row.original.role === 'Super Admin') {
        return (
          <span className="text-warning tracking-wide font-medium">
            {row.original.role}
          </span>
        );
      } else {
        return (
          <span className="text-black tracking-wide">{row.original.role}</span>
        );
      }
    }
  },
  {
    accessorKey: 'permissions',
    header: 'Permissions'
  },
  {
    accessorKey: 'taggedUsers',
    header: 'Tagged Users'
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
