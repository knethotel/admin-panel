import { Button } from '@/components/ui/button';
import ToggleButton from '@/components/ui/toggleButton';
import { Edit, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const CellAction = (props: any) => {
  const { data } = props;
  console.log(data.guestId);

  const router = useRouter();

  const handleViewUser = () => {
    router.push(`/super-admin/complaint-management/view/${data.complaintID}`);
  };

  return (
    <>
      {/* Action Buttons */}
      <div className="flex items-center space-x-4">
        <ToggleButton />
        <Button
          onClick={() => handleViewUser()}
          className="p-1 rounded-md hover:bg-[#b6a27c5e]"
        >
          <Eye className=" w-5 text-button-dark" />
        </Button>
      </div>
    </>
  );
};

export default CellAction;
