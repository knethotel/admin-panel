import React from 'react';
import {
  serviceManagementHomePageData,
  ServiceManagementHomePageDataType
} from 'app/static/ServiceManagementData';
import Image from 'next/image';
import ToggleButton from '@/components/ui/toggleButton';
const ServiceManagementPage = () => {
  return (
    <div className="overflow-hidden flex flex-col justify-evenly py-4 gap-10">
      <h1 className="lg:text-3xl xl:text-4xl font-bold text-[#281F0F] px-6">
        Service Management
      </h1>
      <div className="w-full grid grid-cols-4 gap-8 px-6">
        {/* Carousel of services */}
        {serviceManagementHomePageData.map(
          (item: ServiceManagementHomePageDataType) => (
            <div
              key={item.id}
              className="flex flex-col gap-2 group cursor-pointer"
            >
              {/* image */}
              <div>
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
                <h2 className="bg-[#EFE9DF] px-2 py-1 text-sm rounded-lg group-hover:bg-[#453519] group-hover:text-white transition-all duration-300">
                  {item.name}
                </h2>
                <ToggleButton />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ServiceManagementPage;
