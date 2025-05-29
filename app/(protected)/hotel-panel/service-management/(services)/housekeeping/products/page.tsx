'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Send } from 'lucide-react';
import AddItemModal from '@/components/modal/in-room_dining/add-item';
import { Switch } from '@/components/ui/switch';
import apiCall from '@/lib/axios'; // Adjust this path if needed
import PlaceholderImg from '../../../../../../../public/assets/shirtPic.png';

interface Product {
  _id: string;
  serviceType: string;
  name: string;
  category: string;
  price: number;
  image?: string;
}

interface ServiceData {
  [serviceType: string]: Product[];
}

const ProductDetailsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [housekeepingData, setHousekeepingData] = useState<ServiceData>({});

  useEffect(() => {
    (async () => {
      try {
        const response = await apiCall<{ data: ServiceData }>('get', 'api/services/housekeeping/items');
        setHousekeepingData(response.data || {});
      } catch (err) {
        console.error('Failed to fetch housekeeping items:', err);
      }
    })();
  }, []);

  return (
    <div className="mt-20 w-full">
      <AddItemModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="h-auto w-full pt-8 px-8 space-y-12">
        {Object.entries(housekeepingData).map(([serviceType, products], index) => {
          // Group by category
          const categoryMap: Record<string, Product[]> = {};
          products.forEach((product) => {
            if (!categoryMap[product.category]) categoryMap[product.category] = [];
            categoryMap[product.category].push(product);
          });

          return (
            <div key={index} className="flex flex-col gap-8 items-start">
              <h2 className="border border-coffee border-opacity-60 rounded-md text-lg 2xl:text-xl text-coffee/90 font-semibold px-2 py-1">
                {serviceType}
              </h2>
              {Object.entries(categoryMap).map(([category, items], catIdx) => (
                <div key={catIdx} className="flex flex-col items-start w-full">
                  <h3 className="text-lg font-medium underline underline-offset-4 text-coffeeLight">{category}</h3>
                  {items.map((product) => (
                    <div key={product._id} className="flex w-full flex-col gap-2 items-center justify-center">
                      <div className="w-full flex justify-between py-4 items-center">
                        <div className="flex flex-col gap-2 max-w-44 w-80 text-xs 2xl:text-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-sm 2xl:text-base font-bold">Visibility</span>
                            <Switch className="h-4 w-11" />
                          </div>
                          <p className="text-sm 2xl:text-base font-medium">{product.name}</p>
                          <span className="text-xs 2xl:text-sm opacity-70">₹{product.price}</span>
                          <Send className="h-4 w-4 mt-3" />
                        </div>
                        <div>
                          <Image
                            src={product.image || PlaceholderImg}
                            height={180}
                            width={150}
                            className="rounded-lg object-cover hover:scale-105 duration-200 ease-in-out"
                            alt="Product image"
                          />
                        </div>
                      </div>
                      <div className="h-[0.5px] bg-black opacity-30 w-full"></div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
