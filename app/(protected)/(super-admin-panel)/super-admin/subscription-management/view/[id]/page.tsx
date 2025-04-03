import React from 'react';
import SubscriptionManagemetForm from '@/components/SUPER-ADMIN-COMPONENTS/subscription_management/form/subscription-management-form';

const ViewSubscriptionDetailsPage = async ({
  params
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  return (
    <div className="lg:h-screen w-full flex justify-center items-center px-8">
      <SubscriptionManagemetForm subscriptionID={id} mode="view" />
    </div>
  );
};

export default ViewSubscriptionDetailsPage;
