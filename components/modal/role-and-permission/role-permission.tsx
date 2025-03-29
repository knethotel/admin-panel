'use client';
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

type Mode = 'add' | 'edit' | 'view';
type RolesAndPermissions = Record<string, string[]>;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: Mode;
  existingRolesAndPermissions?: RolesAndPermissions;
  onSave: (data: RolesAndPermissions) => void;
}

const RolesAndPermissionsModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  mode = 'add',
  existingRolesAndPermissions = {},
  onSave
}) => {
  const [role, setRole] = useState<string>('');
  const [roles, setRoles] = useState<string[]>([]);
  const [selectedPermissions, setSelectedPermissions] =
    useState<RolesAndPermissions>({});
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' || mode === 'view') {
        const roleKeys = Object.keys(existingRolesAndPermissions);
        setRoles(roleKeys);
        setSelectedPermissions(existingRolesAndPermissions);
        setSelectedRole(roleKeys[0] || null);
        if (roleKeys[0]) setRole(roleKeys[0]);
      } else {
        setRoles([]);
        setSelectedPermissions({});
        setSelectedRole(null);
        setRole('');
      }
      setError(null);
    }
  }, [isOpen, mode, existingRolesAndPermissions]);

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);
    setError(null);
  };

  const handleAddRole = () => {
    if (!role.trim()) {
      setError('Role name cannot be empty!');
      return;
    }
    if (roles.includes(role) && mode === 'add') {
      setError('Role already exists!');
      return;
    }

    if (mode === 'edit' && selectedRole) {
      // Handle role name change in edit mode
      const updatedPermissions = { ...selectedPermissions };
      const permissions = updatedPermissions[selectedRole] || [];
      delete updatedPermissions[selectedRole];
      updatedPermissions[role] = permissions;

      setSelectedPermissions(updatedPermissions);
      setRoles(Object.keys(updatedPermissions));
      setSelectedRole(role);
    } else {
      // Add new role
      setRoles([...roles, role]);
      setSelectedPermissions((prev) => ({ ...prev, [role]: [] }));
      setSelectedRole(role);
    }
    setRole('');
  };

  const handleDeleteRole = (roleToDelete: string) => {
    const updatedRoles = roles.filter((r) => r !== roleToDelete);
    setRoles(updatedRoles);

    const updatedPermissions = { ...selectedPermissions };
    delete updatedPermissions[roleToDelete];
    setSelectedPermissions(updatedPermissions);

    setSelectedRole(updatedRoles[0] || null);
  };

  const handlePermissionChange = (permission: string) => {
    if (!selectedRole || mode === 'view') return;

    setSelectedPermissions((prev) => {
      const rolePermissions = prev[selectedRole] || [];
      const updatedPermissions = rolePermissions.includes(permission)
        ? rolePermissions.filter((p) => p !== permission)
        : [...rolePermissions, permission];

      return { ...prev, [selectedRole]: updatedPermissions };
    });
  };

  const handleRoleClick = (role: string) => {
    setSelectedRole(role);
    if (mode === 'edit') {
      setRole(role);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.keys(selectedPermissions).length === 0) {
      setError('Please add at least one role!');
      return;
    }

    onSave(selectedPermissions);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-[#FAF6EF] rounded-lg shadow-lg px-6 pb-6 pt-4 flex flex-col gap-6 w-full max-w-3xl relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          aria-label="Close modal"
        >
          ✖
        </button>

        <h2 className="text-xl font-semibold text-gray-800">
          {mode === 'add' && 'Add New Role'}
          {mode === 'edit' && 'Edit Role'}
          {mode === 'view' && 'View Role'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode !== 'view' && (
            <div className="flex gap-2 justify-start items-center w-full max-w-md">
              <div className="flex-1">
                <Input
                  id="role"
                  type="text"
                  placeholder="Enter role name"
                  value={role}
                  onChange={handleRoleChange}
                  className="bg-[#F6EEE0] text-gray-700 px-2 rounded-md border-none"
                />
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
              </div>
              <Button
                type="button"
                onClick={handleAddRole}
                className="bg-[#8c6b33] text-white hover:bg-[#362913] px-4 h-auto rounded-lg"
              >
                {mode === 'edit' ? 'Update Role' : 'Add Role'}
              </Button>
            </div>
          )}

          <div className="flex gap-2 py-4 overflow-x-auto hide-scrollbar">
            {roles.map((r) => (
              <div key={r} className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleRoleClick(r)}
                  className={`relative rounded-md px-3 py-1 hover:text-goldenYellow hover:bg-coffee text-white ${
                    selectedRole === r ? 'bg-coffee' : 'bg-[#8c6b33]'
                  } hover:bg-[#362913] transition-colors`}
                >
                  {r}
                  {selectedRole === r && (
                    <span
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 
                      border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent 
                      border-t-coffee"
                    />
                  )}
                </button>
                {mode !== 'view' && (
                  <button
                    type="button"
                    onClick={() => handleDeleteRole(r)}
                    className="text-red-500 hover:text-red-700"
                    aria-label={`Delete role ${r}`}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          {selectedRole && (
            <div className="bg-[#F6EEE0] p-4 rounded-lg">
              <h3 className="font-medium mb-3">
                Permissions for:{' '}
                <span className="text-[#8c6b33]">{selectedRole}</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {permissions.map((permission) => (
                  <div key={permission} className="flex items-center space-x-2">
                    <Checkbox
                      id={`permission-${permission}`}
                      checked={
                        selectedRole
                          ? (selectedPermissions[selectedRole] || []).includes(
                              permission
                            )
                          : false
                      }
                      onCheckedChange={() => handlePermissionChange(permission)}
                      disabled={mode === 'view'}
                    />
                    <label
                      htmlFor={`permission-${permission}`}
                      className="text-sm text-gray-700"
                    >
                      {permission}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {mode !== 'view' && (
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-gray-800 hover:bg-gray-400 px-6 h-7 rounded-lg text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#8c6b33] text-white hover:bg-[#362913] px-6 h-7 rounded-lg text-xs"
                disabled={Object.keys(selectedPermissions).length === 0}
              >
                Save Changes
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RolesAndPermissionsModal;
