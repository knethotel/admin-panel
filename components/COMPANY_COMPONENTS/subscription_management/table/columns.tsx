// import { ColumnDef } from '@tanstack/react-table';
// import { Subscription } from 'app/static/company-panel/SubscriptionManagement';
// import { Switch } from '@/components/ui/switch';
// import { Eye } from 'lucide-react';
// import CellAction from './cell-action';

// export const columns: ColumnDef<Subscription>[] = [
//   {
//     accessorKey: 'subscriptionID',
//     header: 'Subscription ID'
//   },
//   {
//     accessorKey: 'planDetails',
//     header: 'Plan Details',
//     cell: ({ row }) => {
//       const planDetails = row.original.planDetails;
//       let planTypeElement;

//       switch (planDetails.planType) {
//         case 'PAID':
//           planTypeElement = (
//             <span className="text-sm text-success">{planDetails.planType}</span>
//           );
//           break;
//         case 'CANCELED':
//           planTypeElement = (
//             <span className="text-sm text-danger">{planDetails.planType}</span>
//           );
//           break;
//         case 'EXPIRED':
//           planTypeElement = (
//             <span className="text-sm text-gray-500">
//               {planDetails.planType}
//             </span>
//           );
//           break;
//         case 'TRIAL':
//           planTypeElement = (
//             <span className="text-sm text-primary2">
//               {planDetails.planType}
//             </span>
//           );
//           break;
//         default:
//           planTypeElement = <span>{planDetails.planType}</span>;
//           break;
//       }

//       return (
//         <div className="flex flex-col items-start justify-center">
//           <span>{planDetails.planName}</span>
//           {planTypeElement}
//         </div>
//       );
//     }
//   },
//   {
//     accessorKey: 'planDuration',
//     header: 'Plan Duration'
//   },
//   {
//     accessorKey: 'planDurationType',
//     header: 'Plan Type'
//   },
//   {
//     accessorKey: 'costDetails',
//     header: 'Cost',
//     cell: ({ row }) => {
//       const { planName, planCost } = row.original.costDetails;

//       return (
//         <div className="flex flex-col justify-center items-start">
//           <span>{planName}</span>
//           <span className="text-sm opacity-60">
//             ₹{planCost.toLocaleString()}
//           </span>
//         </div>
//       );
//     }
//   },
//   {
//     accessorKey: 'status',
//     header: 'Status',
//     cell: ({ row }) => {
//       const status = row.original.status;
//       let statusElement;

//       switch (status) {
//         case 'ACTIVE':
//           statusElement = (
//             <span className="text-sm text-success">{status}</span>
//           );
//           break;
//         case 'CANCELED':
//           statusElement = <span className="text-sm text-danger">{status}</span>;
//           break;
//         case 'EXPIRED':
//           statusElement = (
//             <span className="text-sm text-gray-500">{status}</span>
//           );
//           break;
//         case 'INACTIVE':
//           statusElement = (
//             <span className="text-sm text-primary2">{status}</span>
//           );
//           break;
//         default:
//           statusElement = (
//             <span className="text-sm text-gray-500">{status}</span>
//           );
//           break;
//       }

//       return (
//         <div className="flex justify-center items-center">{statusElement}</div>
//       );
//     }
//   },
//   {
//     accessorKey: 'actions',
//     id: 'actions',
//     header: 'Actions',
//     cell: ({ row }) => {
//       const status = row.original.status;

//       const isChecked = status === 'ACTIVE';
//       const isEditable = status === 'ACTIVE' || status === 'INACTIVE';

//       return (
//         <div className="flex items-center justify-center gap-x-4">
//           <Switch
//             checked={isChecked}
//             disabled={!isEditable}
//             onCheckedChange={(checked) => {
//               console.log(
//                 `Switch toggled for subscription ${row.original.subscriptionID}:`,
//                 checked
//               );
//               // handle state update / API call here
//             }}
//           />
//           <CellAction data={row.original} />
//         </div>
//       );
//     }
//   }
// ];


import { ColumnDef } from '@tanstack/react-table';
import { Switch } from '@/components/ui/switch';
import { Eye } from 'lucide-react';
import CellAction from './cell-action';

// Assuming your data shape is:
export type Subscription = {
  _id: string;
  uniqueId: string;
  subscriptionID: string;
  planName: string;
  planDuration: number;
  planType: string; // 'Monthly' | 'Half Yearly' | 'Yearly'
  description: string;
  cost: number;
  status: 'Active' | 'Inactive' | 'Canceled' | 'Expired';
};

export const columns: ColumnDef<Subscription>[] = [
  {
    header: 'SN',
    accessorFn: (_row, index) => index + 1,
    id: 'serialNumber',
    cell: ({ row }) => <div>{row.index + 1}</div>
  },
  {
    header: 'Subscription ID',
    accessorKey: 'uniqueId'
  },
  {
    header: 'Plan Details',
    cell: ({ row }) => {
      const { planName, planType } = row.original;
      return (
        <div className="flex flex-col items-start">
          <span className="font-medium">{planName}</span>
          <span className="text-sm opacity-60">{planType}</span>
        </div>
      );
    }
  },
  {
    header: 'Plan Duration',
    accessorKey: 'planDuration',
    cell: ({ row }) => (
      <div>{row.original.planDuration} {row.original.planType === 'Monthly' ? 'Months' : 'Days'}</div>
    )
  },
  {
    header: 'Plan Type',
    accessorKey: 'planType'
  },
  {
    header: 'Cost',
    accessorKey: 'cost',
    cell: ({ row }) => (
      <div className="text-sm font-semibold">₹{row.original.cost.toLocaleString()}</div>
    )
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => {
      const status = row.original.status.toUpperCase();
      let color = 'text-gray-500';

      if (status === 'ACTIVE') color = 'text-green-600';
      else if (status === 'CANCELED') color = 'text-red-600';
      else if (status === 'INACTIVE') color = 'text-yellow-600';
      else if (status === 'EXPIRED') color = 'text-gray-400';

      return <span className={`text-sm font-medium ${color}`}>{status}</span>;
    }
  },
  {
    header: 'Actions',
    id: 'actions',
    cell: ({ row }) => {
      const status = row.original.status.toUpperCase();
      const isChecked = status === 'ACTIVE';
      const isEditable = status === 'ACTIVE' || status === 'INACTIVE';

      return (
        <div className="flex items-center gap-x-3">
          <Switch
            checked={isChecked}
            disabled={!isEditable}
            onCheckedChange={(checked) => {
              console.log(`Toggled ${row.original.uniqueId}:`, checked);
              // TODO: Call your update status API here
            }}
          />
          <CellAction data={row.original} />
        </div>
      );
    }
  }
];
