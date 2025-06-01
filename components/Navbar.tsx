'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { Bell, Filter, Search } from 'lucide-react';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from './ui/dropdown-menu';
import { AlertModal } from './modal/alert-modal';
import { Input } from './ui/input';
import { getSessionStorageItem } from 'utils/localstorage';

interface navProps {
  active?: boolean;
  search?: boolean;
  searchKey?: string;
  className?: string;
  onSearch?: (query: string) => void; // onSearch prop
}

export default function Navbar({
  active,
  search,
  searchKey,
  className,
  onSearch
}: navProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [randomColor, setRandomColor] = useState('#000000');
  const [mounted, setMounted] = useState(false);
  const admin = getSessionStorageItem<any>('admin');

  useEffect(() => {
    setMounted(true);
    const generateColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    setRandomColor(generateColor());
  }, []);

  const firstLetter = mounted && admin?.user?.name ? admin.user.name.charAt(0).toUpperCase() : 'H';
  const inputRef = useRef<HTMLInputElement>(null);
  const [filterInput, setFilterInput] = useState('');

  const handleLogout = () => {
    // Remove the session and cookie
    sessionStorage.removeItem('token');
    document.cookie = 'token=; Max-Age=0; path=/'; // Clear the cookie

    // Redirect to login page
    window.location.href = '/';
  };
  console.log(getSessionStorageItem('admin'));

  return (
    <>
      <AlertModal
        isOpen={open}
        onCloseAction={() => setOpen(false)}
        onConfirmAction={handleLogout}
        loading={loading}
        description="You will be logged out"
      />

      <nav
        className={`flex items-center w-full justify-between bg-[#EFE9DF] p-4 lg:w-[calc(100%-20%)] fixed z-[20] ${className}`}
      >
        {/* Left Side */}
        <div className="flex items-center gap-2 px-2 rounded-lg">
          {active && (
            <div className="border-2 flex gap-3 w-fit rounded-lg border-[#FAF7F2]">
              <Button className="p-0 bg-transparent ml-2 border-none shadow-none focus:ring-0 hover:bg-transparent">
                <Filter
                  height={20}
                  width={20}
                  className="text-button-dark fill-coffee"
                />
              </Button>

              {/* Dropdown Menu for Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-[#FAF7F2] rounded-l-none text-[#362913] font-semibold hover:bg-coffee/90 hover:text-[#FAF7F2] duration-150 ease-in-out">
                    TODAY
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 bg-[#FAF7F2] text-[#362913]"
                  side="bottom"
                  align="start"
                >
                  <DropdownMenuItem onClick={() => alert('Today')}>
                    Today
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => alert('Last Week')}>
                    Last Week
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => alert('Last Month')}>
                    Last Month
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => alert('Last Quarter')}>
                    Last Quarter
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => alert('Last Year')}>
                    Last Year
                  </DropdownMenuItem>

                  {/* Custom Date Submenu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <DropdownMenuItem className="flex justify-between">
                        Custom Date
                        <span className="ml-auto">&gt;</span>
                      </DropdownMenuItem>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="ml-2 w-64 bg-[#FAF7F2] text-[#362913] p-4 space-y-3"
                      side="right"
                      align="start"
                    >
                      <div>
                        <label className="block text-xs mb-1">From</label>
                        <input
                          type="date"
                          className="w-full px-2 py-1 border rounded-md bg-white text-black"
                        />
                      </div>
                      <div>
                        <label className="block text-xs mb-1">To</label>
                        <input
                          type="date"
                          className="w-full px-2 py-1 border rounded-md bg-white text-black"
                        />
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {search && (
            <Input
              ref={inputRef}
              value={filterInput}
              onChange={(e) => {
                setFilterInput(e.target.value);
                if (onSearch) {
                  onSearch(e.target.value); // Call onSearch when input changes
                }
              }}
              placeholder={'Search '}
              className="w-full md:w-[40rem] rounded-xl pl-9"
              icon={<Search width={17} height={17} />}
            />
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5 text-button-dark cursor-pointer hover:text-button-light" />

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <div className="flex items-center">
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded-full"
                    style={{ backgroundColor: randomColor, color: 'white' }}
                  >
                    {firstLetter}
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {admin?.user?.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {admin?.user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpen(true)}>
                Log out
                {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </>
  );
}
