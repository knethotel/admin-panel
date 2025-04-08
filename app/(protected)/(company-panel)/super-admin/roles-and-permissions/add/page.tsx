'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import RolesAndPermissionsModal from '../../../../../../components/shared/role-and-permission/role-permission';

const SuperAdminAddRolePage = () => {
  const router = useRouter();

  const handleSave = (data: Record<string, string[]>) => {
    console.log('New role data:', data);
    // TODO: Add API call to save the role
    router.push('/super-admin/roles-and-permissions');
  };

  return (
    <div className="flex justify-center items-center w-full px-14 py-10">
      <RolesAndPermissionsModal
        isOpen={true}
        onClose={() => router.push('/super-admin/roles-and-permissions')}
        mode="add"
        isSuperAdmin={true}
        onSave={handleSave}
      />
    </div>
  );
};

export default SuperAdminAddRolePage;
