import AdminForm from '@/components/COMPANY_COMPONENTS/admin-management/form/admin-form';
import React from 'react';

const AddAdminPage = () => {
  return (
    <div className="flex justify-center items-center w-full py-10 px-6">
      <AdminForm mode="add" />
    </div>
  );
};

export default AddAdminPage;
