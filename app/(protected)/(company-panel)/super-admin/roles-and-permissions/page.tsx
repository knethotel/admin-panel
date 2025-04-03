import { RolesAndPermissionHome } from '@/components/COMPANY_COMPONENTS/roles-permissions/table/client';
import Navbar from '@/components/Navbar';
import React from 'react';

const RolesAndPermissionsPage = () => {
  return (
    <div className="flex flex-col w-full">
      {' '}
      {/*------ Manadatory class for each page that have navbar -------*/}
      <Navbar active={true} search={true} />
      <div className=" sm:px-6 sm:py-0 mt-24">
        <RolesAndPermissionHome />
      </div>
    </div>
  );
};

export default RolesAndPermissionsPage;
