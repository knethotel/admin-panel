import ManageProductsModal from '@/components/modal/order-management/ManageProductsModal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const SelectInput = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex gap-2">
      <Button className="bg-[#A07D3D] text-white hover:text-black hover:outline">
        {' '}
        <Plus className="w-5 h-5 text-black" />
        Add Menu
      </Button>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-[#A07D3D] text-white hover:text-black hover:outline"
      >
        Manage Products
      </Button>
      <ManageProductsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default SelectInput;
