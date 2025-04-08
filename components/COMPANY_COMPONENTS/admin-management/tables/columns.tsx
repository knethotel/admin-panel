'use client'; // Mark as Client Component

import { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';
import { getAllRoles } from '@/lib/superAdmin/api/rolesAndPermissions/getAllRoles';

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

// Custom hook to fetch roles and return columns
export const useColumns = (): ColumnDef<AdminDataType>[] => {
  const [roles, setRoles] = useState<any[]>([]);

  // Fetch roles on mount
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getAllRoles();
        setRoles(data.roles || []);
      } catch (error) {
        console.error('Failed to fetch roles:', error);
        setRoles([]); // Fallback to empty array on error
      }
    };
    fetchRoles();
  }, []);

  // Define columns using the fetched roles
  return [
    {
      accessorKey: 'firstName',
      header: 'Admin Name',
      cell: ({ row }) => {
        const fullName = `${row.original.firstName} ${row.original.lastName}`;
        return (
          <div className="flex flex-col items-start justify-center">
            <span>{fullName}</span>
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
      accessorKey: 'phoneNo', // Note: Add to AdminDataType if used, otherwise remove
      header: 'Mobile no.',
      cell: () => 'N/A'
    },
    {
      accessorKey: 'email',
      header: 'Email ID'
    },
    {
      accessorKey: 'roleId',
      header: 'Role',
      cell: ({ row }) => {
        const roleID = row.original.roleId || 'N/A';
        const roleObject = roles.find((role: any) => role._id === roleID);
        return (
          <div className="text-base bg-zinc-300/40 py-1 rounded-md">
            {roleObject?.name || 'N/A'}
          </div>
        );
      }
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status || 'N/A';
        if (status === 'Active') {
          return <div className="font-medium text-[#78B150]">ACTIVE</div>;
        }
        return <div className="text-[#E5252A]">{status.toUpperCase()}</div>;
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
};
