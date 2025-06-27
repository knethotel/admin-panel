// 'use client';
// import React, { useEffect, useState } from 'react';
// import {
//   serviceManagementHomePageData,
//   ServiceManagementHomePageDataType
// } from 'app/static/ServiceManagementData';
// import Image from 'next/image';
// import ToggleButton from '@/components/ui/toggleButton';
// import { useRouter } from 'next/navigation';
// import Navbar from '@/components/Navbar';
// import { Heading } from '@/components/ui/heading';
// const ServiceManagementPage = () => {
//   const router = useRouter();
//   const [highlightedServiceId, setHighlightedServiceId] = useState<
//     number | null
//   >(null);

//   const handleNavigation = (path: string, serviceId: number) => {
//     localStorage.setItem('lastClickedService', serviceId.toString());
//     router.push(path);
//   };

//   useEffect(() => {
//     const lastClickedService = localStorage.getItem('lastClickedService');
//     if (lastClickedService) {
//       setHighlightedServiceId(Number(lastClickedService));
//       setTimeout(() => {
//         setHighlightedServiceId(null);
//         localStorage.removeItem('lastClickedService');
//       }, 10000);
//     }
//   }, []);

//   return (
//     <div className="flex flex-col w-full">
//       <Navbar />
//       <div className="overflow-hidden flex flex-col justify-evenly py-4 gap-6 mt-14">
//         <Heading title="Service Management" className='px-6 mb-0 md:mb-0' />
//         <div className="w-full grid grid-cols-4 gap-8 px-6">
//           {/* Carousel of services */}
//           {serviceManagementHomePageData.map(
//             (item: ServiceManagementHomePageDataType) => (
//               <div
//                 key={item.id}
//                 className={`flex flex-col gap-2 group cursor-pointer ${highlightedServiceId === item.id
//                     ? 'shadow-sm bg-gray-100 rounded-md'
//                     : ''
//                   }`}
//               >
//                 {/* image */}
//                 <div onClick={() => handleNavigation(item.href, item.id)}>
//                   <Image
//                     src={item.imgSrc}
//                     alt={`${item.name} image`}
//                     height={1000}
//                     width={1000}
//                     quality={100}
//                   />
//                 </div>
//                 {/* title and toggle button*/}
//                 <div className="w-full flex justify-between items-center">
//                   <h2
//                     onClick={() => handleNavigation(item.href, item.id)}
//                     className={`px-2 py-1 text-sm rounded-lg group-hover:bg-[#453519] group-hover:text-white transition-all duration-300 ${highlightedServiceId === item.id ? 'bg-[#453519] text-white' : 'bg-[#EFE9DF] '}`}
//                   >
//                     {item.name}
//                   </h2>
//                   <ToggleButton />
//                 </div>
//               </div>
//             )
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServiceManagementPage;


'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ToggleButton from '@/components/ui/toggleButton';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Heading } from '@/components/ui/heading';
import apiCall from '@/lib/axios';
import img1 from '../../../../public/assets/service_management_page_images/reception.svg';
import img2 from '../../../../public/assets/service_management_page_images/housekeeping.svg';
import img3 from '../../../../public/assets/service_management_page_images/inroomdining.svg';
import img4 from '../../../../public/assets/service_management_page_images/gym.svg';
import img5 from '../../../../public/assets/service_management_page_images/spa.svg';
import img6 from '../../../../public/assets/service_management_page_images/swimmingpool.svg';
import img7 from '../../../../public/assets/service_management_page_images/conciergeservice.svg';
import img8 from '../../../../public/assets/service_management_page_images/inroomcontrol.svg';
import img9 from '../../../../public/assets/service_management_page_images/ordermanagement.svg';
import img10 from '../../../../public/assets/service_management_page_images/sos.svg';
import img11 from '../../public/assets/service_management_page_images/chat.svg';

// Metadata for enriching keys
const departmentMetaData: Record<string, { name: string; imgSrc: string }> = {
  'reception': {
    name: 'Reception',
    imgSrc: img1,
  },
  'ordermanagement': {
    name: 'Order Management',
    imgSrc: img9,
  },
  'housekeeping': {
    name: 'Housekeeping',
    imgSrc: img2,
  },
  'spa': {
    name: 'SPA',
    imgSrc: img5,
  },
  'swimmingpool': {
    name: 'SWIMMING POOL',
    imgSrc: img6
  },

  'conciergeservice': {
    name: 'CONCIERGE SERVICE',
    imgSrc: img7
  },

  'in_room_control': {
    name: 'IN-ROOM CONTROL',
    imgSrc: img8
  },
  'inroomdining': {
    name: 'IN-ROOM DINNING',
    imgSrc: img3
  },
};

type ServiceItem = {
  key: string;
  name: string;
  imgSrc: string;
};

const ServiceManagementPage = () => {
  const router = useRouter();
  const [highlightedKey, setHighlightedKey] = useState<string | null>(null);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleNavigation = (key?: string) => {
    if (!key) return;
    const fullPath = `/hotel-panel/service-management/${key}`;
    localStorage.setItem('lastClickedService', key);
    setHighlightedKey(key);
    router.push(fullPath);
  };

  useEffect(() => {
    const lastClicked = localStorage.getItem('lastClickedService');
    if (lastClicked) {
      setHighlightedKey(lastClicked);
      setTimeout(() => {
        setHighlightedKey(null);
        localStorage.removeItem('lastClickedService');
      }, 10000);
    }
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await apiCall('GET', 'api/services/get-serving-departments');
        if (res.success && Array.isArray(res.servingDepartments)) {
          const enriched = res.servingDepartments
            .filter((key: string) => departmentMetaData[key]) // only map if we have metadata
            .map((key: string) => ({
              key,
              name: departmentMetaData[key].name,
              imgSrc: departmentMetaData[key].imgSrc
            }));
          setServices(enriched);
        } else {
          setError('Invalid response from server');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <div className="overflow-hidden flex flex-col justify-evenly py-4 gap-6 mt-14">
        <Heading title="Service Management" className="px-6 mb-0 md:mb-0" />

        {loading ? (
          <p className="text-center text-gray-500">Loading services...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
            {services.map((item) => (
              <div
                key={item.key}
                className={`flex flex-col gap-2 group cursor-pointer ${highlightedKey === item.key ? 'shadow-sm bg-gray-100 rounded-md' : ''
                  }`}
              >
                <div onClick={() => handleNavigation(item.key)}>
                  {item.imgSrc ? (
                    <Image
                      src={item.imgSrc}
                      alt={item.name}
                      width={1000}
                      height={1000}
                      className="rounded"
                    />
                  ) : (
                    <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center text-gray-500 rounded">
                      No Image
                    </div>
                  )}
                </div>

                <div className="w-full flex justify-between items-center">
                  <h2
                    onClick={() => handleNavigation(item.key)}
                    className={`px-2 py-1 text-sm rounded-lg group-hover:bg-[#453519] group-hover:text-white transition-all duration-300 ${highlightedKey === item.key ? 'bg-[#453519] text-white' : 'bg-[#EFE9DF]'
                      }`}
                  >
                    {item.name}
                  </h2>
                  <ToggleButton />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceManagementPage;
