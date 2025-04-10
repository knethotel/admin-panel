import AddEmployeeForm from '@/components/form/employee_management/employee-form';
import React from 'react';

const AddGuestPage = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full pt-8">
      <div className="h-full w-full container">
        <AddEmployeeForm isEnabled={true} mode="add" />
      </div>
    </div>
  );
};

export default AddGuestPage;
