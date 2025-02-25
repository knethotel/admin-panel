import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: 'employeeId',
        header: 'Employee Id',
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'mobile',
        header: 'Mobile',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'role',
        header: 'Role',
    },

    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.original?.status || "N/A"; 
            const statusColor = status === "ACTIVE" ? "text-green-500" 
                              : status === "INACTIVE" ? "text-red-500" 
                              : "text-gray-500";
    
            return (
                <div className={` font-semibold ${statusColor}`}>
                    {status}
                </div>
            );
        },
    },
    
    {
        accessorKey: 'actions',
        id: 'actions',
        enableSorting: false,
        header: 'Actions',
        cell: ({ row }) =>(<div className="flex items-center justify-center"> <CellAction data={row.original} /></div>)
    },
];