import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const CellAction = (props: any) => {
  const { data } = props;
  console.log(data.guestId);

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

  const handleEditUser = () => {
    router.push(`guest-management/edit/${data.guestId}`);
    console.log('success');
  };

  const handleViewUser = () => {
    router.push(`guest-management/view/${data.guestId}`);
  };

  return (
    <>
      {/* Deactivate Confirmation Modal */}
      <AlertModal
        isOpen={open}
        onCloseAction={() => setOpen(false)}
        onConfirmAction={onConfirm}
        loading={loading}
        description="Are you sure you want to deactivate this user?"
      />

      {/* Action Buttons */}
      <div className="flex space-x-2">
        {/* View user details */}
        <button
          onClick={() => handleViewUser()}
          className="p-1 rounded-md group hover:bg-[#a07d3d5e]"
        >
          <Eye className=" w-4 text-button-dark group-hover:text-white" />
        </button>

        {/* Delete User */}
        <button
          onClick={() => setOpen(true)}
          className="p-1 rounded-md group hover:bg-[#a07d3d5e]"
        >
          <Trash className=" w-4 text-button-dark group-hover:text-white" />
        </button>

        {/* Edit User */}
        <Button
          onClick={() => handleEditUser()}
          className="p-3 rounded-md group cursor-pointer hover:bg-[#a07d3d5e]"
        >
          <Edit className=" w-4 text-button-dark group-hover:text-white" />
        </Button>
      </div>
    </>
  );
};

export default CellAction;
