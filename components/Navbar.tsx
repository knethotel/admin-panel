"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { ChevronLeft, ChevronRight, Calendar, RefreshCcw, Bell, Filter, Search } from "lucide-react";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { AlertModal } from "./modal/alert-modal";
import { Input } from "./ui/input";

interface navProps {
  active?: boolean;
  search?: boolean;
  searchKey?: string;

}
export default function Navbar({ active, search, searchKey }: navProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [randomColor, setRandomColor] = useState("#000000"); // Default value

  useEffect(() => {
    const generateColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    setRandomColor(generateColor()); // Set color only on client
  }, []); // Runs only once on mount

  const firstLetter = "S"; // Temporary placeholder

  const inputRef = useRef<HTMLInputElement>(null);
  const [filterInput, setFilterInput] = useState('');

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => { }}
        loading={loading}
        description="You will be logged out"
      />

      <nav className="flex items-center justify-between bg-[#EFE9DF] p-4 w-[calc(100%-20%)] fixed z-50 ">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          {active && (
            <>
              <Button className="p-0 bg-transparent border-none shadow-none focus:ring-0 hover:bg-transparent">
                <Filter height={20} width={20} className="text-button-dark" />
              </Button>


              <Button className="bg-button-dark text-white font-semibold hover:bg-button-light">
                TODAY
              </Button>

            </>
          )}
          {search && (<>
            <Input
              ref={inputRef}
              value={filterInput}
              onChange={(e) => setFilterInput(e.target.value)}
              placeholder={'Search '}
              className="w-[40rem] rounded-xl pl-9"
              icon={<Search width={17} height={17} />}
            />
          </>)}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4 ">
          {/* <RefreshCcw className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" /> */}
          <Bell className="w-5 h-5 text-button-dark cursor-pointer hover:text-button-light" />

          {/* Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full" style={{ backgroundColor: randomColor, color: "white" }}>
                    {firstLetter}
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Shivam Kumar</p>
                  <p className="text-xs leading-none text-muted-foreground">shivamjha2705@gmail.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpen(true)}>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </>
  );
}
