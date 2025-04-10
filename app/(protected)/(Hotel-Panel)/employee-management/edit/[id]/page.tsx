import EmployeeForm from '@/components/form/employee_management/employee-form';
import React from 'react';

type Params = {
  id: string;
};

const EditGuestPage = async ({
  params
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  return (
    <div className="flex justify-center items-center h-screen w-full pt-8">
      <div className="h-full w-full container">
        <EmployeeForm isEnabled={true} employeeID={id} mode="edit" />
      </div>
    </div>
  );
};

export default EditGuestPage;
