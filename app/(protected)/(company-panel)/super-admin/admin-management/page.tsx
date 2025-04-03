import { AdminTable } from '@/components/COMPANY_COMPONENTS/admin-management/tables/client';
import Navbar from '@/components/Navbar';
import React from 'react';

const EmployeeManagementPage = () => {
  return (
    <div className="flex flex-col w-full">
      {' '}
      {/*------ Manadatory class for each page that have navbar -------*/}
      <Navbar active={true} search={true} />
      <div className=" sm:px-6 sm:py-0 mt-24">
        <AdminTable />
      </div>
    </div>
  );
};

export default EmployeeManagementPage;
