import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const CellAction = (props: any) => {
  const { data } = props;
  const router = useRouter();

  // Handle view transaction and redirect to the [id] page
  const handleViewTransaction = (paymentID: string) => {
    router.push(`/payment-management/view/${paymentID}`);
  };

  return (
    <>
      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        <Button
          className="p-1 rounded-md group cursor-pointer hover:bg-[#a07d3d5e]"
          onClick={() => handleViewTransaction(data.paymentID)} // Pass paymentID here
        >
          <Eye className="w-5 text-button-dark group-hover:text-white" />
        </Button>
      </div>
    </>
  );
};

export default CellAction;
