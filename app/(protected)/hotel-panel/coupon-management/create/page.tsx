import Navbar from '@/components/Navbar';
import CreateCouponForm from '@/components/shared/coupon-refund-management/create-coupon-form';

const CreateCouponPage = () => {
  return (
    <>
      <div className="flex flex-col w-full">
        <Navbar />
        <div className="w-full flex justify-center pt-6 mt-16">
          <CreateCouponForm />
        </div>
      </div>
    </>
  );
};

export default CreateCouponPage;
