import { StaticImageData } from 'next/image';
import img1 from '../../public/assets/payment_management/image1.png';
import img2 from '../../public/assets/payment_management/image2.png';
import img3 from '../../public/assets/payment_management/image3.png';
import img4 from '../../public/assets/payment_management/image4.png';
import img5 from '../../public/assets/payment_management/image5.png';
import img6 from '../../public/assets/payment_management/image6.png';
import pic1 from '../../public/assets/payment_management/pic1.png';
import pic2 from '../../public/assets/payment_management/pic2.png';
import pic3 from '../../public/assets/payment_management/pic3.png';
import pic4 from '../../public/assets/payment_management/pic4.png';
import pic5 from '../../public/assets/payment_management/pic5.png';

export type CouponsDataType = {
  title: string;
  subtitle: string;
  image: StaticImageData;
};

export const PercentageCouponsData: CouponsDataType[] = [
  {
    title: 'Summer Special',
    subtitle: 'Get 20% off on all services',
    image: img1
  },
  {
    title: 'Summer Special',
    subtitle: 'Get 20% off on all services',
    image: img2
  },
  {
    title: 'Summer Special',
    subtitle: 'Get 20% off on all services',
    image: img3
  },
  {
    title: 'Summer Special',
    subtitle: 'Get 20% off on all services',
    image: img4
  },
  {
    title: 'Summer Special',
    subtitle: 'Get 20% off on all services',
    image: img5
  },
  {
    title: 'Summer Special',
    subtitle: 'Get 20% off on all services',
    image: img2
  }
];

export const FixedAmountCouponsData: CouponsDataType[] = [
  {
    title: 'Up to 1000 off',
    subtitle: 'cashback on first payment ',
    image: pic1
  },
  {
    title: 'Up to 1000 off',
    subtitle: 'cashback on first payment ',
    image: pic2
  },
  {
    title: 'Up to 1000 off',
    subtitle: 'cashback on first payment ',
    image: pic3
  },
  {
    title: 'Up to 1000 off',
    subtitle: 'cashback on first payment ',
    image: pic4
  },
  {
    title: 'Up to 1000 off',
    subtitle: 'cashback on first payment ',
    image: pic5
  }
];
