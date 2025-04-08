'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import RolesAndPermissionsModal from '../../../../../../../components/shared/role-and-permission/role-permission';

const SuperAdminViewRolePage = () => {
  const router = useRouter();
  const params = useParams();
  const roleId = params.id as string; // Align with edit page (assumes route is /super-admin/view-role/[id])

  const [isSaving, setIsSaving] = useState(false); // Added for consistency with edit page
  const [error, setError] = useState<string | null>(null);

  // Debug params on mount (optional, commented out unless needed)
  /*
  useEffect(() => {
    console.log('Params from useParams():', params);
    if (!roleId) {
      setError('No role ID provided in the URL');
    }
  }, [params, roleId]);
  */

  const handleSave = async (data: Record<string, string[]>) => {
    // No save operation in view mode; silently ignore or throw an error if called
    console.warn('Save operation attempted in view mode; this is not allowed.');
    return; // Do nothing in view mode
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
        mode="view"
        roleId={roleId}
        onSave={handleSave}
        isSuperAdmin={true}
      />
    </div>
  );
};

export default SuperAdminViewRolePage;
