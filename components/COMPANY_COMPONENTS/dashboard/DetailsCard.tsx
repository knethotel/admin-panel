import React from 'react';
type DetailsCardDataType = {
  title: string;
  value: number;
  increment: number;
};

type DataType = {
  data: DetailsCardDataType[];
};

const DetailsCard = ({ data }: DataType) => {
  return (
    <div className="flex flex-col gap-4 h-60 mx-2 min-w-48 text-xs justify-center items-center p-4 rounded-xl border border-brown bg-brown/60">
      <div className="flex flex-col gap-4 justify-center w-full h-full items-start">
        {data.map((item, index) => (
          <div key={index} className='space-y-1'>
            <div className="flex justify-center items-center gap-2">
              <h3 className="text-white/60 font-semibold">{item.title}</h3>
              <span className="text-success text-xs">{item.increment}%</span>
            </div>
            <div className="text-yellowBrown text-lg font-semibold">
              {item.value.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailsCard;
