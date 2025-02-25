import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const CellAction = (props: any) => {
    const { data } = props;

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onConfirm = async () => {
        try {
            // Perform user  logic here
        } catch (error: any) {
            // console.error("Error deactivating user:", error);
        } finally {
            setOpen(false);
        }
    };
    console.log(data);

    const handleEditUser = () => router.push(`/employee-management/edit/${data.employeeId}`);
    return (
        <>
            {/* Deactivate Confirmation Modal */}
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onConfirm}
                loading={loading}
                description="Are you sure you want to deactivate this user?"
            />

            {/* Action Buttons */}
            <div className="flex space-x-2">

                {/* Edit User */}
                <Button onClick={() => handleEditUser()} className="p-3 rounded-md group bg-[#A07D3D1A] cursor-pointer hover:bg-[#a07d3d5e]">
                    <Edit className=" w-4 text-button-dark group-hover:text-white" />
                </Button>

                {/* Delete User */}
                <button onClick={() => setOpen(true)} className="p-1 rounded-md group hover:bg-[#7090B0]">
                    <Trash className=" w-4 text-button-dark group-hover:text-white" />
                </button>
            </div>
        </>
    );
}

export default CellAction