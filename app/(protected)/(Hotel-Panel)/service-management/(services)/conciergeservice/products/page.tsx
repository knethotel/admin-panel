'use client';
import React, { useState } from 'react';
import { ConciergeProductDetailsDummyData } from 'app/static/services-management/Concierge';
import Image from 'next/image';
import { Send } from 'lucide-react';
import AddItemModal from '@/components/modal/in-room_dining/add-item';
import { Switch } from '@/components/ui/switch';
const ProductDetailsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  //   const handleClick = () => {};
  return (
    <div className="mt-20 w-full">
      <AddItemModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      {/* Menu section */}
      <div className="container h-auto w-full pt-8 px-4 space-y-12">
        {ConciergeProductDetailsDummyData.map((service, index) => (
          <div key={index} className="flex flex-col gap-8 items-start">
            <h2
              className="border border-coffee border-opacity-60
             rounded-md text-lg 2xl:text-xl text-coffee/90 font-semibold px-2 py-1"
            >
              {service.serviceName}
            </h2>
            {service.productType.map((productType, index) => (
              <div key={index} className="flex flex-col items-start w-full">
                <h3 className="text-lg font-medium underline underline-offset-4 text-coffeeLight">
                  {productType.productTypeName}
                </h3>
                {productType.products.map((product, index) => (
                  <div
                    key={index}
                    className="flex w-full flex-col gap-2 items-center justify-center"
                  >
                    <div
                      key={index}
                      className="w-full flex justify-between py-4 items-center"
                    >
                      {/* Product details */}
                      <div className="flex flex-col gap-2 max-w-44 w-80 text-xs 2xl:text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-sm 2xl:text-base font-bold">
                            Visibility
                          </span>
                          <Switch className="h-4 w-11" />
                        </div>
                        <p className="text-sm 2xl:text-base font-medium">
                          {product.name}
                        </p>
                        <span className="text-xs 2xl:text-sm opacity-70">
                          ₹{product.price}
                        </span>{' '}
                        <Send className="h-4 w-4 mt-3" />{' '}
                      </div>

                      {/* Product image */}
                      <div>
                        <Image
                          src={product.image}
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
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
