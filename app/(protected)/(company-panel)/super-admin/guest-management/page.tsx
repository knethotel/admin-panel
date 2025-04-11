import { CompanyPanelGuestManagementHome } from '@/components/COMPANY_COMPONENTS/guest_management/table/client';
import React from 'react';

const GuestManagementPage = () => {
  return (
    <div className="w-full h-screen pt-8">
      <div className="h-full w-full container">
        <CompanyPanelGuestManagementHome />
      </div>
    </div>
  );
};

export default GuestManagementPage;
