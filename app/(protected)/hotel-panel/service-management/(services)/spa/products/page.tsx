'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Send } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { axios } from '@/lib/axios';

interface AdditionalService {
  name: string;
  price: number;
  _id: string;
}

interface Product {
  _id: string;
  hotelId: string;
  serviceType: string;
  productCategory: string;
  productName: string;
  price: number;
  description: string;
  imageUrl?: string;
  additionalServices: AdditionalService[];
  __v: number;
}

interface GroupedProducts {
  [serviceType: string]: {
    [category: string]: Product[];
  };
}
const ProductDetailsPage = () => {
  const [products, setProducts] = useState<GroupedProducts>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('api/services/spasalon/products');
        const data = response.data;
        
        // Group products by serviceType and productCategory
        const grouped: GroupedProducts = {};
        
        data.forEach((product: Product) => {
          const { serviceType, productCategory } = product;
          
          if (!grouped[serviceType]) {
            grouped[serviceType] = {};
          }
          
          if (!grouped[serviceType][productCategory]) {
            grouped[serviceType][productCategory] = [];
          }
          
          grouped[serviceType][productCategory].push(product);
        });
        
        setProducts(grouped);
      } catch (err: any) {
        console.error('Error fetching products:', err);
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="mt-20 w-full flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-coffee"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 w-full text-center text-red-500 p-8">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="mt-20 w-full">
      <div className="h-auto w-full pt-8 px-8 space-y-12">
        {Object.entries(products).map(([serviceType, categories]) => (
          <div key={serviceType} className="flex flex-col gap-8 items-start">
            <h2 className="border border-coffee border-opacity-60 rounded-md text-lg 2xl:text-xl text-coffee/90 font-semibold px-2 py-1">
              {serviceType} Services
            </h2>
            
            {Object.entries(categories).map(([category, products]) => (
              <div key={category} className="flex flex-col items-start w-full">
                <h3 className="text-lg font-medium underline underline-offset-4 text-coffeeLight">
                  {category}
                </h3>
                
                {products.map((product) => (
                  <div key={product._id} className="flex w-full flex-col gap-2 items-center justify-center">
                    <div className="w-full flex justify-between py-4 items-center">
                      {/* Product details */}
                      <div className="flex flex-col gap-2 w-80 text-xs 2xl:text-sm">
                        <div className="flex justify-between max-w-44 items-center">
                          <span className="text-sm 2xl:text-base font-bold">
                            Visibility
                          </span>
                          <Switch className="h-4 w-11" />
                        </div>
                        <p className="text-sm 2xl:text-base font-medium">
                          {product.productName}
                        </p>
                        <span className="text-xs 2xl:text-sm opacity-70">
                          ₹{product.price}
                        </span>
                        <p className="text-xs 2xl:text-sm text-wrap">
                          {product.description}
                        </p>
                        {product.additionalServices.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs font-medium mb-1">Additional Services:</p>
                            <ul className="space-y-1">
                              {product.additionalServices.map((service) => (
                                <li key={service._id} className="text-xs opacity-80">
                                  • {service.name} (+₹{service.price})
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <Send className="h-4 w-4 mt-3" />
                      </div>

                      {/* Product image */}
                      <div>
                        <Image
                          src={product.imageUrl || '/placeholder-product.jpg'}
                          height={180}
                          width={150}
                          className="rounded-lg object-cover h-32 w-32 hover:scale-105 duration-200 ease-in-out"
                          alt={product.productName}
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
