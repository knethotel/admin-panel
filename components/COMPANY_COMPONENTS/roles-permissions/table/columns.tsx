import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';
import { RoleDetailsDataType } from 'app/static/company-panel/RolesAndPermissions';

// Update type to match guestDataType for better type safety
export const columns: ColumnDef<RoleDetailsDataType>[] = [
  {
    accessorKey: 'role',
    header: 'Role'
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
