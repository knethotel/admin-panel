import { StaticImageData } from 'next/image';
import shirtPic from '../../../public/assets/shirtPic.png';
type RequestTypeType =
  | 'Room Necessities'
  | 'Bathroom Necessities'
  | 'Bathroom Cleaning';

type StatusType = 'Pending' | 'In-Progress' | 'Completed';

export type HousekeepingDataType = {
  requestID: string;
  requestDetail: string;
  responseDetail: string;
  requestAssignedTo: string;
  requestTime: {
    date: string;
    time: string;
  };
  guestDetails: {
    guestID: string;
    name: string;
    roomNo: string;
    mobileNumber: string;
    email: string;
  };
  requestType: RequestTypeType;
  status: StatusType;
  assignedTo: string;
};

/// Product details dummy data

type Product = {
  visibility: boolean;
  name: string;
  price: number;
  image: StaticImageData;
};

type ProductType = {
  productTypeName: string;
  products: Product[];
};

type HouseKeepingProductDetails = {
  serviceName: string;
  productType: ProductType[];
};

export const HouseKeepingProductDetailsDummyData = [
  {
    serviceName: 'Laundary Service',
    productType: [
      {
        productTypeName: 'MEN',
        products: [
          { visibility: true, name: 'Shirt', price: 209, image: shirtPic },
          { visibility: true, name: 'T-Shirt', price: 199, image: shirtPic }
        ]
      },
      {
        productTypeName: 'WOMAN',
        products: [
          { visibility: true, name: 'Shirt', price: 209, image: shirtPic },
          { visibility: true, name: 'T-Shirt', price: 199, image: shirtPic }
        ]
      }
    ]
  },
  {
    serviceName: 'Deliver Toileteries',
    productType: [
      {
        productTypeName: 'BATHROOM ESSENTIALS',
        products: [
          { visibility: true, name: 'soap', price: 40, image: shirtPic },
          { visibility: true, name: 'towel', price: 299, image: shirtPic }
        ]
      },
      {
        productTypeName: 'LAVATORY ESSENTIALS',
        products: [
          { visibility: true, name: 'handwash', price: 67, image: shirtPic },
          { visibility: true, name: 'paper towel', price: 20, image: shirtPic }
        ]
      }
    ]
  }
];

export const laundryCategories = ['Men', 'Women', 'Kids', 'Others'];
export const laundryItems: Record<string, string[]> = {
  Men: ['shirt', 'tshirt', 'jeans', 'pants', 'jacket', 'shorts', 'wollens'],
  Women: ['tops', 'jeans', 'tshirt', 'shirt', 'woolen', 'jackets'],
  Kids: ['shorts', 'tshirts', 'jeans', 'shirt'],
  Others: ['Undergarments', 'Camisoles']
};

export const toiletriesCategories = ['BATHROOM ESSENTIALS', 'LAVATORY ESSENTIALS'];
export const toiletriesItems: Record<string, string[]> = {
  'BATHROOM ESSENTIALS': [
    'soap', 'towel', 'body wash', 'shower gel', 'Conditioner', 'face wash'
  ],
  'LAVATORY ESSENTIALS': [
    'handwash', 'paper towel', 'face towel', 'hand towel', 'sleepers', 'air freshner'
  ]
};
