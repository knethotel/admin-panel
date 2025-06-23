// 'use client';

// import React, { useEffect, useState } from 'react';

// interface ToggleButtonProps {
//   enabled?: boolean;
//   onToggle?: (newState: boolean) => void;
//   labelOn?: string;
//   labelOff?: string;
// }

// export default function ToggleButton({
//   enabled,
//   onToggle,
//   labelOn = 'On',
//   labelOff = 'Off'
// }: ToggleButtonProps) {
//   const [internalEnabled, setInternalEnabled] = useState(false);

//   useEffect(() => {
//     if (typeof enabled === 'boolean') {
//       setInternalEnabled(enabled);
//     }
//   }, [enabled]);

//   // function to handle click (toggle)
//   const handleClick = () => {
//     if (typeof enabled === 'boolean' && onToggle) {
//       // Controlled mode: call parent handler with toggled value
//       onToggle(!enabled);
//     } else {
//       // Uncontrolled mode: manage internal state
//       setInternalEnabled((prev) => {
//         const newState = !prev;
//         if (onToggle) {
//           onToggle(newState);
//         }
//         return newState;
//       });
//     }
//   };

//   const isEnabled = typeof enabled === 'boolean' ? enabled : internalEnabled;

//   return (
//     <button
//       onClick={handleClick}
//       aria-pressed={enabled}
//       className={`relative h-[19.5px] shadow-sm w-[44px] py-2 flex items-center rounded-full p-1 transition duration-300 ${
//         enabled ? 'bg-coffee' : 'bg-brown'
//       }`}
//       aria-label={enabled ? labelOn : labelOff}
//       type="button"
//     >
//       <div
//         className={`h-[17px] w-[17px] rounded-full shadow-md transform transition duration-300 ${
//           enabled
//             ? 'translate-x-[23px] bg-brown'
//             : '-translate-x-[4px] bg-coffee'
//         }`}
//       />
//       <span className="absolute left-2 text-xs 2xl:text-sm"></span>
//       <span className="absolute right-2 text-xs 2xl:text-sm"></span>
//     </button>
//   );
// }


'use client';

import React, { useEffect, useState } from 'react';

interface ToggleButtonProps {
  checked?: boolean;
  enabled?: boolean;
  onCheckedChange?: (newState: boolean) => void;
  onToggle?: (newState: boolean) => void;
  labelOn?: string;
  labelOff?: string;
}

export default function ToggleButton({
  checked,
  enabled,
  onCheckedChange,
  onToggle,
  labelOn = 'On',
  labelOff = 'Off'
}: ToggleButtonProps) {
  const [internalState, setInternalState] = useState(false);

  // Determine initial value
  useEffect(() => {
    if (typeof checked === 'boolean') {
      setInternalState(checked);
    } else if (typeof enabled === 'boolean') {
      setInternalState(enabled);
    }
  }, [checked, enabled]);

  const handleClick = () => {
    const newState = !internalState;

    // Controlled mode
    if (typeof checked === 'boolean') {
      onCheckedChange?.(newState);
      onToggle?.(newState);
    } else if (typeof enabled === 'boolean') {
      onCheckedChange?.(newState);
      onToggle?.(newState);
    } else {
      // Uncontrolled mode
      setInternalState(newState);
      onCheckedChange?.(newState);
      onToggle?.(newState);
    }
  };

  const isOn =
    typeof checked === 'boolean'
      ? checked
      : typeof enabled === 'boolean'
        ? enabled
        : internalState;

  return (
    <button
      onClick={handleClick}
      aria-pressed={isOn}
      className={`relative h-[19.5px] shadow-sm w-[44px] py-2 flex items-center rounded-full p-1 transition duration-300 ${isOn ? 'bg-coffee' : 'bg-brown'
        }`}
      aria-label={isOn ? labelOn : labelOff}
      type="button"
    >
      <div
        className={`h-[17px] w-[17px] rounded-full shadow-md transform transition duration-300 ${isOn ? 'translate-x-[23px] bg-brown' : '-translate-x-[4px] bg-coffee'
          }`}
      />
    </button>
  );
}
