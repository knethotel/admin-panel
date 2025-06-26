
// import { ColumnDef } from '@tanstack/react-table';
// import { InRoomDiningDataType } from '@/components/tables/In_Room_Dining-Service/client';
// import CellAction from './cell-action';

// export const columns: ColumnDef<InRoomDiningDataType, any>[] = [
//   {
//     accessorKey: 'orderID',
//     header: 'Order ID'
//   },
//   {
//     accessorKey: 'requestTime',
//     header: 'Request Time',
//     cell: ({ row }) => {
//       const { date, time } = row.original.requestTime;
//       return (
//         <div className="flex flex-col justify-center">
//           <p className="text-xs 2xl:text-sm opacity-50">{date}</p>
//           <p className="text-xs 2xl:text-sm opacity-50">{time}</p>
//         </div>
//       );
//     }
//   },
//   {
//     accessorKey: 'guestDetails',
//     header: 'Guest Details',
//     cell: ({ row }) => {
//       const details = row.original.guestDetails;
//       return (
//         <div className="flex justify-center items-center">
//           <div className="flex flex-col w-1/2 justify-center items-start gap-1">
//             <p className="text-sm text-gray-900">{details.name}</p>
//             <p className="text-xs text-gray-600">{details.guestID}</p>
//             <p className="text-xs text-gray-600">{details.roomNo}</p>
//           </div>
//         </div>
//       );
//     }
//   },
//   {
//     accessorKey: 'serviceID',
//     header: 'Service ID'
//   },
//   {
//     accessorKey: 'orderStatus',
//     header: 'Order Status',
//     cell: ({ row }) => {
//       const status = row.original.orderStatus;
//       switch (status) {
//         case 'Order in Transit':
//           return <div className="text-sm text-[#3787E3]">{status}</div>;
//         case 'Order is Preparing':
//         case 'Order is Picked up':
//           return <div className="text-sm text-[#FC690E]">{status}</div>;
//         case 'Order placed':
//           return <div className="text-sm text-[#78B150]">{status}</div>;
//         case 'Undelivered':
//           return <div className="text-sm text-[#FB1218]">{status}</div>;
//         case 'Order Delivered':
//           return <div className="text-sm text-[#3787E3]">{status}</div>;
//         default:
//           return <div className="text-sm text-gray-500">{status}</div>;
//       }
//     }
//   },
//   {
//     accessorKey: 'assignedTo',
//     header: 'Assigned to',
//     cell: ({ row }) => {
//       const assignedTo = row.original.assignedTo;
//       return <div className="text-sm">{assignedTo}</div>;
//     }
//   },
//   {
//     accessorKey: 'actions',
//     id: 'actions',
//     header: 'Actions',
//     cell: ({ row }) => (
//       <div className="flex justify-center">
//         <CellAction data={row.original} />
//       </div>
//     )
//   }
// ];


import { ColumnDef } from '@tanstack/react-table';
import { InRoomDiningDataType } from '@/components/tables/In_Room_Dining-Service/client';
import CellAction from './cell-action';

export const columns: ColumnDef<InRoomDiningDataType, any>[] = [
  {
    accessorKey: 'orderID',
    header: 'Order ID'
  },
  {
    accessorKey: 'requestTime',
    header: 'Request Time',
    cell: ({ row }) => {
      const { date, time } = row.original.requestTime;
      return (
        <div className="flex flex-col text-xs 2xl:text-sm opacity-50">
          <span>{date}</span>
          <span>{time}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'guestDetails',
    header: 'Guest Details',
    cell: ({ row }) => {
      const details = row.original.guestDetails;
      return (
        <div className="flex flex-col text-xs gap-1 text-gray-600">
          <p className="text-sm text-gray-900">{details.name || 'N/A'}</p>
          <p>{details.roomNo || 'N/A'}</p>
          <p>{details.phoneNumber || 'N/A'}</p>
        </div>
      );
    }
  },
  {
    accessorKey: 'orderStatus',
    header: 'Order Status',
    cell: ({ row }) => {
      const status = row.original.orderStatus;
      const baseClass = 'text-sm';
      switch (status) {
        case 'Order in Transit':
          return <div className={`${baseClass} text-[#3787E3]`}>{status}</div>;
        case 'Order is Preparing':
        case 'Order is Picked up':
          return <div className={`${baseClass} text-[#FC690E]`}>{status}</div>;
        case 'Order placed':
          return <div className={`${baseClass} text-[#78B150]`}>{status}</div>;
        case 'Undelivered':
          return <div className={`${baseClass} text-[#FB1218]`}>{status}</div>;
        case 'Order Delivered':
          return <div className={`${baseClass} text-[#3787E3]`}>{status}</div>;
        default:
          return <div className={`${baseClass} text-gray-500`}>{status}</div>;
      }
    }
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Payment Status',
    cell: ({ row }) => (
      <div className="text-sm">{row.original.paymentStatus || 'N/A'}</div>
    )
  },
  {
    accessorKey: 'specialInstructions',
    header: 'Special Instructions',
    cell: ({ row }) => (
      <div className="text-sm truncate max-w-[250px]">{row.original.specialInstructions || 'N/A'}</div>
    )
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const amt = row.original?.amount;
      return amt ? (
        <div className="flex flex-col text-xs">
          <span>Subtotal: ₹{amt.subtotal ?? 0}</span>
          <span>Discount: ₹{amt.discount ?? 0}</span>
          <span>Total: ₹{amt.finalAmount ?? 0}</span>
        </div>
      ) : (
        <span className="text-xs text-gray-500">N/A</span>
      );
    }
  },
  {
    accessorKey: 'coupon',
    header: 'Coupon',
    cell: ({ row }) => {
      const cp = row.original?.coupon;
      return cp?.code ? (
        <div className="flex flex-col text-xs">
          <span>Code: {cp.code}</span>
          <span>Type: {cp.type}</span>
          <span>Value: {cp.value}%</span>
        </div>
      ) : (
        <span className="text-xs text-gray-500">N/A</span>
      );
    }
  },
  {
    accessorKey: 'paymentDate',
    header: 'Payment Date',
    cell: ({ row }) => (
      <div className="text-sm">
        {row.original.paymentDate
          ? new Date(row.original.paymentDate).toLocaleString()
          : 'N/A'}
      </div>
    )
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => (
      <div className="text-xs opacity-60">
        {row.original.createdAt
          ? new Date(row.original.createdAt).toLocaleString()
          : 'N/A'}
      </div>
    )
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => (
      <div className="text-xs opacity-60">
        {row.original.updatedAt
          ? new Date(row.original.updatedAt).toLocaleString()
          : 'N/A'}
      </div>
    )
  },
  {
    accessorKey: 'assignedTo',
    header: 'Assigned To',
    cell: ({ row }) => (
      <div className="text-sm">{row.original.assignedTo || 'N/A'}</div>
    )
  },
  {
    accessorKey: 'actions',
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <CellAction data={row.original} />
      </div>
    )
  }
];
