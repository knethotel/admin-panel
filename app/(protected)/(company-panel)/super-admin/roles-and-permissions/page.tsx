'use client';
import React, { useEffect, useState } from 'react';
import RolesAndPermissionsModal from '@/components/shared/role-and-permission/role-permission';
import { RiEditBoxLine } from 'react-icons/ri';
import { FaTrashAlt } from 'react-icons/fa';
import Image from 'next/image';
import plusIcon from '../../../../../public/assets/plus.png';
import apiCall from '@/lib/axios';
import Navbar from '@/components/Navbar';

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
      'Sub Hotel Management': 'sub-hotel-management',
      'Roles & Permissions': 'roles-and-permissions'
    };
    return reverseMap[uiModule] || uiModule.toLowerCase().replace(/\s+/g, '-');
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await apiCall('GET', 'api/role/get-all-roles');
        const allRoles = response.roles;

        const formatted: Record<string, PermissionWithAccess[]> = {};
        const idsMap: Record<string, string> = {};

        allRoles?.forEach((role: any) => {
          idsMap[role.name] = role._id || role.id || '';
          formatted[role.name] = role.permissions.map((p: any) => ({
            module: p.module
              .replace(/-/g, ' ')
              .replace(/\b\w/g, (l: string) => l.toUpperCase()),
            access: p.access || []
          }));
        });

        setRolesAndPermissions(formatted);
        setRoleIds(idsMap);
      } catch (err) {
        console.error('Failed to fetch roles:', err);
      }
    };

    fetchRoles();
  }, []);

  const handleSave = async (
    newRoles: Record<string, PermissionWithAccess[]>
  ) => {
    const roleName = Object.keys(newRoles)[0];
    const selectedModules = newRoles[roleName];

    const permissionsPayload = selectedModules.map(({ module, access }) => ({
      module: reverseMapModuleName(module),
      access
    }));

    const payload = {
      name: roleName,
      scope: 'Platform',
      permissions: permissionsPayload
    };

    if (editingRole && editingRoleId) {
      await apiCall('PUT', `api/role/update-role/${editingRoleId}`, payload);
    } else {
      await apiCall('POST', 'api/role/create-role', payload);
    }

    // Refresh roles
    const updated = await apiCall('GET', 'api/role/get-all-roles');
    const formatted: Record<string, PermissionWithAccess[]> = {};
    const idsMap: Record<string, string> = {};

    updated.roles?.forEach((role: any) => {
      idsMap[role.name] = role._id || role.id || '';
      formatted[role.name] = role.permissions.map((p: any) => ({
        module: p.module
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (l: string) => l.toUpperCase()),
        access: p.access || []
      }));
    });

    setRolesAndPermissions(formatted);
    setRoleIds(idsMap);
    setEditingRole(null);
    setEditingRoleId(null);
    setIsOpen(false);
  };

  const handleDeleteRole = async (role: string) => {
    const roleId = roleIds[role];
    if (!roleId) return;

    await apiCall('DELETE', `api/role/delete-role/${roleId}`);

    const updated = { ...rolesAndPermissions };
    delete updated[role];
    setRolesAndPermissions(updated);

    const updatedIds = { ...roleIds };
    delete updatedIds[role];
    setRoleIds(updatedIds);
  };

  const handleEditRole = (role: string) => {
    setEditingRole(role);
    setEditingRoleId(roleIds[role]);
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col w-full">
      <Navbar active={true} search={true} />
      <div className="flex flex-col pt-4 gap-8 container items-center py-2 text-coffee">
        <div className="w-full flex justify-between mt-20">
          <h2 className="text-lg font-bold">Manage Roles</h2>
          <button
            onClick={() => {
              setEditingRole(null);
              setIsOpen(true);
            }}
          >
            <Image src={plusIcon} width={30} height={30} alt="plus" />
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
          onSave={handleSave}
          isSuperAdmin={true}
          roleId={editingRoleId ?? undefined}
        />

        {/* Grid Layout for Roles and Permissions */}
        <div className="w-full">
          {/* Headers */}
          <div className="grid grid-cols-12 mb-4 font-bold">
            <div className="col-span-3">Role</div>
            <div className="col-span-7">Permission</div>
            <div className="col-span-2 text-center">Action</div>
          </div>

          {/* Role rows */}
          {Object.entries(rolesAndPermissions).map(([role, permissions]) => (
            <div key={role} className="grid grid-cols-12 mb-4 items-start">
              {/* Role column */}
              <div className="col-span-3">
                <span className="bg-brown text-center text-sm rounded-lg text-white px-3 py-1 font-medium inline-block">
                  {role}
                </span>
              </div>

              {/* Permissions column */}
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

              {/* Action column */}
              <div className="col-span-2 flex justify-center gap-4">
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default RolesAndPermissionsPage;
