import React from 'react';
import OverviewCard from '../../../../../components/COMPANY_COMPONENTS/dashboard/OverviewCard';
import DetailsCard from '../../../../../components/COMPANY_COMPONENTS/dashboard/DetailsCard';
import { StackedBarChart } from '../../../../../components/COMPANY_COMPONENTS/dashboard/StackedBarChart';
import { DonutChart } from '../../../../../components/COMPANY_COMPONENTS/dashboard/DonutChart';
import { MultipleLineChart } from '../../../../../components/COMPANY_COMPONENTS/dashboard/MultipleLineChart';
// import { Value } from '@radix-ui/react-select';
import Header from '../../../../../components/COMPANY_COMPONENTS/dashboard/Header';

const OverviewCardDummyData = {
  position: '24.5',
  increment: '28.1',
  progress: 78
};

const DetailsCardDummyData = [
  {
    title: 'Service Request',
    value: 74122,
    increment: 2.8
  },
  {
    title: 'Time Spent',
    value: 127,
    increment: 30
  },
  {
    title: 'Feedback ratings',
    value: 74352,
    increment: 5
  }
];

const StackedBarChartDummyData = [
  {
    service: 'Reception',
    totalRevenue: 45000,
    profit: 38000,
    losses: 7000
  },
  {
    service: 'Housekeeping',
    totalRevenue: 28000,
    profit: 22000,
    losses: 6000
  },
  {
    service: 'In-room Dining',
    totalRevenue: 52000,
    profit: 45000,
    losses: 7000
  },
  {
    service: 'Concierges',
    totalRevenue: 39000,
    profit: 34000,
    losses: 5000
  },
  {
    service: 'Spa/Salon',
    totalRevenue: 67000,
    profit: 58000,
    losses: 9000
  },
  {
    service: 'Hall Bookings',
    totalRevenue: 85000,
    profit: 72000,
    losses: 13000
  },
  {
    service: 'Manage Orders',
    totalRevenue: 31000,
    profit: 26000,
    losses: 5000
  },
  {
    service: 'Swimming Pool',
    totalRevenue: 42000,
    profit: 37000,
    losses: 5000
  },
  {
    service: 'Laundry',
    totalRevenue: 25000,
    profit: 20000,
    losses: 5000
  },
  {
    service: 'SOS',
    totalRevenue: 18000,
    profit: 14000,
    losses: 4000
  },
  {
    service: 'Chat-With Staff',
    totalRevenue: 64000,
    profit: 55000,
    losses: 9000
  },
  {
    service: 'Gym',
    totalRevenue: 37000,
    profit: 32000,
    losses: 5000
  }
];

const DonutChartDummyData = [
  { label: 'New Customers', visitors: 3475, fill: 'var(--color-newCustomers)' },
  {
    label: 'Returning Customers',
    visitors: 1230,
    fill: 'var(--color-returningCustomers)'
  },
  {
    label: 'Regular Customers',
    visitors: 987,
    fill: 'var(--color-regularCustomers)'
  }
];

const MultipleLineChartDummyData = [
  {
    month: 'January',
    newOrders: 344,
    repeatOrders: 566,
    averageOrderValue: 234
  },
  {
    month: 'February',
    newOrders: 387, // Small dip before rise
    repeatOrders: 602,
    averageOrderValue: 221 // Temporary decrease
  },
  {
    month: 'March',
    newOrders: 523,
    repeatOrders: 577, // Slight drop
    averageOrderValue: 265
  },
  {
    month: 'April',
    newOrders: 478,
    repeatOrders: 658, // Stronger increase
    averageOrderValue: 253 // Recovery bounce
  },
  {
    month: 'May',
    newOrders: 542, // Small pullback
    repeatOrders: 683, // Slower growth
    averageOrderValue: 271 // Gentle rise
  },
  {
    month: 'June',
    newOrders: 615, // Strong finish
    repeatOrders: 721,
    averageOrderValue: 292
  }
];

const DBPage = () => {
  //Change the component page name
  return (
    <div className="min-h-screen w-full overflow-hidden hide-scrollbar bg-coffee">
      <Header />
      {/* Upper part */}
      <div className="w-full h-full flex pr-2">
        <StackedBarChart chartData={StackedBarChartDummyData} />
        <DonutChart chartData={DonutChartDummyData} />
      </div>
      {/* Lower part */}
      <div className="flex justify-between items-center">
        <OverviewCard
          position={OverviewCardDummyData.position}
          increment={OverviewCardDummyData.increment}
          progress={OverviewCardDummyData.progress}
        />
        <MultipleLineChart
          chartData={MultipleLineChartDummyData}
          mode={'Weekly'} //Make this dynamic
        />
        <DetailsCard data={DetailsCardDummyData} />
      </div>
    </div>
  );
};

export default DBPage;
