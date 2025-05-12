// AnalyticsReportsPage.tsx
'use client';

import Navbar from '@/components/Navbar';
import Image from 'next/image';
import ToggleButton from '@/components/ui/toggleButton';
import { Heading } from '@/components/ui/heading';

const AnalyticsReportsPage = () => {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <div className="overflow-hidden flex flex-col justify-evenly py-4 mt-20">
        <Heading
          title="Analytics and Reports"
          className="px-6 mt-0 md:mt-0 md:py-0"
        />
        <div className="w-full grid grid-cols-4 gap-8 px-6">
          <div
            className={`flex flex-col gap-2 group cursor-pointer
              `}
          >
            <div>
              <Image
                src={'/sales.png'}
                alt={`image`}
                height={1000}
                width={1000}
                quality={100}
              />
            </div>

            <div className="w-full flex justify-between items-center">
              <h2
                className={`px-2 py-1 text-sm rounded-lg group-hover:bg-[#453519] group-hover:text-white transition-all duration-300 
                    `}
              >
                Sales
              </h2>
              <ToggleButton />
            </div>
          </div>
          <div
            className={`flex flex-col gap-2 group cursor-pointer
              `}
          >
            <div>
              <Image
                src={'/homekeeper.png'}
                alt={`image`}
                height={1000}
                width={1000}
                quality={100}
              />
            </div>

            <div className="w-full flex justify-between items-center">
              <h2
                className={`px-2 py-1 text-sm rounded-lg group-hover:bg-[#453519] group-hover:text-white transition-all duration-300 
                    `}
              >
                HOUSEKEEPING REPORTS
              </h2>
              <ToggleButton />
            </div>
          </div>
          <div
            className={`flex flex-col gap-2 group cursor-pointer
              `}
          >
            <div>
              <Image
                src={'/finanace.png'}
                alt={`image`}
                height={1000}
                width={1000}
                quality={100}
              />
            </div>

            <div className="w-full flex justify-between items-center">
              <h2
                className={`px-2 py-1 text-sm rounded-lg group-hover:bg-[#453519] group-hover:text-white transition-all duration-300 
                    `}
              >
                FINANCIAL REPORTS
              </h2>
              <ToggleButton />
            </div>
          </div>
          <div
            className={`flex flex-col gap-2 group cursor-pointer
              `}
          >
            <div>
              <Image
                src={'/customer.png'}
                alt={`image`}
                height={1000}
                width={1000}
                quality={100}
              />
            </div>

            <div className="w-full flex justify-between items-center">
              <h2
                className={`px-2 py-1 text-sm rounded-lg group-hover:bg-[#453519] group-hover:text-white transition-all duration-300 
                    `}
              >
                CUSTOMER ANALYTICS
              </h2>
              <ToggleButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReportsPage;
