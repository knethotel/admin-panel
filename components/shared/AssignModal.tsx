'use client';
import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import apiCall from '@/lib/axios';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface AssignModalProps {
  onClose: () => void;
  onAssign?: (employeeId: string) => void;
  title?: string;
  requestId?: string;
}

const AssignModal = ({
  onClose,
  onAssign,
  title = 'Assign Request',
  requestId
}: AssignModalProps) => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [assigning, setAssigning] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const result = await apiCall('GET', 'api/employee/');
      if (result.status) {
        setEmployees(result.employees);
      } else {
        setEmployees([]);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (requestId) {
      fetchEmployees();
      setSelectedEmployee('');
      setEstimatedTime('');
    }
  }, [requestId]);

  const handleAssign = async () => {
    if (assigning) return;
    if (!selectedEmployee || !estimatedTime) return;

    setAssigning(true);
    try {
      const result = await apiCall(
        'PUT',
        `api/services/assignEmployee/${requestId}`,
        {
          adminId: selectedEmployee,
          ETOD: Number(estimatedTime)
        }
      );

      if (result.success) {
        onAssign?.(selectedEmployee);
        onClose();
        window.location.reload();
      }
    } catch (error) {
      console.error('Error assigning request:', error);
    } finally {
      setAssigning(false);
    }
  };

  return (
    <Dialog.Root open={requestId !== undefined} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg w-full max-w-xl">
          <Dialog.Title className="sr-only">{title}</Dialog.Title>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-gray-700">
              <h3 className="text-lg font-semibold">{title}</h3>
              <Dialog.Close className="text-gray-400 hover:text-gray-500">
                <X size={20} />
              </Dialog.Close>
            </div>

            <div className="flex items-center gap-6 w-full">
              <label
                htmlFor="employeeName"
                className="text-sm text-gray-900 whitespace-nowrap"
              >
                Employee name
              </label>
              <Select
                onValueChange={setSelectedEmployee}
                value={selectedEmployee}
              >
                <SelectTrigger className="w-full bg-[#F6EEE0] text-gray-700 p-2 rounded-md border-none">
                  <SelectValue placeholder="Select Employee" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 opacity-50"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </SelectTrigger>
                <SelectContent className="bg-[#362913] rounded-2xl text-white border-2 shadow-md border-white">
                  {loading ? (
                    <SelectItem value="loading" disabled>
                      Loading...
                    </SelectItem>
                  ) : employees.length === 0 ? (
                    <SelectItem value="no-employees" disabled>
                      No employees found
                    </SelectItem>
                  ) : (
                    employees.map((employee) => (
                      <SelectItem key={employee._id} value={employee._id}>
                        {employee.firstName} {employee.lastName}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-6 w-full">
              <label
                htmlFor="estimatedTime"
                className="text-sm text-gray-900 whitespace-nowrap"
              >
                Estimated time (in minutes)
              </label>
              <input
                id="estimatedTime"
                type="number"
                min={1}
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
                className="p-2 rounded-md border bg-[#F6EEE0] text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-[#A07D3D]"
                placeholder="Enter minutes (e.g., 5, 30, 90)"
                aria-label="Estimated time in minutes"
              />
            </div>

            <button
              type="submit"
              onClick={handleAssign}
              className="mt-4 bg-[#A07D3D] text-white p-2 rounded-md"
              disabled={!selectedEmployee || assigning}
            >
              {assigning ? 'Assigning...' : 'Update'}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AssignModal;
