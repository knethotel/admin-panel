'use client';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import plusIcon from '../../../../public/assets/plus.png';
import { RiEditBoxLine } from 'react-icons/ri';
import { FaTrashAlt } from 'react-icons/fa';
import RolesAndPermissionsModal from '@/components/shared/role-and-permission/role-permission';
import apiCall from '@/lib/axios';

interface PermissionWithAccess {
  module: string;
  access: string[];
}

const RolesAndPermissionsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rolesAndPermissions, setRolesAndPermissions] = useState<
    Record<string, PermissionWithAccess[]>
  >({});

  const [editingRole, setEditingRole] = useState<string | null>(null);
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [roleIds, setRoleIds] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const reverseMapModuleName = (uiModule: string): string => {
    const reverseMap: Record<string, string> = {
      'Hotel Management': 'hotel-management',
      'Complaint Management': 'complaint-management',
      'Admin Management': 'admin-management',
      'Guest Management': 'guest-management',
      'User Management': 'guest-management',
      Dashboard: 'dashboard',
      'Roles and Permissions': 'roles-and-permissions',
      'Payment Management': 'payment-management',
      'Change Password': 'change-password',
      'Employee Management': 'employee-management',
      'Coupons Management': 'coupons-management',
      'Refund Management': 'refund-management',
      'Service Management': 'service-management',
      'Hotel Profile': 'hotel-profile',
      'Analytics Reports': 'analytics-reports'
    };

    return reverseMap[uiModule] || uiModule.toLowerCase().replace(/\s+/g, '-');
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await apiCall('GET', 'api/role/get-all-roles');
        const allRoles = response.roles;

        const formattedRoles: Record<string, PermissionWithAccess[]> = {};
        const idsMap: Record<string, string> = {};

        allRoles?.forEach((role: any) => {
          idsMap[role.name] = role._id || role.id || '';
          formattedRoles[role.name] = role.permissions.map((p: any) => ({
            module: p.module
              .replace(/-/g, ' ')
              .replace(/\b\w/g, (l: string) => l.toUpperCase()),
            access: p.access || []
          }));
        });

        setRolesAndPermissions(formattedRoles);
        setRoleIds(idsMap);
      } catch (err: any) {
        if (
          err?.response?.data?.message === 'Access denied' ||
          err?.message === 'Access denied'
        ) {
          setErrorMessage("You don't have access for this module.");
        } else {
          setErrorMessage('Something went wrong while fetching roles.');
        }
      }
    };

    fetchRoles();
  }, []);

  const handleSaveRolesAndPermissions = async (
    newRolesAndPermissions: Record<string, PermissionWithAccess[]>
  ) => {
    try {
      const roleName = Object.keys(newRolesAndPermissions)[0];
      const selectedModules = newRolesAndPermissions[roleName];

      const permissionsPayload = selectedModules.map(({ module }) => ({
        module: reverseMapModuleName(module),
        access: ['read', 'write', 'delete'] // full access for now
      }));

      const payload = {
        name: roleName,
        scope: 'Hotel',
        permissions: permissionsPayload
      };

      if (editingRole && editingRoleId) {
        await apiCall('PUT', `api/role/update-role/${editingRoleId}`, payload);
      } else {
        await apiCall('POST', 'api/role/create-role', payload);
      }

      // Refresh roles list after update/create
      const response = await apiCall('GET', 'api/role/get-all-roles');
      const allRoles = response.roles;

      const formattedRoles: Record<string, PermissionWithAccess[]> = {};
      allRoles?.forEach((role: any) => {
        formattedRoles[role.name] = role.permissions.map((p: any) => ({
          module: p.module
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (l: string) => l.toUpperCase()),
          access: p.access || []
        }));
      });

      setRolesAndPermissions(formattedRoles);
      setEditingRole(null);
      setEditingRoleId(null);
      setIsOpen(false);
    } catch (err: any) {
      throw err;
    }
  };

  const handleDeleteRole = async (role: string) => {
    try {
      const roleId = roleIds[role];

      if (!roleId) {
        console.error('Role ID not found for role:', role);
        return;
      }

      await apiCall('DELETE', `api/role/delete-role/${roleId}`);

      // Update UI state after delete
      const updated = { ...rolesAndPermissions };
      delete updated[role];
      setRolesAndPermissions(updated);

      // Also remove from roleIds map
      const updatedIds = { ...roleIds };
      delete updatedIds[role];
      setRoleIds(updatedIds);
    } catch (err) {
      setErrorMessage('Failed to delete the role.');
    }
  };

  const handleEditRole = (role: string) => {
    console.log('Editing role permissions:', rolesAndPermissions[role]);
    setEditingRole(role);
    setEditingRoleId(roleIds[role] || null);
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col w-full">
      <Navbar active={true} search={true} />
      <div className="flex flex-col pt-4 lg:px-8 gap-8 container items-center px-4 py-2 text-coffee">
        {errorMessage ? (
          <div className="text-red-500 text-lg mt-20">{errorMessage}</div>
        ) : (
          <>
            <div className="w-full lg:container flex justify-between mt-20">
              <h2 className="text-lg font-bold">Manage Roles</h2>
              <button
                onClick={() => {
                  setEditingRole(null);
                  setIsOpen(true);
                }}
              >
                <Image src={plusIcon} height={30} width={30} alt="plus icon" />
              </button>
            </div>

            <RolesAndPermissionsModal
              isOpen={isOpen}
              onClose={() => {
                setIsOpen(false);
                setEditingRole(null);
              }}
              mode={editingRole ? 'edit' : 'add'}
              existingRolesAndPermissions={
                editingRole
                  ? { [editingRole]: rolesAndPermissions[editingRole] }
                  : rolesAndPermissions
              }
              onSave={handleSaveRolesAndPermissions}
              isSuperAdmin={false}
              roleId={editingRoleId ?? undefined}
            />

            {/* Grid Layout for Roles and Permissions */}
            <div className="w-full lg:container">
              <div className="grid grid-cols-12 mb-4 font-bold">
                <div className="col-span-3">Role</div>
                <div className="col-span-7">Permission</div>
                <div className="col-span-2 text-end">Action</div>
              </div>

              {Object.entries(rolesAndPermissions).map(
                ([role, permissions]) => (
                  <div
                    key={role}
                    className="grid grid-cols-12 mb-4 items-start"
                  >
                    <div className="col-span-3">
                      <span className="bg-brown text-center text-sm rounded-lg text-white px-3 py-1 font-medium inline-block">
                        {role}
                      </span>
                    </div>
                    <div className="col-span-7">
                      <div className="flex flex-wrap gap-2">
                        {permissions.map(({ module }) => (
                          <span
                            key={`${role}-${module}`}
                            className="bg-brown text-center text-sm rounded-lg text-white px-3 py-1 font-medium inline-block"
                          >
                            {module}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-2 flex justify-end gap-4">
                      <RiEditBoxLine
                        className="text-brown h-5 w-5 cursor-pointer"
                        onClick={() => handleEditRole(role)}
                      />
                      <FaTrashAlt
                        className="text-brown h-[18px] w-[18px] cursor-pointer"
                        onClick={() => handleDeleteRole(role)}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RolesAndPermissionsPage;
