import { StaticImageData } from 'next/image';
import img1 from '../../public/assets/service_management_page_images/reception.svg';
import img2 from '../../public/assets/service_management_page_images/housekeeping.svg';
import img3 from '../../public/assets/service_management_page_images/inroomdining.svg';
import img4 from '../../public/assets/service_management_page_images/gym.svg';
import img5 from '../../public/assets/service_management_page_images/spa.svg';
import img6 from '../../public/assets/service_management_page_images/swimmingpool.svg';
import img7 from '../../public/assets/service_management_page_images/conciergeservice.svg';
import img8 from '../../public/assets/service_management_page_images/inroomcontrol.svg';
import img9 from '../../public/assets/service_management_page_images/ordermanagement.svg';
import img10 from '../../public/assets/service_management_page_images/sos.svg';
import img11 from '../../public/assets/service_management_page_images/chat.svg';

export type ServiceManagementHomePageDataType = {
  id: number;
  name: string;
  imgSrc: StaticImageData;
};

export const serviceManagementHomePageData: ServiceManagementHomePageDataType[] =
  [
    {
      id: 1,
      name: 'RECEPTION',
      imgSrc: img1
    },
    {
      id: 2,
      name: 'HOUSEKEEPING',
      imgSrc: img2
    },
    {
      id: 3,
      name: 'IN-ROOM DINNING',
      imgSrc: img3
    },
    {
      id: 4,
      name: 'GYM',
      imgSrc: img4
    },
    {
      id: 5,
      name: 'SPA',
      imgSrc: img5
    },
    {
      id: 6,
      name: 'SWIMMING POOL',
      imgSrc: img6
    },
    {
      id: 7,
      name: 'CONCIERGE SERVICE',
      imgSrc: img7
    },
    {
      id: 8,
      name: 'IN-ROOM CONTROL',
      imgSrc: img8
    },
    {
      id: 9,
      name: 'ORDER MANAGEMENT',
      imgSrc: img9
    },
    {
      id: 10,
      name: 'SOS MANAGEMENT',
      imgSrc: img10
    },
    {
      id: 11,
      name: 'CHAT WITH STAFF',
      imgSrc: img11
    }
  ];
