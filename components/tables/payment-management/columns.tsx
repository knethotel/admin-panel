import { ColumnDef } from '@tanstack/react-table';
import { MoveDownLeft, MoveUpRight } from 'lucide-react';  // Importing lucide-react icons
import CellAction from './cell-action';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'paymentID',
    header: 'Payment ID',
  },
  {
    accessorKey: 'dateTime',
    header: 'Date & Time',
  },
  {
    accessorKey: 'guestDetail',
    header: 'Guest Detail',
    cell: ({ row }) => {
      const { guestName, guestID } = row.original.guestDetail;
      return (
        <div className="flex flex-col items-start">
          <span className="text-sm">{guestID}</span>
          <span className="text-xs opacity-55">{guestName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'serviceDetails',
    header: 'Service Details',
    cell: ({ row }) => {
      const { serviceID, serviceName } = row.original.serviceDetails;
      return (
        <div className="flex flex-col items-start">
          <span className="text-sm">{serviceID}</span>
          <span className="text-xs opacity-55">{serviceName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'paymentTransaction',
    header: 'Payment & Transactions',
    cell: ({ row }) => {
      const { amount, method } = row.original.paymentTransaction;

      let Icon;
      let iconColor = '';
      if (method === 'Online') {
        Icon = MoveUpRight;  
        iconColor = 'text-red-500'; 
      } else if (method === 'via cash') {
        Icon = MoveDownLeft; 
        iconColor = 'text-green-500';  
      }

      return (
        <div className="flex flex-col items-start">
          <span className="text-sm">{amount}</span>
          <span className="text-xs opacity-55 flex items-center gap-1">
            {method} {Icon && <Icon className={`${iconColor} w-4 h-4`} />}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'discountCoupon',
    header: 'Discount & Coupons',
    cell: ({ row }) => {
      const discountCoupon = row.original.discountCoupon;

      return (
        <div className="flex items-center gap-2">
          <span className="text-sm">{discountCoupon}</span>
          {discountCoupon !== 'None' && (
            <img src={'/discount.png'} alt="Discount Coupon" className="w-8 h-8 mt-1" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'actions',
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <CellAction data={row.original} />
      </div>
    ),
  },
];
