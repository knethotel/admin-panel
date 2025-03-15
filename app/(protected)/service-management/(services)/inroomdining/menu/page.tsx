import { Button } from '@/components/ui/button';
import React from 'react';
import { Plus } from 'lucide-react';
import { inRoomDiningMenuData } from 'app/static/services-management/InRoomDining';
import Image from 'next/image';
import { Bookmark, Send } from 'lucide-react';
const MenuPage = () => {
  return (
    <div className="mt-20">
      <div className="flex items-center justify-between px-4 py-2">
        <h2 className="font-bold text-lg">Menu</h2>
        <Button className="bg-[#A07D3D] group text-white hover:text-black hover:outline h-8">
          <Plus className="w-4 h-4 text-white group-hover:text-black" />
          Add Items
        </Button>
      </div>
      {/* Menu section */}
      <div className="h-auto w-full pt-8 px-4 space-y-12">
        {inRoomDiningMenuData.map((item, index) => (
          <div className="flex w-full flex-col gap-2 items-center justify-center">
            <div
              key={index}
              className="w-full flex justify-between items-center"
            >
              {/* Product details */}
              <div className="flex flex-col gap-1 w-80">
                <h3 className="opacity-60 text-xl">{item.productType}</h3>
                <div className="py-3">
                  {item.type === 'Vegetarian' ? (
                    <Image
                      src={item.vegIcon}
                      height={20}
                      width={20}
                      alt="vegetarian symbol"
                    />
                  ) : (
                    <Image
                      src={item.nonVegIcon}
                      height={20}
                      width={20}
                      alt="non-veg symbol"
                    />
                  )}
                </div>
                <h4 className="font-semibold">{item.productName}</h4>
                <p className="line-through text-sm opacity-60">₹{item.cost}</p>
                <span className="text-[#A07D3D] text-sm">
                  Get for ₹{item.cost - item.discount}
                </span>
                <p className="text-xs">{item.description}</p>
                <span className="flex gap-4 pt-2 justify-start">
                  <Bookmark className="h-3 w-3 text-black" />
                  <Send className="h-3 w-3 text-black" />
                  <span className="text-xs opacity-30">(Serves 1)</span>
                </span>
              </div>

              {/* Product image */}
              <div>
                <Image
                  src={item.image}
                  height={200}
                  width={180}
                  className="rounded-lg"
                  alt="Product image"
                />
              </div>
            </div>
            <div className="h-[0.5px] bg-black opacity-30 w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
