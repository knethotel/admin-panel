'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RolesAndPermissionsModal: React.FC<ModalProps> = ({
  isOpen,
  onClose
}) => {
  const [role, setRole] = useState<string>('');
  const [roles, setRoles] = useState<string[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<{
    [key: string]: string[];
  }>({});

  const permissions = [
    'Create',
    'Read',
    'Update',
    'Delete',
    'Manage Users',
    'Manage Roles',
    'Manage Permissions',
    'View Reports',
    'Export Data',
    'Import Data',
    'Edit Settings',
    'Delete Records'
  ];

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);
  };

  const handleAddRole = () => {
    if (role.trim() !== '') {
      setRoles([...roles, role]);
      setSelectedPermissions((prev) => ({ ...prev, [role]: [] }));
      setRole('');
    }
  };

  const handlePermissionChange = (role: string, permission: string) => {
    setSelectedPermissions((prev) => {
      const rolePermissions = prev[role] || [];
      const updatedPermissions = rolePermissions.includes(permission)
        ? rolePermissions.filter((p) => p !== permission)
        : [...rolePermissions, permission];
      return { ...prev, [role]: updatedPermissions };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Roles and Permissions:', selectedPermissions);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-[#FAF6EF] rounded-lg shadow-lg px-6 pb-6 flex flex-col gap-6  w-full max-w-3xl relative animate-fadeIn">
        <div>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-black"
          >
            ✖
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2 justify-start items-center w-64">
            <Input
              id="role"
              type="text"
              placeholder="Enter role name"
              value={role}
              onChange={handleRoleChange}
              className="bg-[#F6EEE0] text-gray-700 px-2 rounded-md border-none"
            />
            <Button
              type="button"
              onClick={handleAddRole}
              className="bg-[#8c6b33] text-white hover:bg-[#362913] px-4 h-auto rounded-lg"
            >
              Add
            </Button>
          </div>

          <div className="flex gap-1">
            {roles.map((role, index) => (
              <div
                key={index}
                className="bg-coffee w-auto rounded-md px-2 py-[0.4px] text-white text-center"
              >
                <span className="text-sm font-light">{role}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {permissions.map((permission, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`permission-${index}`}
                  checked={roles.some((role) =>
                    (selectedPermissions[role] || []).includes(permission)
                  )}
                  onCheckedChange={() => {
                    roles.forEach((role) =>
                      handlePermissionChange(role, permission)
                    );
                  }}
                />
                <label
                  htmlFor={`permission-${index}`}
                  className="text-sm text-gray-700"
                >
                  {permission}
                </label>
              </div>
            ))}
          </div>

          <div className="w-full text-center">
            <Button
              type="submit"
              className="mt-6 bg-[#8c6b33] text-white hover:bg-[#362913] px-6 h-7 rounded-lg text-xs"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RolesAndPermissionsModal;
