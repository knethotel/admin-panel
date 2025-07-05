// 'use client';
// import React, { useState } from 'react';
// import { ConciergeProductDetailsDummyData } from 'app/static/services-management/Concierge';
// import Image from 'next/image';
// import { Send } from 'lucide-react';
// import AddItemModal from '@/components/modal/in-room_dining/add-item';
// import { Switch } from '@/components/ui/switch';
// const ProductDetailsPage = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   //   const handleClick = () => {};
//   return (
//     <div className="mt-20 w-full">
//       <AddItemModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
//       {/* Menu section */}
//       <div className="container h-auto w-full pt-8 px-4 space-y-12">
//         {ConciergeProductDetailsDummyData.map((service, index) => (
//           <div key={index} className="flex flex-col gap-8 items-start">
//             <h2
//               className="border border-coffee border-opacity-60
//              rounded-md text-lg 2xl:text-xl text-coffee/90 font-semibold px-2 py-1"
//             >
//               {service.serviceName}
//             </h2>
//             {service.productType.map((productType, index) => (
//               <div key={index} className="flex flex-col items-start w-full">
//                 <h3 className="text-lg font-medium underline underline-offset-4 text-coffeeLight">
//                   {productType.productTypeName}
//                 </h3>
//                 {productType.products.map((product, index) => (
//                   <div
//                     key={index}
//                     className="flex w-full flex-col gap-2 items-center justify-center"
//                   >
//                     <div
//                       key={index}
//                       className="w-full flex justify-between py-4 items-center"
//                     >
//                       {/* Product details */}
//                       <div className="flex flex-col gap-2 max-w-44 w-80 text-xs 2xl:text-sm">
//                         <div className="flex justify-between items-center">
//                           <span className="text-sm 2xl:text-base font-bold">
//                             Visibility
//                           </span>
//                           <Switch className="h-4 w-11" />
//                         </div>
//                         <p className="text-sm 2xl:text-base font-medium">
//                           {product.name}
//                         </p>
//                         <span className="text-xs 2xl:text-sm opacity-70">
//                           ₹{product.price}
//                         </span>{' '}
//                         <Send className="h-4 w-4 mt-3" />{' '}
//                       </div>

//                       {/* Product image */}
//                       <div>
//                         <Image
//                           src={product.image}
//                           height={180}
//                           width={150}
//                           className="rounded-lg object-cover hover:scale-105 duration-200 ease-in-out"
//                           alt="Product image"
//                         />
//                       </div>
//                     </div>
//                     <div className="h-[0.5px] bg-black opacity-30 w-full"></div>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductDetailsPage;


'use client';
import React, { useEffect, useState } from 'react';
import apiCall from '@/lib/axios';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';

interface ConciergeItem {
  _id: string;
  name: string;
  description: string;
  category: string;
  serviceType: string;
  distance: number;
  imageUrl?: string;
}

const ProductDetailsPage = () => {
  const [items, setItems] = useState<Record<string, ConciergeItem[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConciergeItems = async () => {
      try {
        const res = await apiCall('GET', '/api/services/concierge/items/admin');
        if (res.success) {
          setItems(res.data || {});
        }
      } catch (error) {
        console.error('Failed to fetch concierge items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConciergeItems();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading concierge items...</div>;
  }

  return (
    <div className="mt-20 w-full px-4">
      {Object.entries(items).map(([serviceType, products]) => (
        <div key={serviceType} className="mb-12 space-y-6">
          <h2 className="text-xl text-coffee font-semibold border-b pb-1 border-coffee/40">
            {serviceType}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-[#FAF6EF] border border-[#E6D6C2] rounded-xl shadow-sm p-4 flex flex-col gap-4 hover:shadow-md transition duration-200"
              >
                <div className="w-full h-40 overflow-hidden rounded-md">
                  <Image
                    src={product.imageUrl || '/fallback.png'}
                    alt={product.name}
                    width={400}
                    height={160}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-[#4B3F2F]">{product.name}</h3>
                  <Switch className="h-4 w-11" />
                </div>

                <p className="text-sm text-gray-600">{product.description}</p>

                <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                  <div>
                    <span className="font-semibold text-[#4B3F2F]">Category:</span> {product.category}
                  </div>
                  <div>
                    <span className="font-semibold text-[#4B3F2F]">Distance:</span> {product.distance} km
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDetailsPage;
