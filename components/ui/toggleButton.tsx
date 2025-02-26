'use client';

import { useState } from 'react';

export default function ToggleButton() {
  const [enabled, setEnabled] = useState(false);

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`relative w-12 h-5 py-2 flex items-center bg-gray-300 rounded-full p-1 transition duration-300 ${
        enabled ? 'bg-[#281F0F]' : 'bg-gray-300'
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow-md transform transition duration-300 ${
          enabled ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
      <span className="absolute left-2 text-xs"></span>
      <span className="absolute right-2 text-xs"></span>
    </button>
  );
}
