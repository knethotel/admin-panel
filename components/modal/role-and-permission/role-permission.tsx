'use client';
import React, { useState, useEffect } from 'react';
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
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [finalRolesAndPermissions, setFinalRolesAndPermissions] = useState<{
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
      setSelectedRole(role);
      setRole('');
    }
  };

  const handlePermissionChange = (permission: string) => {
    if (!selectedRole) return;

    setSelectedPermissions((prev) => {
      const rolePermissions = prev[selectedRole] || [];
      const updatedPermissions = rolePermissions.includes(permission)
        ? rolePermissions.filter((p) => p !== permission)
        : [...rolePermissions, permission];

      return { ...prev, [selectedRole]: updatedPermissions };
    });
  };

  const handleRoleClick = (role: string) => {
    setSelectedRole(role === selectedRole ? null : role);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Store submitted roles and permissions
    setFinalRolesAndPermissions(selectedPermissions);

    // Reset temporary states
    setRoles([]);
    setSelectedPermissions({});
    setSelectedRole(null);
    setRole('');

    console.log('Submitted Roles and Permissions:', selectedPermissions);
  };

  useEffect(() => {
    if (roles.length > 0 && !selectedRole) {
      setSelectedRole(roles[roles.length - 1]);
    }
  }, [roles, selectedRole]);

  useEffect(() => {
    console.log(
      'Updated Final Roles and Permissions:',
      finalRolesAndPermissions
    );
  }, [finalRolesAndPermissions]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-[#FAF6EF] rounded-lg shadow-lg px-6 pb-6 pt-4 flex flex-col gap-6 w-full max-w-3xl relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✖
        </button>

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

          <div className="flex gap-2 py-4 overflow-x-auto hide-scrollbar">
            {roles.map((role, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleRoleClick(role)}
                className={`relative w-auto rounded-md px-2 py-1 hover:text-goldenYellow hover:bg-coffee text-white text-center ${
                  selectedRole === role ? 'bg-coffee' : 'bg-[#8c6b33]'
                } hover:bg-[#362913] transition-colors`}
              >
                <span className="text-sm">{role}</span>
                {selectedRole === role && (
                  <span
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 
                    border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent 
                    border-t-coffee"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {permissions.map((permission, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`permission-${index}`}
                  checked={
                    selectedRole
                      ? (selectedPermissions[selectedRole] || []).includes(
                          permission
                        )
                      : false
                  }
                  onCheckedChange={() => handlePermissionChange(permission)}
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
