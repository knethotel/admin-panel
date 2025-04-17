import React from 'react';
import SubscriptionManagemetForm from '@/components/COMPANY_COMPONENTS/subscription_management/form/subscription-management-form';

const ViewSubscriptionDetailsPage = async ({
  params
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  return (
    <div className="flex justify-center w-full pt-8">
      <div className="w-full container py-6 flex justify-center">
        <SubscriptionManagemetForm mode="add" />
      </div>
    </div>
  );
};

export default ViewSubscriptionDetailsPage;
