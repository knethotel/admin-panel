import AdminForm from '@/components/COMPANY_COMPONENTS/admin-management/form/admin-form';
import React from 'react';

const AddAdminPage = () => {
  return (
    <div className="flex justify-center w-full pt-8">
      <div className="w-full container py-6 flex justify-center">
        <AdminForm mode="add" />
      </div>
    </div>
  );
};

export default AddAdminPage;
