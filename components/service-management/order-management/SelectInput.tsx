import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const SelectInput = () => {
  return (
    <div className="flex gap-2">
      <Button className="bg-[#A07D3D] text-white hover:text-black hover:outline">
        {' '}
        <Plus className="w-5 h-5 text-black" />
        Add Menu
      </Button>
      <Button className="bg-[#A07D3D] text-white hover:text-black hover:outline">
        Manage Products
      </Button>
    </div>
  );
};

export default SelectInput;
