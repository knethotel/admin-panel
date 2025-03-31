import { Progress } from '@/components/ui/progress';
import React from 'react';
type OverviewDataType = {
  position: string;
  increment: string;
  progress: number;
};
const OverviewCard = ({ position, increment, progress }: OverviewDataType) => {
  return (
    <div className="flex flex-col min-w-48 mx-2 h-[254px] items-center p-4 rounded-xl border border-brown bg-brown/60">
      <div className="space-y-7">
        {/* Title */}
        <h5 className="text-xs font-medium tracking-wide text-white/60">
          Overview
        </h5>
        {/* Details */}
        <div className="flex flex-col gap-2 justify-center items-start">
          <div className="flex justify-center items-end gap-2">
            <h1 className="text-3xl font-bold text-yellowBrown">{position}</h1>
            <span className="text-goldenYellow font-bold">+{increment}</span>
          </div>
          <p className="text-xs text-white/60">
            This is current position overview
          </p>
        </div>
        {/* Progress bar */}
        <div className="w-full space-y-1">
          <Progress value={progress} />
          <div className="w-full flex px-1 justify-between text-xs font-mono text-white">
            <span>{progress}%</span>
            <span>{`${100 - progress}`}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
