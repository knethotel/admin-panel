'use client';
import PaymentForm from '@/components/form/payment-management/payment-form';
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { ChevronDown } from 'lucide-react'; // Import ChevronDown from lucide-react

const PaymentManagementPage = () => {
  const [activeButton, setActiveButton] = useState<'coupons' | 'refund' | null>(
    'coupons'
  ); // Default to 'coupons'
  const [selectedOption, setSelectedOption] = useState<string>('create-coupon'); // Default to 'create-coupon'

  const handleButtonClick = (button: 'coupons' | 'refund') => {
    setActiveButton(button);
  };

  return (
    <div className="h-screen w-full space-y-6 relative">
      <div className="flex flex-col items-center gap-2">
        <div className="w-[50%] h-12 text-sm flex justify-evenly rounded-b-xl items-center px-2 bg-[#EFE9DF]">
          <button
            className={`border px-3 rounded-md ${
              activeButton === 'coupons'
                ? 'bg-[#281F0F] text-white'
                : 'bg-transparent text-[#281F0F]'
            }`}
            onClick={() => handleButtonClick('coupons')}
          >
            Coupons
          </button>
          <button
            className={`border px-3 rounded-md ${
              activeButton === 'refund'
                ? 'bg-[#281F0F] text-white'
                : 'bg-transparent text-[#281F0F]'
            }`}
            onClick={() => handleButtonClick('refund')}
          >
            Refund
          </button>
        </div>
        <div className="w-full flex justify-end px-4">
          <Select value={selectedOption} onValueChange={setSelectedOption}>
            <SelectTrigger className="w-[180px] bg-[#A07D3D] text-white border-none text-xs flex items-center justify-between">
              <SelectValue />
              <ChevronDown className="h-4 w-4 ml-2 text-black" />
            </SelectTrigger>
            <SelectContent className="bg-[#FAF6EF]">
              <SelectItem value="create-coupon">Create Coupon</SelectItem>
              <SelectItem value="manage-coupons">Manage Coupons</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <PaymentForm />
      </div>
    </div>
  );
};

export default PaymentManagementPage;
