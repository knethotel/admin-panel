'use client';

import { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const options = [
  { value: 'add-menu', label: 'Add Menu' },
  { value: 'manage-products', label: 'Manage Products' }
];

const SelectInput = () => {
  const [selected, setSelected] = useState(options[0]);

  const handleOnClick = (option: { value: string; label: string }) => {
    setSelected(option);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-44 flex justify-between items-center bg-[#A07D3D] hover:bg-[#A07D3D] hover:text-white text-white px-3 py-2 rounded-lg"
        >
          <span className="flex items-center">
            {selected.value === 'add-menu' && (
              <Plus className="w-5 h-5 text-black mr-1" />
            )}
            {selected.label}
          </span>
          <ChevronDown className="w-5 h-5 text-black" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-44 border-none p-0">
        <ul className="bg-[#362913] rounded-2xl shadow-lg border-2 border-white">
          {options.map((option) => (
            <li
              key={option.value}
              className={cn(
                'flex items-center px-4 py-2 cursor-pointer text-white',
                selected.value === option.value && 'bg-[#5A4222] rounded-2xl'
              )}
              onClick={() => handleOnClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default SelectInput;
