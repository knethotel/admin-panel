'use client';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import CreateCouponForm from '@/components/shared/coupon-refund-management/create-coupon-form';

const EditCouponPage = () => {
  const { id } = useParams();
  let parsedData = {};

  try {
    parsedData = JSON.parse(decodeURIComponent(id as string));
  } catch (e) {
    console.error('Invalid data format in URL');
  }

  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <div className="w-full flex justify-center pt-6 mt-16">
        <CreateCouponForm mode="edit" couponId={id as string} />
      </div>
    </div>
  );
};

export default EditCouponPage;
