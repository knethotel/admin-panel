'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import {
  PercentageCouponsData,
  FixedAmountCouponsData
} from 'app/static/PaymentManagement';
import { Eye, SquarePen, Trash2 } from 'lucide-react';
import { Heading } from '@/components/ui/heading';
import { useRouter } from 'next/navigation';

const CouponManagement = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex justify-center pt-6">
      <div className="flex flex-col w-full gap-3 container">
        <div className="flex justify-between mb-2 w-full">
          <Heading title={`Coupon Management`} className="mt-0" />
          <Button
            onClick={() => router.push(`/coupon-management/create`)}
            className="btn-primary"
          >
            Create Coupon
          </Button>
        </div>
        {/* Coupon Carousel Container */}
        <div className="flex flex-col bg-[#FAF6EF] shadow-custom p-6 pb-10 w-full">
          <div className="h-full w-full flex flex-col gap-8">
            {/* Percentage coupons list */}
            <div className="space-y-2">
              <p className="inline-block font-medium">Percentage Coupons</p>
              <div className="flex gap-4 h-44 scrollbar-hide overflow-x-auto">
                {/* Coupon Card */}
                {PercentageCouponsData.map((coupon, index) => (
                  <div
                    key={index}
                    className="relative min-w-32 h-36 rounded-lg"
                  >
                    <Image
                      src={coupon.image}
                      alt="coupon image"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute overflow-hidden bottom-0 bg-[#281F0F] text-white rounded-b-lg">
                      <div className="p-2 pb-4 flex-col gap-1">
                        <h4 className="text-sm">{coupon.title}</h4>
                        <p className="text-[0.6rem] opacity-70">
                          {coupon.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="absolute w-full -bottom-6 flex justify-between">
                      <button
                        onClick={() =>
                          router.push(
                            `/coupon-management/view/${coupon.id}`
                          )
                        }
                        className="rounded-md bg-[#F6EEE0] hover:bg-[#e6dcc4]"
                      >
                        <Eye className="h-4 w-4 text-black" />
                      </button>
                      <SquarePen className="h-4 w-4" />
                      <Trash2 className="h-4 w-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Fixed amount coupons list */}
            <div className="space-y-2">
              <p className="inline-block font-medium">Fixed Amount Coupons</p>
              <div className="flex gap-4 h-44 scrollbar-hide overflow-x-auto">
                {/* Coupon Card */}
                {FixedAmountCouponsData.map((coupon, index) => (
                  <div
                    key={index}
                    className="relative min-w-32 h-36 rounded-lg"
                  >
                    <Image
                      src={coupon.image}
                      alt="coupon image"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute overflow-hidden bottom-0 bg-[#281F0F] text-white rounded-b-lg">
                      <div className="p-2 pb-4 flex-col gap-1">
                        <h4 className="text-sm">{coupon.title}</h4>
                        <p className="text-[0.6rem] opacity-70">
                          {coupon.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="absolute w-full -bottom-6 flex justify-between">
                      <button
                        onClick={() =>
                          router.push(
                            `/coupon-management/view/${coupon.id}`
                          )
                        }
                        className="rounded-md bg-[#F6EEE0] hover:bg-[#e6dcc4]"
                      >
                        <Eye className="h-4 w-4 text-black" />
                      </button>
                      <SquarePen className="h-4 w-4" />
                      <Trash2 className="h-4 w-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponManagement;
