'use client';
import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import RolesAndPermissionsModal from '../../../../../../../components/shared/role-and-permission/role-permission';

const SuperAdminViewRolePage = () => {
  const router = useRouter();
  const params = useParams();
  const roleId = params.roleId as string; // Extract roleId from URL

  // In view mode, onSave won't be called, but we define it for type safety
  const handleSave = (data: Record<string, string[]>) => {
    console.log('View mode - no save expected:', data);
  };

  return (
    <div className="flex justify-center items-center w-full px-14 py-10">
      <RolesAndPermissionsModal
        isOpen={true}
        onClose={() => router.push('/super-admin/roles-and-permissions')}
        mode="view"
        isSuperAdmin={true}
        roleId={roleId} // Pass roleId to fetch and display the role
        onSave={handleSave}
      />
    </div>
  );
};

export default SuperAdminViewRolePage;
