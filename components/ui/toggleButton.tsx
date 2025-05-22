'use client';

import React, { useEffect, useState } from 'react';

interface ToggleButtonProps {
  enabled?: boolean;
  onToggle?: (newState: boolean) => void;
  labelOn?: string;
  labelOff?: string;
}

export default function ToggleButton({
  enabled,
  onToggle,
  labelOn = 'On',
  labelOff = 'Off'
}: ToggleButtonProps) {
  const [internalEnabled, setInternalEnabled] = useState(false);

  useEffect(() => {
    if (typeof enabled === 'boolean') {
      setInternalEnabled(enabled);
    }
  }, [enabled]);

  // function to handle click (toggle)
  const handleClick = () => {
    if (typeof enabled === 'boolean' && onToggle) {
      // Controlled mode: call parent handler with toggled value
      onToggle(!enabled);
    } else {
      // Uncontrolled mode: manage internal state
      setInternalEnabled((prev) => {
        const newState = !prev;
        if (onToggle) {
          onToggle(newState);
        }
        return newState;
      });
    }
  };

  const isEnabled = typeof enabled === 'boolean' ? enabled : internalEnabled;

  return (
    <button
      onClick={handleClick}
      aria-pressed={enabled}
      className={`relative h-[19.5px] shadow-sm w-[44px] py-2 flex items-center rounded-full p-1 transition duration-300 ${
        enabled ? 'bg-coffee' : 'bg-brown'
      }`}
      aria-label={enabled ? labelOn : labelOff}
      type="button"
    >
      <div
        className={`h-[17px] w-[17px] rounded-full shadow-md transform transition duration-300 ${
          enabled
            ? 'translate-x-[23px] bg-brown'
            : '-translate-x-[4px] bg-coffee'
        }`}
      />
      <span className="absolute left-2 text-xs 2xl:text-sm"></span>
      <span className="absolute right-2 text-xs 2xl:text-sm"></span>
    </button>
  );
}
