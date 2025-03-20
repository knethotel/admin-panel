'use client';

import { useState } from 'react';

export default function ToggleButton() {
  const [enabled, setEnabled] = useState(false);

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`relative h-[19.5px] shadow-sm w-[44px] py-2 flex items-center rounded-full p-1 transition duration-300 ${
        enabled ? 'bg-coffee' : 'bg-brown'
      }`}
    >
      <div
        className={`h-[17px] w-[17px] rounded-full shadow-md transform transition duration-300 ${
          enabled ? 'translate-x-[23px] bg-brown' : '-translate-x-[4px] bg-coffee'
        }`}
      />
      <span className="absolute left-2 text-xs"></span>
      <span className="absolute right-2 text-xs"></span>
    </button>
  );
}
