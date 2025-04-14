import { ColumnDef } from '@tanstack/react-table';
import { Subscription } from 'app/static/company-panel/SubscriptionManagement';
import { Switch } from '@/components/ui/switch';

// Update type to match guestDataType for better type safety
export const columns: ColumnDef<Subscription>[] = [
  {
    accessorKey: 'subscriptionID',
    header: 'Subscription ID'
  },
  {
    accessorKey: 'planDetails',
    header: 'Plan Details',
    cell: ({ row }) => {
      const planDetails = row.original.planDetails;
      let planTypeElement;

      switch (planDetails.planType) {
        case 'PAID':
          planTypeElement = (
            <span className="text-sm text-success">{planDetails.planType}</span>
          );
          break;
        case 'CANCELED':
          planTypeElement = (
            <span className="text-sm text-danger">{planDetails.planType}</span>
          );
          break;
        case 'EXPIRED':
          planTypeElement = (
            <span className="text-sm text-gray-500">
              {planDetails.planType}
            </span>
          );
          break;
        case 'TRIAL':
          planTypeElement = (
            <span className="text-sm text-primary2">
              {planDetails.planType}
            </span>
          );
        default:
          planTypeElement = <span>{planDetails.planType}</span>;
          break;
      }

      return (
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-start justify-center">
            <span>{planDetails.planName}</span>
            <span className="text-sm">{planTypeElement}</span>
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: 'planDuration',
    header: 'Plan Duration'
  },
  {
    accessorKey: 'planDurationType',
    header: 'Plan Type'
  },
  {
    accessorKey: 'costDetails',
    header: 'Cost',
    cell: ({ row }) => {
      const costDetails = row.original.costDetails;

      return (
        <div className="flex justify-center items-start">
          <span>{costDetails.planName}</span>
          <span className="text-sm opacity-60">{costDetails.planCost}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      let statusElement;

      switch (status) {
        case 'ACTIVE':
          statusElement = (
            <span className="text-sm text-success">{status}</span>
          );
          break;
        case 'CANCELED':
          statusElement = <span className="text-sm text-danger">{status}</span>;
          break;
        case 'EXPIRED':
          statusElement = (
            <span className="text-sm text-gray-500">{status}</span>
          );
          break;
        case 'INACTIVE':
          statusElement = (
            <span className="text-sm text-primary2">{status}</span>
          );
        default:
          statusElement = (
            <span className="text-sm text-gray-500"> {status}</span>
          );
          break;
      }

      return (
        <div className="flex justify-center items-center">
          <span>{status}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'actions',
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Switch />
      </div>
    )
  }
];
