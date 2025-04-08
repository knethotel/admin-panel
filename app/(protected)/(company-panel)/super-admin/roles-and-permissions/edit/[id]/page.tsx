'use client';
import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import RolesAndPermissionsModal from '../../../../../../../components/shared/role-and-permission/role-permission';

const SuperAdminEditRolePage = () => {
  const router = useRouter();
  const params = useParams();
  const roleId = params.roleId as string; // Extract roleId from URL

  const handleSave = (data: Record<string, string[]>) => {
    console.log('Updated role data:', data);
    // TODO: Add API call to update the role
    router.push('/super-admin/roles-and-permissions');
  };

  return (
    <div className="flex justify-center items-center w-full px-14 py-10">
      <RolesAndPermissionsModal
        isOpen={true}
        onClose={() => router.push('/super-admin/roles-and-permissions')}
        mode="edit"
        isSuperAdmin={true}
        roleId={roleId} // Pass roleId to fetch and edit the role
        onSave={handleSave}
      />
    </div>
  );
};

export default SuperAdminEditRolePage;
