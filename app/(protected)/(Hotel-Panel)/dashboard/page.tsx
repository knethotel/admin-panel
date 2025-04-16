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
      <div className="flex-1 pt-24 pb-4 px-4 lg:px-6 w-full container">
        {/* Upper Section: Line Chart + Cards */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mb-4 lg:mb-6">
          {/* Line Chart (Left) */}
          <div className="w-full lg:w-2/3 h-[300px] sm:h-[350px] lg:h-[400px] overflow-hidden rounded-xl">
            <LineChartLinear />
          </div>
          {/* Cards (Right) */}
          <div className="w-full lg:w-1/3 flex flex-col">
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="bg-lightbrown flex flex-col gap-4 lg:gap-6 justify-between rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <div className="bg-success/20 rounded-full p-2">
                    <GrNotes className="h-4 w-4 lg:h-5 lg:w-5 text-success" />
                  </div>
                  <div className="bg-success/20 rounded-full border border-success text-[0.7rem] lg:text-[0.8rem] px-2 py-[0.4px]">
                    -18.5%
                  </div>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <h1 className="text-xl lg:text-2xl font-medium">2563</h1>
                  <span className="text-[0.7rem] lg:text-[0.8rem] text-black/40">
                    Booked Rooms
                  </span>
                </div>
              </div>

              <div className="bg-lightbrown flex flex-col gap-4 lg:gap-6 justify-between rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <div className="bg-danger/20 rounded-full p-2">
                    <RxCrossCircled className="h-4 w-4 lg:h-5 lg:w-5 text-danger" />
                  </div>
                  <div className="bg-success/20 rounded-full border border-success text-[0.7rem] lg:text-[0.8rem] px-2 py-[0.4px]">
                    -18.5%
                  </div>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <h1 className="text-xl lg:text-2xl font-medium">2563</h1>
                  <span className="text-[0.7rem] lg:text-[0.8rem] text-black/40">
                    Canceled Rooms
                  </span>
                </div>
              </div>

              <div className="bg-lightbrown flex flex-col gap-4 lg:gap-6 justify-between rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <div className="bg-primary2/20 rounded-full p-2">
                    <IoEnter className="h-4 w-4 lg:h-5 lg:w-5 text-primary2" />
                  </div>
                  <div className="bg-success/20 rounded-full border border-success text-[0.7rem] lg:text-[0.8rem] px-2 py-[0.4px]">
                    -18.5%
                  </div>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <h1 className="text-xl lg:text-2xl font-medium">2563</h1>
                  <span className="text-[0.7rem] lg:text-[0.8rem] text-black/40">
                    Check-in Rooms
                  </span>
                </div>
              </div>

              <div className="bg-lightbrown flex flex-col gap-4 lg:gap-6 justify-between rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <div className="bg-purple/20 rounded-full p-2">
                    <IoIosExit className="h-4 w-4 lg:h-5 lg:w-5 text-purple" />
                  </div>
                  <div className="bg-success/20 rounded-full border border-success text-[0.7rem] lg:text-[0.8rem] px-2 py-[0.4px]">
                    -18.5%
                  </div>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <h1 className="text-xl lg:text-2xl font-medium">2563</h1>
                  <span className="text-[0.7rem] lg:text-[0.8rem] text-black/40">
                    Check-out Rooms
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Section: Table + Radial Chart */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Table (Left) */}
          <div className="w-full lg:w-2/3 h-[640px] rounded-xl bg-lightbrown p-4 lg:p-6 tracking-wide flex flex-col">
            {/* Fixed Header */}
            <div className="flex items-center justify-between pb-4">
              <div>
                <div className="px-4 py-1 text-xs lg:text-sm 2xl:text-base text-white rounded-lg bg-coffee">
                  Departments
                </div>
              </div>
              <div>
                <div className="px-4 py-1 text-xs lg:text-sm 2xl:text-base text-white rounded-lg bg-success">
                  Order Received
                </div>
              </div>
              <div>
                <div className="px-4 py-1 text-xs lg:text-sm 2xl:text-base text-white rounded-lg bg-primary2">
                  Order Picked
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {(
                Object.keys(
                  dashboardTableData
                ) as (keyof DashboardTableDataType)[]
              ).map((key) => (
                <div key={key}>
                  <div className="flex items-center justify-between py-2">
                    <span className="w-20 lg:w-24 text-sm lg:text-base capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="text-base lg:text-lg font-medium text-success">
                      {dashboardTableData[key].orderPlaced}
                    </span>
                    <span className="text-base lg:text-lg font-medium text-primary2">
                      {dashboardTableData[key].orderRecieved}
                    </span>
                  </div>
                  <div className="bg-white/20 h-[1px] my-2 w-full"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Radial Chart (Right) */}
          <div className="w-full lg:w-1/3 h-[640px] bg-lightbrown rounded-xl px-2 overflow-hidden">
            <RadialChartStacked />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
