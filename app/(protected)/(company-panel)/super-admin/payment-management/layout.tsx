'use client';
import React, { useState } from 'react';
import CreateCouponModal from '@/components/shared/payment-management/create-coupon-modal';
import { useRouter } from 'next/navigation';

const PaymentManagementPage = ({ children }: { children: React.ReactNode }) => {
  const [activeButton, setActiveButton] = useState<'coupons' | 'refund' | null>(
    'coupons'
  ); // Default to 'coupons'
  const [selectedOption, setSelectedOption] = useState<string>('coupons'); // Default to 'create-coupon'
  const [isCreateCouponModalOpen, setIsCreateCouponModalOpen] = useState(false);
  const router = useRouter();
  const handleButtonClick = (value: 'coupons' | 'refund') => {
    setSelectedOption(value);
    setActiveButton(value);

    if (value === 'coupons') {
      router.push('/super-admin/payment-management'); // Redirect to base path
    } else {
      router.push('/super-admin/payment-management/refund'); // Redirect to refund page
    }
  };

  return (
    <div className="h-screen w-full space-y-6 relative">
      <div className="flex flex-col items-center gap-2">
        <div className="w-[50%] fixed h-12 text-base flex justify-evenly rounded-b-xl items-center px-2 bg-[#EFE9DF]">
          <button
            className={`border hover:bg-coffeeLight hover:text-white px-3 rounded-md ${
              activeButton === 'coupons'
                ? 'bg-[#281F0F] text-white'
                : 'bg-transparent text-[#281F0F]'
            }`}
            onClick={() => handleButtonClick('coupons')}
          >
            Coupons
          </button>
          <button
            className={`border hover:bg-coffeeLight hover:text-white px-3 rounded-md ${
              activeButton === 'refund'
                ? 'bg-[#281F0F] text-white'
                : 'bg-transparent text-[#281F0F]'
            }`}
            onClick={() => handleButtonClick('refund')}
          >
            Refund
          </button>
        </div>
        <CreateCouponModal
          isOpen={isCreateCouponModalOpen}
          onClose={() => setIsCreateCouponModalOpen(false)}
        />
        {children}
      </div>
    </div>
  );
};

export default PaymentManagementPage;
