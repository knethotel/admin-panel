'use client';
import React, { useEffect, useState } from 'react';
import {
  serviceManagementHomePageData,
  ServiceManagementHomePageDataType
} from 'app/static/ServiceManagementData';
import Image from 'next/image';
import ToggleButton from '@/components/ui/toggleButton';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
const ServiceManagementPage = () => {
  const router = useRouter();
  const [highlightedServiceId, setHighlightedServiceId] = useState<
    number | null
  >(null);

  const handleNavigation = (path: string, serviceId: number) => {
    localStorage.setItem('lastClickedService', serviceId.toString());
    router.push(path);
  };

  useEffect(() => {
    const lastClickedService = localStorage.getItem('lastClickedService');
    if (lastClickedService) {
      setHighlightedServiceId(Number(lastClickedService));
      setTimeout(() => {
        setHighlightedServiceId(null);
        localStorage.removeItem('lastClickedService');
      }, 10000);
    }
  }, []);

  return (
    <div className="flex flex-col w-full">
      <Navbar active={true} search={true} />
      <div className="overflow-hidden flex flex-col justify-evenly py-4 gap-6 mt-20">
        <h1 className="lg:text-3xl xl:text-4xl font-bold text-[#281F0F] px-6">
          Service Management
        </h1>
        <div className="w-full grid grid-cols-4 gap-8 px-6">
          {/* Carousel of services */}
          {serviceManagementHomePageData.map(
            (item: ServiceManagementHomePageDataType) => (
              <div
                key={item.id}
                className={`flex flex-col gap-2 group cursor-pointer ${
                  highlightedServiceId === item.id
                    ? 'shadow-sm bg-gray-100 rounded-md'
                    : ''
                }`}
              >
                {/* image */}
                <div onClick={() => handleNavigation(item.href, item.id)}>
                  <Image
                    src={item.imgSrc}
                    alt={`${item.name} image`}
                    height={1000}
                    width={1000}
                    quality={100}
                  />
                </div>
                {/* title and toggle button*/}
                <div className="w-full flex justify-between items-center">
                  <h2
                    onClick={() => handleNavigation(item.href, item.id)}
                    className={`px-2 py-1 text-sm rounded-lg group-hover:bg-[#453519] group-hover:text-white transition-all duration-300 ${highlightedServiceId === item.id ? 'bg-[#453519] text-white' : 'bg-[#EFE9DF] '}`}
                  >
                    {item.name}
                  </h2>
                  <ToggleButton />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceManagementPage;
