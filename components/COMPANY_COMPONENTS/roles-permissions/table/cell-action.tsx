import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import { deleteRoleById } from '@/lib/superAdmin/api/rolesAndPermissions/deleteRoleById';
import { Eye, Edit, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const CellAction = (props: any) => {
  const { data } = props;
  // console.log(data.role); // Logs the role name (e.g., "Super Admin")

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onConfirm = async () => {
    try {
      const response = await deleteRoleById(data._id);
      console.log(response);
      setLoading(true);
    } catch (error: any) {
      console.error('Error deleting role:', error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleEditUser = () => {
    router.push(`/super-admin/roles-and-permissions/edit/${data._id}`);
    console.log('Navigating to edit:', data._id);
  };

  const handleViewUser = () => {
    router.push(`/super-admin/roles-and-permissions/view/${data._id}`);
    console.log('Navigating to view:', data._id);
  };

  const handleDeleteUser = async () => {
    setOpen(true);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onCloseAction={() => setOpen(false)}
        onConfirmAction={onConfirm}
        loading={loading}
        description="Are you sure you want to delete this role?"
      />
      <div className="flex space-x-2">
        <button
          onClick={handleViewUser}
          className="p-1 rounded-md group hover:bg-[#a07d3d5e]"
        >
          <Eye className="w-4 text-button-dark group-hover:text-white" />
        </button>
        <button
          onClick={() => handleDeleteUser()}
          className="p-1 rounded-md group hover:bg-[#a07d3d5e]"
        >
          <Trash className="w-4 text-button-dark group-hover:text-white" />
        </button>
        <Button
          onClick={handleEditUser}
          className="p-3 rounded-md group cursor-pointer hover:bg-[#a07d3d5e]"
        >
          <Edit className="w-4 text-button-dark group-hover:text-white" />
        </Button>
      </div>
    </>
  );
};

export default CellAction;
