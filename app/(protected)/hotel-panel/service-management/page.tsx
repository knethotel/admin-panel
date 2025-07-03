
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
//   const [highlightedServiceId, setHighlightedServiceId] = useState<number | null>(null);
//   const [serviceToggleStatus, setServiceToggleStatus] = useState<{ [key: string]: boolean }>({});

//   const handleNavigation = (path: string, serviceName: string) => {
//     localStorage.setItem('lastClickedService', serviceName);
//     router.push(path);
//   };


//   const handleToggleService = (serviceName: string, newState: boolean) => {
//     setServiceToggleStatus(prevState => ({
//       ...prevState,
//       [serviceName]: newState,
//     }));
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

//     // Initialize the toggle status based on the services data
//     const initialServiceStatus = serviceManagementHomePageData.reduce((acc: any, service) => {
//       acc[service.name] = true;
//       return acc;
//     }, {});


//     const blurredServices = ['ServiceName1', 'ServiceName2'];
//     blurredServices.forEach(serviceName => {
//       initialServiceStatus[serviceName] = false;
//     });

//     setServiceToggleStatus(initialServiceStatus);
//   }, []);


//   return (
//     <div className="flex flex-col w-full">
//       <Navbar />
//       <div className="overflow-hidden flex flex-col justify-evenly py-4 gap-6 mt-14">
//         <Heading title="Service Management" className="px-6 mb-0 md:mb-0" />
//         <div className="w-full grid grid-cols-4 gap-8 px-6">
//           {serviceManagementHomePageData.map((item: ServiceManagementHomePageDataType) => {
//             const isServiceEnabled = serviceToggleStatus[item.name] ?? true;

//             // Add a subtle blur effect if the service is disabled
//             const serviceClass = isServiceEnabled ? '' : 'subtle-blur opacity-80 cursor-not-allowed';

//             return (
//               <div
//                 key={item.id}
//                 className={`flex flex-col gap-2 group cursor-pointer ${highlightedServiceId === item.id ? 'shadow-sm bg-gray-100 rounded-md' : ''} ${serviceClass}`}
//               >
//                 {/* Image */}
//                 <div onClick={() => isServiceEnabled && handleNavigation(item.href, item.name)}>
//                   <Image
//                     src={item.imgSrc}
//                     alt={`${item.displayName} image`}
//                     height={1000}
//                     width={1000}
//                     quality={100}
//                     className={isServiceEnabled ? '' : 'opacity-50'}
//                   />
//                 </div>
//                 {/* Title and toggle button */}
//                 <div className="w-full flex justify-between items-center">
//                   <h2
//                     onClick={() => isServiceEnabled && handleNavigation(item.href, item.name)}
//                     className={`px-2 py-1 text-sm rounded-lg group-hover:bg-[#453519] group-hover:text-white transition-all duration-300 ${highlightedServiceId === item.id ? 'bg-[#453519] text-white' : 'bg-[#EFE9DF]'}`}
//                   >
//                     {item.name}
//                   </h2>
//                   <ToggleButton
//                     serviceName={item.name}
//                     enabled={isServiceEnabled}
//                     onCheckedChange={(newState) => handleToggleService(item.name, newState)}
//                   />
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServiceManagementPage;


// // 'use client';
// // import React, { useEffect, useState } from 'react';
// // import Image from 'next/image';
// // import ToggleButton from '@/components/ui/toggleButton';
// // import { useRouter } from 'next/navigation';
// // import Navbar from '@/components/Navbar';
// // import { Heading } from '@/components/ui/heading';
// // import apiCall from '@/lib/axios';
// // import img1 from '../../../../public/assets/service_management_page_images/reception.svg';
// // import img2 from '../../../../public/assets/service_management_page_images/housekeeping.svg';
// // import img3 from '../../../../public/assets/service_management_page_images/inroomdining.svg';
// // import img4 from '../../../../public/assets/service_management_page_images/gym.svg';
// // import img5 from '../../../../public/assets/service_management_page_images/spa.svg';
// // import img6 from '../../../../public/assets/service_management_page_images/swimmingpool.svg';
// // import img7 from '../../../../public/assets/service_management_page_images/conciergeservice.svg';
// // import img8 from '../../../../public/assets/service_management_page_images/inroomcontrol.svg';
// // import img9 from '../../../../public/assets/service_management_page_images/ordermanagement.svg';
// // import img10 from '../../../../public/assets/service_management_page_images/sos.svg';
// // import img11 from '../../../../public/assets/service_management_page_images/chat.svg';

