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
    <div className="flex justify-center items-center w-full py-10 px-6">
      <EmployeeForm isEnabled={true} employeeID={id} mode="edit" />
    </div>
  );
};

export default EditGuestPage;
