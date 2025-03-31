export type Subscription = {
  subscriptionID: string;
  planDetails: {
    planName: string;
    planType: 'PAID' | 'CANCELED' | 'EXPIRED' | 'TRIAL';
  };
  planDuration: string;
  planDurationType: string;
  costDetails: {
    planName: string;
    planCost: number;
  };
  status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED' | 'CANCELED';
};

export const subscriptionData: Subscription[] = [
  {
    subscriptionID: 'SD123452',
    planDetails: {
      planName: 'Basic Stay Plan',
      planType: 'PAID'
    },
    planDuration: '6 Months',
    planDurationType: 'Half Yearly',
    costDetails: {
      planName: 'Basic',
      planCost: 1999
    },
    status: 'ACTIVE'
  }
];