// // // Metadata for enriching keys
// // const departmentMetaData: Record<string, { name: string; imgSrc: string }> = {
// //   'reception': {
// //     name: 'Reception',
// //     imgSrc: img1,
// //   },
// //   'ordermanagement': {
// //     name: 'Order Management',
// //     imgSrc: img9,
// //   },
// //   'housekeeping': {
// //     name: 'Housekeeping',
// //     imgSrc: img2,
// //   },
// //   'spa': {
// //     name: 'SPA',
// //     imgSrc: img5,
// //   },
// //   'swimmingpool': {
// //     name: 'SWIMMING POOL',
// //     imgSrc: img6
// //   },

// //   'conciergeservice': {
// //     name: 'CONCIERGE SERVICE',
// //     imgSrc: img7
// //   },

// //   'in_room_control': {
// //     name: 'IN-ROOM CONTROL',
// //     imgSrc: img8
// //   },
// //   'inroomdining': {
// //     name: 'IN-ROOM DINNING',
// //     imgSrc: img3
// //   },
// //   'sos': {
// //     name: 'SOS MANAGEMENT',
// //     imgSrc: img10
// //   },
// //   'chat': {
// //     name: 'CHAT WITH STAFF',
// //     imgSrc: img11
// //   },
// //   'payment': {
// //     name: 'Payment',
// //     imgSrc: img3
// //   },
// // };

// // type ServiceItem = {
// //   key: string;
// //   name: string;
// //   imgSrc: string;
// // };

// // const ServiceManagementPage = () => {
// //   const router = useRouter();
// //   const [highlightedKey, setHighlightedKey] = useState<string | null>(null);
// //   const [services, setServices] = useState<ServiceItem[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');

// //   const handleNavigation = (key?: string) => {
// //     if (!key) return;
// //     const fullPath = `/hotel-panel/service-management/${key}`;
// //     localStorage.setItem('lastClickedService', key);
// //     setHighlightedKey(key);
// //     router.push(fullPath);
// //   };

// //   useEffect(() => {
// //     const lastClicked = localStorage.getItem('lastClickedService');
// //     if (lastClicked) {
// //       setHighlightedKey(lastClicked);
// //       setTimeout(() => {
// //         setHighlightedKey(null);
// //         localStorage.removeItem('lastClickedService');
// //       }, 10000);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     const fetchServices = async () => {
// //       try {
// //         const res = await apiCall('GET', 'api/services/get-serving-departments');
// //         if (res.success && Array.isArray(res.servingDepartments)) {
// //           const enriched = res.servingDepartments
// //             .filter((key: string) => departmentMetaData[key]) // only map if we have metadata
// //             .map((key: string) => ({
// //               key,
// //               name: departmentMetaData[key].name,
// //               imgSrc: departmentMetaData[key].imgSrc
// //             }));
// //           setServices(enriched);
// //         } else {
// //           setError('Invalid response from server');
// //         }
// //       } catch (err) {
// //         console.error(err);
// //         setError('Failed to fetch services');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchServices();
// //   }, []);

// //   return (
// //     <div className="flex flex-col w-full">
// //       <Navbar />
// //       <div className="overflow-hidden flex flex-col justify-evenly py-4 gap-6 mt-14">
// //         <Heading title="Service Management" className="px-6 mb-0 md:mb-0" />

// //         {loading ? (
// //           <p className="text-center text-gray-500">Loading services...</p>
// //         ) : error ? (
// //           <p className="text-center text-red-500">{error}</p>
// //         ) : (
// //           <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
// //             {services.map((item) => (
// //               <div
// //                 key={item.key}
// //                 className={`flex flex-col gap-2 group cursor-pointer ${highlightedKey === item.key ? 'shadow-sm bg-gray-100 rounded-md' : ''
// //                   }`}
// //               >
// //                 <div onClick={() => handleNavigation(item.key)}>
// //                   {item.imgSrc ? (
// //                     <Image
// //                       src={item.imgSrc}
// //                       alt={item.name}
// //                       width={1000}
// //                       height={1000}
// //                       className="rounded"
// //                     />
// //                   ) : (
// //                     <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center text-gray-500 rounded">
// //                       No Image
// //                     </div>
// //                   )}
// //                 </div>

// //                 <div className="w-full flex justify-between items-center">
// //                   <h2
// //                     onClick={() => handleNavigation(item.key)}
// //                     className={`px-2 py-1 text-sm rounded-lg group-hover:bg-[#453519] group-hover:text-white transition-all duration-300 ${highlightedKey === item.key ? 'bg-[#453519] text-white' : 'bg-[#EFE9DF]'
// //                       }`}
// //                   >
// //                     {item.name}
// //                   </h2>
// //                   <ToggleButton />
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ServiceManagementPage;


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
import img11 from '../../../../public/assets/service_management_page_images/chat.svg';

