import Navbar from '@/components/Navbar';
import { LineChartLinear } from '@/components/charts/lineChart';
import React from 'react';
import {
  dashboardTableData,
  DashboardTableDataType
} from 'app/static/Dashboard';
import { IoEnter } from 'react-icons/io5';
import { RxCrossCircled } from 'react-icons/rx';
import { GrNotes } from 'react-icons/gr';
import { IoIosExit } from 'react-icons/io';
import { RadialChartStacked } from '@/components/charts/radialChart';

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar active={true} />
      <div className="flex-1 pt-24 pb-4 px-4 md:px-6 lg:px-8 w-full flex flex-col md:flex-row gap-6">
        {/* Left part */}
        <div className="w-full md:w-2/3 flex flex-col gap-4">
          {/* Upper part (line chart) */}
          <div className="w-full h-[400px] overflow-hidden rounded-xl">
            <LineChartLinear />
          </div>
          {/* Lower part (table) */}
          <div className="flex-1 min-h-[300px] max-h-[540px] rounded-xl bg-lightbrown p-6 tracking-wide">
            {/* Fixed Header */}
            <div className="flex items-center justify-between pb-4">
              <div>
                <div className="px-4 py-1 text-xs text-white rounded-lg bg-coffee">
                  Departments
                </div>
              </div>
              <div>
                <div className="px-4 py-1 text-xs text-white rounded-lg bg-success">
                  Order Received
                </div>
              </div>
              <div>
                <div className="px-4 py-1 text-xs text-white rounded-lg bg-primary2">
                  Order Picked
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto scrollbar-hide max-h-[400px]">
              {(
                Object.keys(
                  dashboardTableData
                ) as (keyof DashboardTableDataType)[]
              ).map((key) => (
                <div key={key}>
                  <div className="flex items-center justify-between py-2">
                    <span className="w-24 text-sm capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="text-lg font-medium text-success">
                      {dashboardTableData[key].orderPlaced}
                    </span>
                    <span className="text-lg font-medium text-primary2">
                      {dashboardTableData[key].orderRecieved}
                    </span>
                  </div>
                  <div className="bg-white/20 h-[1px] my-2 w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right part */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          {/* Upper part (cards) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-lightbrown flex flex-col justify-between rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <div className="bg-success/20 rounded-full p-2">
                  <GrNotes className="h-4 w-4 text-success" />
                </div>
                <div className="bg-success/20 rounded-full border border-success text-[0.8rem] px-2 py-[0.4px]">
                  -18.5%
                </div>
              </div>
              <div className="flex flex-col items-start gap-3">
                <h1 className="text-2xl font-medium">2563</h1>
                <span className="text-[0.6rem] text-black/30">
                  Booked Rooms
                </span>
              </div>
            </div>

            <div className="bg-lightbrown flex flex-col justify-between rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <div className="bg-danger/20 rounded-full p-2">
                  <RxCrossCircled className="h-4 w-4 text-danger" />
                </div>
                <div className="bg-success/20 rounded-full border border-success text-[0.8rem] px-2 py-[0.4px]">
                  -18.5%
                </div>
              </div>
              <div className="flex flex-col items-start gap-3">
                <h1 className="text-2xl font-medium">2563</h1>
                <span className="text-[0.6rem] text-black/30">
                  Canceled Rooms
                </span>
              </div>
            </div>

            <div className="bg-lightbrown flex flex-col justify-between rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <div className="bg-primary2/20 rounded-full p-2">
                  <IoEnter className="h-4 w-4 text-primary2" />
                </div>
                <div className="bg-success/20 rounded-full border border-success text-[0.8rem] px-2 py-[0.4px]">
                  -18.5%
                </div>
              </div>
              <div className="flex flex-col items-start gap-3">
                <h1 className="text-2xl font-medium">2563</h1>
                <span className="text-[0.6rem] text-black/30">
                  Check-in Rooms
                </span>
              </div>
            </div>

            <div className="bg-lightbrown flex flex-col justify-between rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <div className="bg-purple/20 rounded-full p-2">
                  <IoIosExit className="h-4 w-4 text-purple" />
                </div>
                <div className="bg-success/20 rounded-full border border-success text-[0.8rem] px-2 py-[0.4px]">
                  -18.5%
                </div>
              </div>
              <div className="flex flex-col items-start gap-3">
                <h1 className="text-2xl font-medium">2563</h1>
                <span className="text-[0.6rem] text-black/30">
                  Check-out Rooms
                </span>
              </div>
            </div>
          </div>

          {/* Lower part (radial chart) */}
          <div className="flex-1 bg-teal-500 rounded-xl overflow-hidden">
            <RadialChartStacked />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

// Previous code******************************************************************************************************************************

// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { File, PlusCircle } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// export default async function ProductsPage(props: {
//   searchParams: Promise<{ q: string; offset: string }>;
// }) {
//   const searchParams = await props.searchParams;
//   const search = searchParams.q ?? '';
//   const offset = searchParams.offset ?? 0;

//   return (
//     <>
//       <Tabs defaultValue="all">
//         <div className="flex items-center">
//           <TabsList>
//             <TabsTrigger value="all">All</TabsTrigger>
//             <TabsTrigger value="active">Active</TabsTrigger>
//             <TabsTrigger value="draft">Draft</TabsTrigger>
//             <TabsTrigger value="archived" className="hidden sm:flex">
//               Archived
//             </TabsTrigger>
//           </TabsList>
//           <div className="ml-auto flex items-center gap-2">
//             <Button size="sm" variant="outline" className="h-8 gap-1">
//               <File className="h-3.5 w-3.5" />
//               <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
//                 Export
//               </span>
//             </Button>
//             <Button size="sm" className="h-8 gap-1">
//               <PlusCircle className="h-3.5 w-3.5" />
//               <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
//                 Add Product
//               </span>
//             </Button>
//           </div>
//         </div>
//         <TabsContent value="all">
//           {/* <ProductsTable
//           products={products}
//           offset={newOffset ?? 0}
//           totalProducts={totalProducts}
//         /> */}
//         </TabsContent>
//       </Tabs>
//     </>
//   );
// }
