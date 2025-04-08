'use client';
import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import RolesAndPermissionsModal from '../../../../../../components/shared/role-and-permission/role-permission';
import { addNewRole } from '../../../../../../lib/superAdmin/api/rolesAndPermissions/addNewRole'; // Import the API function

const SuperAdminAddRolePage = () => {
  const router = useRouter();
  const params = useParams();
  const roleId = params.id as string; // Optional, depends if you use it for prefill/reference

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (data: Record<string, string[]>) => {
    setIsSaving(true);
    setError(null);

    try {
      const [roleName, permissions] = Object.entries(data)[0]; // One role at a time
      const formattedData = {
        name: roleName,
        permissions: permissions.map((module) => ({
          module: reverseMapModuleName(module),
          access: ['read', 'write', 'delete']
        }))
      };

      console.log('Formatted data for API (add):', formattedData);
      await addNewRole(formattedData);

      router.push('/super-admin/roles-and-permissions');
    } catch (err) {
      setError(
        'Failed to add role: ' +
          (err instanceof Error ? err.message : 'Unknown error')
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    if (!isSaving) {
      router.push('/super-admin/roles-and-permissions');
    }
  };

  const reverseMapModuleName = (uiModule: string): string => {
    const reverseMap: Record<string, string> = {
      'Hotel Management': 'hotel-management',
      'Complaint Management': 'complaint-management',
      'Admin Management': 'admin-management',
      'Guest Management': 'user-management',
      Dashboard: 'dashboard',
      'Roles and Permissions': 'roles-and-permissions',
      'Payment Management': 'payment-management',
      'Change Password': 'change-password',
      'Sub Hotel Management': 'sub-hotel-management'
    };
    return reverseMap[uiModule] || uiModule.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <div className="flex justify-center items-center w-full px-14 py-10">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <RolesAndPermissionsModal
        isOpen={true}
        onClose={handleClose}
        mode="add"
        roleId={undefined} // No editing, so no ID needed
        onSave={handleSave}
        isSuperAdmin={true}
      />
    </div>
  );
};

export default SuperAdminAddRolePage;
