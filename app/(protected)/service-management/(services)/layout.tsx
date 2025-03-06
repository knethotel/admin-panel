import Navbar from '@/components/Navbar';
import ToggleButton from '@/components/ui/toggleButton';
import React from 'react';

const ServicesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex flex-col">
      <Navbar active={true} search={true} />

      {/* Blockage:: This Auto Accept Requests section's positioning is being affected because of the fixed positioning of the Navbar */}

      {children}
    </div>
  );
};

export default ServicesLayout;
