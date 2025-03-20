'use client';

import { useState } from 'react';

export default function ToggleButton() {
  const [enabled, setEnabled] = useState(false);

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`relative h-[19.5px] w-[46px] py-2 flex items-center rounded-full p-1 transition duration-300 ${
        enabled ? 'bg-coffee' : 'bg-brown'
      }`}
    >
      <div
        className={`h-[15px] w-[15px] bg-white rounded-full shadow-md transform transition duration-300 ${
          enabled ? 'translate-x-[24.5px]' : '-translate-x-[0.5px]'
        }`}
      />
      <span className="absolute left-2 text-xs"></span>
      <span className="absolute right-2 text-xs"></span>
    </button>
  );
}
