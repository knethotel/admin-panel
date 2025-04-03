import AdminForm from '@/components/SUPER-ADMIN-COMPONENTS/admin-management/form/admin-form';
import React from 'react';
type Params = {
  id: string;
};
const ViewAdminPage = async ({
  params
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  return (
    <div className="flex justify-center items-center w-full py-10 px-6">
      <AdminForm adminID={id} mode="view" />
    </div>
  );
};

export default ViewAdminPage;
