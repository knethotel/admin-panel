'use client'; // Ensure this runs on the client side

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import fireIcon from '../../../../public/assets/fire.svg';
import shieldIcon from '../../../../public/assets/shield.svg';
import plusIcon from '../../../../public/assets/plus.svg';

type Params = {
  id: string;
};

const SOSPage = ({ params: paramsPromise }: { params: Promise<Params> }) => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(10); // Timer starts at 10 seconds
  const params = React.use(paramsPromise); // Unwrap the params Promise
  const { id } = params; // Destructure id after unwrapping

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Go two routes back
          router.back();
          setTimeout(() => {
            router.back();
          }, 100);
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // Update every second

    // Cleanup on unmount
    return () => clearInterval(timer);
  }, [router]);

  return (
    <div
      className={`relative flex flex-col gap-4 justify-center items-center w-full h-screen ${
        id === 'medical-emergency'
          ? 'bg-[#7697FA]'
          : id === 'emergency-fire'
            ? 'bg-[#F13737]'
            : id === 'security-emergency'
              ? 'bg-[#5D5F6599]'
              : 'bg-gray-400'
      }`}
    >
      {/* Timer in top left corner */}
      <div className="absolute top-4 left-4 text-white text-lg font-bold">
        {timeLeft}s
      </div>

      <h1 className="text-white text-center lg:text-4xl xl:text-6xl 2xl:text-7xl font-bold">
        SOS
      </h1>
      {id === 'emergency-fire' && (
        <span className="flex items-center justify-center">
          <h2 className="text-xl 2xl:text-2xl text-white font-medium">
            Emergency Fire
          </h2>
          <Image
            src={fireIcon}
            className="mb-2"
            alt="Fire icon"
            height={40}
            width={40}
          />
        </span>
      )}
      {id === 'medical-emergency' && (
        <span className="flex items-center justify-center">
          <h2 className="text-xl text-white font-medium">Medical Emergency</h2>
          <Image src={plusIcon} alt="Plus icon" height={40} width={40} />
        </span>
      )}
      {id === 'security-emergency' && (
        <span className="flex items-center justify-center">
          <h2 className="text-xl text-white font-medium">Security Emergency</h2>
          <Image src={shieldIcon} alt="Shield icon" height={35} width={35} />
        </span>
      )}
      <div>
        <div
          style={{
            background: '#FFFFFF1A',
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.1), rgba(153,12,12,0.01))'
          }}
          className="flex w-[600px] 2xl:w-[700px] flex-col gap-3 shadow-custom justify-center items-start text-white font-semibold lg:p-24 bg-[#FFFFFF1A] rounded-sm border-[0.5px] border-opacity-65 border-white"
        >
          <h2>MR. TIMOTHY CHALAMATE</h2>
          <h2>Gd01953268</h2>
          <h2>Room Number: 501</h2>
          <h2>Assigned Staff: Employee1</h2>
        </div>
      </div>
    </div>
  );
};

export default SOSPage;
