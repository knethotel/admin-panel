import { Button } from '@/components/ui/button';
import ToggleButton from '@/components/ui/toggleButton';
import { Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const CellAction = (props: any) => {
  const { data } = props;
  console.log(data.employeeID);
  const router = useRouter();

  const handleEditUser = () => {
    router.push(`admin-management/edit/${data.employeeID}`);
    console.log('success');
  };

  return (
    <>
      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        {/* Edit User */}
        <Button
          onClick={() => handleEditUser()}
          className="p-3 rounded-md group cursor-pointer hover:bg-[#a07d3d5e]"
        >
          <Edit className=" w-4 text-button-dark group-hover:text-white" />
        </Button>
        <ToggleButton />
      </div>
    </>
  );
};

export default CellAction;
