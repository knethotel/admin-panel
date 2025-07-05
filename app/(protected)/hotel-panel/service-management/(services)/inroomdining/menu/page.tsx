

'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Bookmark, Send } from 'lucide-react';
import Image from 'next/image';
import AddItemModal from '@/components/modal/in-room_dining/add-item';
import apiCall from '@/lib/axios';

const vegIcon = '/icons/veg.png';
const nonVegIcon = '/icons/non-veg.png';

type ProductType = {
  _id: string;
  HotelId: string;
  productType: string;
  productName: string;
  description: string;
  cost: number;
  foodType: 'vegetarian' | 'non-vegetarian';
  visibility: boolean;
  imageUrl: string;
};

const MenuPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuData, setMenuData] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMenuData = async () => {
    try {
      setLoading(true);
      const res = await apiCall('GET', 'api/services/inroomdining/products');
      if (res.success) {
        setMenuData(res.data || []);
      } else {
        setError('Failed to load menu items');
      }
    } catch (err) {
      console.error('Error fetching menu:', err);
      setError('Something went wrong while fetching menu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  return (
    <div className="mt-20">
      <div className="flex items-center justify-between px-4 py-2">
        <h2 className="font-bold text-lg">Menu</h2>
        <Button onClick={() => setIsOpen(true)} className="btn-primary flex gap-1">
          <Plus className="w-4 h-4 text-white group-hover:text-black" />
          <span>Add Items</span>
        </Button>
      </div>

      <AddItemModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Loading/Error */}
      {loading ? (
        <div className="text-center py-6">Loading menu...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-6">{error}</div>
      ) : (
        <div className="h-auto w-full pt-8 px-4 space-y-12">
          {menuData.map((item) => (
            <div key={item._id} className="flex w-full flex-col gap-2 items-center justify-center">
              <div className="w-full flex justify-between items-center">
                {/* Left: Product Details */}
                <div className="flex flex-col gap-1 w-80">
                  <h3 className="opacity-60 text-2xl font-bold capitalize">{item.productType}</h3>
                  <div className="py-3">
                    {/* <Image
                      src={item.foodType === 'vegetarian' ? vegIcon : nonVegIcon}
                      height={20}
                      width={20}
                      alt={`${item.foodType} symbol`}
                    /> */}
                  </div>
                  <h4 className="font-semibold text-xl">{item.productName}</h4>
                  <span className="text-[#A07D3D] text-lg">₹{item.cost}</span>
                  <p className="text-xs 2xl:text-lg">{item.description}</p>
                  <span className="flex gap-4 pt-2 justify-start">
                    <Bookmark className="h-3 w-3 text-black" />
                    <Send className="h-3 w-3 text-black" />
                  </span>
                </div>

                {/* Right: Product Image */}
                <div>
                  <Image
                    src={item.imageUrl}
                    height={200}
                    width={180}
                    className="rounded-lg object-cover"
                    alt="Product image"
                  />
                </div>
              </div>
              <div className="h-[0.5px] bg-black opacity-30 w-full"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuPage;
