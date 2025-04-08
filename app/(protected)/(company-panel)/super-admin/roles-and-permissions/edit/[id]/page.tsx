'use client';
import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import RolesAndPermissionsModal from '../../../../../../../components/shared/role-and-permission/role-permission';
import { editRole } from '../../../../../../../lib/superAdmin/api/rolesAndPermissions/editRole'; // Import the API function

const SuperAdminEditRolePage = () => {
  const router = useRouter();
  const params = useParams();
  const roleId = params.id as string;

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (data: Record<string, string[]>) => {
    if (!roleId) {
      setError('No role ID provided');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      // Transform modal data to match editRole API request body
      const [roleName, permissions] = Object.entries(data)[0]; // Assuming one role at a time in edit mode
      const formattedData = {
        name: roleName,
        permissions: permissions.map((module) => ({
          module: reverseMapModuleName(module), // Convert UI module names back to API format
          access: ['read', 'write', 'delete'] // Hardcode full access for now (see note below)
        }))
      };

      console.log('Formatted data for API:', formattedData);
      await editRole(roleId, formattedData);

      router.push('/super-admin/roles-and-permissions');
    } catch (err) {
      setError(
        'Failed to update role: ' +
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

  // Reverse mapping function to convert UI module names to API format (copied from modal for completeness)
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

  if (!roleId) {
    return (
      <div className="flex justify-center items-center w-full px-14 py-10">
        <p className="text-red-500">Error: No role ID provided in URL</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full px-14 py-10">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <RolesAndPermissionsModal
        isOpen={true}
        onClose={handleClose}
        mode="edit"
        roleId={roleId}
        onSave={handleSave}
        isSuperAdmin={true}
      />
    </div>
  );
};

export default SuperAdminEditRolePage;
