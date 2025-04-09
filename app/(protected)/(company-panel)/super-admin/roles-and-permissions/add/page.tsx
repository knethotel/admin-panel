'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import RolesAndPermissionsModal from '../../../../../../components/shared/role-and-permission/role-permission';
import { addNewRole } from '../../../../../../lib/superAdmin/api/rolesAndPermissions/addNewRole';

const SuperAdminAddRolePage = () => {
  const router = useRouter();

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (data: Record<string, string[]>) => {
    setIsSaving(true);
    setError(null);

    try {
      // Expected shape: { admin: ["dashboard", "Change Password"] }
      const [[roleName, modules]] = Object.entries(data); // Destructure the first entry
      const formattedData = {
        name: roleName,
        permissions: modules.map((module) => ({
          module: reverseMapModuleName(module),
          access: ['read', 'write', 'delete']
        }))
      };

      console.log('Formatted Data Sent to API:', formattedData);
      await addNewRole(formattedData);

      router.push('/super-admin/roles-and-permissions');
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ??
        (err instanceof Error ? err.message : 'Unknown error');
      setError('Failed to add role: ' + errorMessage);
      console.error('Add Role Error:', err?.response?.data || err);
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
      Dashboard: 'Dashboard',
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
        roleId={undefined}
        onSave={handleSave}
        isSuperAdmin={true}
      />
    </div>
  );
};

export default SuperAdminAddRolePage;
