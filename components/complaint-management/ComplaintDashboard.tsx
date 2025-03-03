'use client';
import React from 'react';
import CustomPieChart from './PieChart';
type Props = {
  title: string;
  closedCases: number;
  openCases: number;
  inProgressCases: number;
};
const ComplaintDashboard = ({
  title,
  closedCases,
  openCases,
  inProgressCases
}: Props) => {
  return (
    <div className="w-full flex bg-[#FAF6EF] m-4 shadow-xl rounded-2xl justify-between px-6 ween items-center">
      <div className="flex flex-col gap-4 w-[80%]">
        <h2 className="text-xl text-start font-semibold">{title}</h2>
        <div className="flex justify-between pr-14 gap-4 w-full">
          <div className="flex gap-3">
            {' '}
            <span className="h-14 w-1 rounded-full bg-[#78B150]"></span>
            <div className="flex flex-col justify-center gap-1 items-start">
              <p className="text-xs opacity-35">CLOSED CASES</p>
              <h3 className="text-start text-xs font-semibold">
                {closedCases}
              </h3>
            </div>
          </div>
          <div className="flex gap-3">
            {' '}
            <span className="h-14 w-1 rounded-full bg-[#FE9900]"></span>
            <div className="flex flex-col justify-center gap-1 items-start">
              <p className="text-xs opacity-35">OPEN CASES</p>
              <h3 className="text-start text-xs font-semibold">{openCases}</h3>
            </div>
          </div>
          <div className="flex gap-3">
            {' '}
            <span className="h-14 w-1 rounded-full bg-[#3787E3]"></span>
            <div className="flex flex-col justify-center gap-1 items-start">
              <p className="text-xs opacity-35">IN PROGRESS CASES</p>
              <h3 className="text-start text-xs font-semibold">
                {closedCases}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className='w-[20%]'>
        <CustomPieChart
          value1={closedCases}
          value2={openCases}
          value3={inProgressCases}
        />
      </div>
    </div>
  );
};

export default ComplaintDashboard;
