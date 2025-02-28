import React from 'react';

const SOSPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-[#990C0C]">
        <h1 className='text-white text-center lg:text-4xl xl:text-6xl mb-20 font-bold' >SOS</h1>
      <div>
        <div
          style={{
            background: '#FFFFFF1A',
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.1), rgba(153,12,12,0.5))',
            boxShadow:
              '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
            borderRadius: '0.125rem' // matches rounded-sm
          }}
          className="flex flex-col gap-3 justify-center items-start text-white font-semibold lg:p-24 bg-[#FFFFFF1A] rounded-sm border-[0.5px] border-white"
        >
          <h2>MR. TIMOTHY CHALAMATE</h2>
          <h2>Gd01953268</h2>
          <h2>Room Number : 501</h2>
        </div>
      </div>
    </div>
  );
};

export default SOSPage;
