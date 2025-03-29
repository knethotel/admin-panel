'use client';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import React, { useState } from 'react';
import plusIcon from '../../../../public/assets/plus.png';
import { RiEditBoxLine } from 'react-icons/ri';
import { FaTrashAlt } from 'react-icons/fa';
import RolesAndPermissionsModal from '@/components/shared/AddRoleModal/role-permission';

const RolesAndPermissionsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rolesAndPermissions, setRolesAndPermissions] = useState<
    Record<string, string[]>
  >({});
  const [editingRole, setEditingRole] = useState<string | null>(null);

  const handleSaveRolesAndPermissions = (
    newRolesAndPermissions: Record<string, string[]>
  ) => {
    if (editingRole) {
      // Edit existing role
      const updated = { ...rolesAndPermissions };
      delete updated[editingRole]; // Remove old role name if changed
      setRolesAndPermissions({
        ...updated,
        ...newRolesAndPermissions
      });
      setEditingRole(null);
    } else {
      // Add new roles
      setRolesAndPermissions((prev) => ({
        ...prev,
        ...newRolesAndPermissions
      }));
    }
  };

  const handleEditRole = (role: string) => {
    setEditingRole(role);
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col w-full">
      <Navbar active={true} search={true} />
      <div className="flex flex-col pt-4 gap-8 items-center px-4 py-2 text-coffee">
        <div className="w-full flex justify-between mt-20">
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
              : {}
          }
          onSave={handleSaveRolesAndPermissions}
        />

        <div className="flex justify-between w-full">
          {/* Role | Permission */}
          <div className="flex gap-6">
            <div className="flex flex-col gap-3">
              <h3 className="font-bold">Role</h3>
              <div className="grid grid-cols-1 gap-3">
                {Object.keys(rolesAndPermissions).map((role) => (
                  <span
                    key={role}
                    className="bg-brown text-center text-sm rounded-lg text-white px-3 py-1 font-medium"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-bold">Permission</h3>
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(rolesAndPermissions).map(
                  ([role, permissions]) => (
                    <div key={role} className="flex flex-wrap gap-1">
                      {permissions.map((permission) => (
                        <span
                          key={`${role}-${permission}`}
                          className="bg-brown text-center text-sm rounded-lg text-white px-3 py-1 font-medium"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold">Action</h3>
            <div className="flex flex-col gap-3">
              {Object.keys(rolesAndPermissions).map((role) => (
                <div key={role} className="flex gap-3">
                  <RiEditBoxLine
                    className="text-brown h-5 w-5 cursor-pointer"
                    onClick={() => handleEditRole(role)}
                  />
                  <FaTrashAlt
                    className="text-brown h-[18px] w-[18px] cursor-pointer"
                    onClick={() => {
                      const updated = { ...rolesAndPermissions };
                      delete updated[role];
                      setRolesAndPermissions(updated);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolesAndPermissionsPage;
