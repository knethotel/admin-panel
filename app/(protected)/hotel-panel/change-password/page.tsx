import ChangePasswordForm from '@/components/shared/change-password/form';
import React from 'react';

const ChangePasswordPage = () => {
  return (
    <div className="flex justify-center items-center h-full w-full pt-5">
      <div className="h-full w-full container">
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default ChangePasswordPage;
