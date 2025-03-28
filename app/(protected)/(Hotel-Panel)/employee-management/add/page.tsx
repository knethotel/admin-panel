import AddEmployeeForm from '@/components/form/employee_management/employee-form';
import React from 'react';

const AddGuestPage = () => {
  return (
    <div className="flex justify-center items-center w-full py-10 px-6">
      <AddEmployeeForm isEnabled={true} mode="add" />
    </div>
  );
};

export default AddGuestPage;
