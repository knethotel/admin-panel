import { ColumnDef } from '@tanstack/react-table';
import { Subscription } from 'app/static/company-panel/SubscriptionManagement';
import { Switch } from '@/components/ui/switch';

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
          break;
        default:
          planTypeElement = <span>{planDetails.planType}</span>;
          break;
      }

      return (
        <div className="flex flex-col items-start justify-center">
          <span>{planDetails.planName}</span>
          {planTypeElement}
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
      const { planName, planCost } = row.original.costDetails;

      return (
        <div className="flex flex-col justify-center items-start">
          <span>{planName}</span>
          <span className="text-sm opacity-60">
            ₹{planCost.toLocaleString()}
          </span>
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
          break;
        default:
          statusElement = (
            <span className="text-sm text-gray-500">{status}</span>
          );
          break;
      }

      return (
        <div className="flex justify-center items-center">{statusElement}</div>
      );
    }
  },
  {
    accessorKey: 'actions',
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const status = row.original.status;

      const isChecked = status === 'ACTIVE';
      const isEditable = status === 'ACTIVE' || status === 'INACTIVE';

      return (
        <div className="flex items-center justify-center">
          <Switch
            checked={isChecked}
            disabled={!isEditable}
            onCheckedChange={(checked) => {
              console.log(
                `Switch toggled for subscription ${row.original.subscriptionID}:`,
                checked
              );
              // handle state update / API call here
            }}
          />
        </div>
      );
    }
  }
];
