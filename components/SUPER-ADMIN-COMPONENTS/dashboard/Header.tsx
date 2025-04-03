'use client';
import React, { useState } from 'react';
import DateRangePickerComponent from './DateRangePicker';

const Header: React.FC = () => {
  // State to track the active link
  const [activeLink, setActiveLink] = useState<string>('Weekly');

  // List of links
  const links = ['Weekly', 'Monthly', 'Yearly'];

  // Handle link click
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <header className="bg-transparent px-4 py-6 flex gap-4 justify-end items-center">
      {/* Navigation Links */}
      <nav className="flex gap-6">
        {links.map((link) => (
          <button
            key={link}
            onClick={() => handleLinkClick(link)}
            className={`text-sm font-medium transition-colors ${
              activeLink === link
                ? 'text-white border-b-2 border-[#6F4E37]' // Active: white with coffee underline
                : 'text-white/60 hover:text-white/80' // Inactive: white with 60% opacity
            } pb-1`}
          >
            {link}
          </button>
        ))}
      </nav>

      {/* Date Range Picker */}
      <DateRangePickerComponent />
    </header>
  );
};

export default Header;
