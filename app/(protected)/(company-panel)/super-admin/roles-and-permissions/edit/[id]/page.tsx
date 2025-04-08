'use client';
import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import RolesAndPermissionsModal from '../../../../../../../components/shared/role-and-permission/role-permission';

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
      console.log('Updated role data:', data);
      // TODO: Implement actual API call to update the role
      // Example: await api.updateRole(roleId, data);
      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 1000));

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