type ServiceItem = {
  id: number;
  name: string;
  displayName: string;
  imgSrc: any;
  href: string;
};

// static list of all services
const allServices: ServiceItem[] = [
  {
    id: 1,
    name: 'reception',
    displayName: 'Reception',
    imgSrc: img1,
    href: '/hotel-panel/service-management/reception',
  },
  {
    id: 2,
    name: 'housekeeping',
    displayName: 'Housekeeping',
    imgSrc: img2,
    href: '/hotel-panel/service-management/housekeeping',
  },
  {
    id: 3,
    name: 'inroomdining',
    displayName: 'In-Room Dining',
    imgSrc: img3,
    href: '/hotel-panel/service-management/inroomdining',
  },
  {
    id: 4,
    name: 'gym',
    displayName: 'Gym / Community / Conference Hall',
    imgSrc: img4,
    href: '/hotel-panel/service-management/gym',
  },
  {
    id: 5,
    name: 'spa',
    displayName: 'Spa/Salon',
    imgSrc: img5,
    href: '/hotel-panel/service-management/spa',
  },
  {
    id: 6,
    name: 'swimmingpool',
    displayName: 'Swimming Pool',
    imgSrc: img6,
    href: '/hotel-panel/service-management/swimmingpool',
  },
  {
    id: 7,
    name: 'conciergeservice',
    displayName: 'Concierge Service',
    imgSrc: img7,
    href: '/hotel-panel/service-management/conciergeservice',
  },
  {
    id: 8,
    name: 'in_room_control',
    displayName: 'In-room Control',
    imgSrc: img8,
    href: '/hotel-panel/service-management/in_room_control',
  },
  {
    id: 9,
    name: 'ordermanagement',
    displayName: 'Order Management',
    imgSrc: img9,
    href: '/hotel-panel/service-management/ordermanagement',
  },
  {
    id: 10,
    name: 'sos',
    displayName: 'SOS MANAGEMENT',
    imgSrc: img10,
    href: '/hotel-panel/service-management/sosmanagement',
  },
  {
    id: 11,
    name: 'chat',
    displayName: 'CHAT WITH STAFF',
    imgSrc: img11,
    href: '/hotel-panel/service-management/chatwithstaff',
  },
];

const ServiceManagementPage = () => {
  const router = useRouter();
  const [highlightedKey, setHighlightedKey] = useState<string | null>(null);
  const [enabledServices, setEnabledServices] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleNavigation = (href: string, isEnabled: boolean) => {
    if (!isEnabled) return;
    const key = href.split('/').pop(); // get last part of URL
    if (key) {
      localStorage.setItem('lastClickedService', key);
      setHighlightedKey(key);
      router.push(href);
    }
  };

  const handleToggleService = (key: string, newState: boolean) => {
    setEnabledServices((prev) => ({
      ...prev,
      [key]: newState,
    }));
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
    const fetchEnabledServices = async () => {
      try {
        const res = await apiCall('GET', 'api/services/get-serving-departments');
        if (res.success && Array.isArray(res.servingDepartments)) {
          const initialStatus: Record<string, boolean> = {};
          allServices.forEach((service) => {
            initialStatus[service.name] = res.servingDepartments.includes(service.name);
          });
          setEnabledServices(initialStatus);
        } else {
          setError('Invalid response from server.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch services.');
      } finally {
        setLoading(false);
      }
    };

    fetchEnabledServices();
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
            {allServices.map((service) => {
              const isEnabled = enabledServices[service.name] ?? false;
              const isHighlighted = highlightedKey === service.name;

              return (
                <div
                  key={service.id}
                  className={`flex flex-col gap-2 group ${isEnabled ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'} ${isHighlighted ? 'shadow-sm bg-gray-100 rounded-md' : ''
                    }`}
                >
                  <div onClick={() => handleNavigation(service.href, isEnabled)}>
                    <Image
                      src={service.imgSrc}
                      alt={service.displayName}
                      width={1000}
                      height={1000}
                      className="rounded"
                    />
                  </div>

                  <div className="w-full flex justify-between items-center">
                    <h2
                      onClick={() => handleNavigation(service.href, isEnabled)}
                      className={`px-2 py-1 text-sm rounded-lg group-hover:bg-[#453519] group-hover:text-white transition-all duration-300 ${isHighlighted
                        ? 'bg-[#453519] text-white'
                        : 'bg-[#EFE9DF]'
                        }`}
                    >
                      {service.displayName}
                    </h2>
                    <ToggleButton
                      serviceName={service.name}
                      enabled={isEnabled}
                      onCheckedChange={(newState) =>
                        handleToggleService(service.name, newState)
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceManagementPage;
