'use client';
import '../globals.css';
// import { Analytics } from '@vercel/analytics/react';
import Link from 'next/link';
import {
  Home,
  LayoutDashboard,
  LineChart,
  LogOut,
  Package,
  // Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users,
  Users2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import Providers from '../providers';
import { NavItem } from '../nav-item';
import logo from '../../public/assets/logo.svg';
import Image from 'next/image';
import { useState } from 'react';
export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      {/* Sidebar & Main Content Split into 30% and 70% */}
      <div className="flex w-full min-h-screen">
        <div className="w-[20%]">
          <DesktopNav /> {/* Sidebar */}
        </div>
        <div className="w-[80%] flex flex-col h-screen overflow-hidden">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileNav />
          </header>
          <main className="overflow-y-auto flex items-start w-full md:gap-4 hide-scrollbar">
            {children}
          </main>
        </div>
      </div>
    </Providers>
  );
}

function DesktopNav() {
  const [openNotificationsSubMenu, setOpenNotificationsSubMenu] =
    useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button (only shown on small screens) */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md bg-coffeeLight text-white"
        >
          {isMobileMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Sidebar - responsive version */}
      <aside
        className={`fixed lg:relative flex flex-col py-14 lg:py-2 2xl:py-4 h-screen p-4 pb-0 bg-coffeeLight z-40 transition-all duration-300 ease-in-out 
        ${isMobileMenuOpen ? 'left-0' : '-left-full'} lg:left-0`}
      >
        <nav className="flex flex-col gap-4 items-center overflow-y-auto hide-scrollbar">
          <Link
            href="/dashboard"
            className="flex items-center gap-4 p-2 text-lg lg:text-xl font-semibold"
          >
            {/* ------Logo------ */}
            <Image loading="lazy" className="" src={logo} alt="HandyMan" />
          </Link>

          {/* ------ Sidebar Menu Links Original (Hotel panel) ------ */}
          {/* <div className="sidebar-menu h-screen p-4 mb-2 rounded-2xl flex flex-col gap-3">
          <NavItem href="/dashboard" label="Dashboard">
            <LayoutDashboard className="h-5 w-5" />
          </NavItem>

          <NavItem href="/employee-management" label="Employee Management">
            <Users2 className="h-5 w-5" />
          </NavItem>

          <NavItem href="/roles-permission" label="Roles & Permission">
            <Users className="h-5 w-5" />
          </NavItem>

          <NavItem href="/guest-management" label="Guest Management">
            <Users className="h-5 w-5" />
          </NavItem>

          <NavItem href="/service-management" label="Service Management">
            <Settings className="h-5 w-5" />
          </NavItem>

          <NavItem href="/complaint-management" label="Complaint Management">
            <Settings className="h-5 w-5" />
          </NavItem>

          <NavItem href="/payment-management" label="Payment Management">
            <Settings className="h-5 w-5" />
          </NavItem>
          <div
            className="rounded-lg"
            onClick={() => setOpenNotificationsSubMenu((prev) => !prev)}
          >
            <NavItem href="/notifications" label="Notifications">
              <Settings className="h-5 w-5" />
            </NavItem>
            <div
              onClick={(e) => e.stopPropagation()}
              className={`pl-4 mt-1 overflow-hidden transition-all duration-300 ease-in-out ${
                openNotificationsSubMenu ? 'h-auto max-h-screen' : 'max-h-0'
              }`}
            >
              <NavItem href="/notifications/sos-details" label="SOS Service">
                <div className="h-2 w-2 bg-brown rounded-full"></div>
              </NavItem>
            </div>
          </div>

          <NavItem href="/change-password" label="Change Password">
            <Settings className="h-5 w-5" />
          </NavItem>

          <NavItem href="/hotel-profile" label="Hotel Profile">
            <Settings className="h-5 w-5" />
          </NavItem>

          <NavItem href="/logout" label="Logout">
            <LogOut className="h-5 w-5" />
          </NavItem>
        </div> */}

          {/* Sidebar temporary - Added lg:text-lg to increase size on large screens */}
          <div className="sidebar-menu h-screen w-full p-4 mb-2 rounded-2xl flex flex-col gap-3">
            <NavItem href="/super-admin/dashboard" label="Dashboard">
              <LayoutDashboard className="h-5 w-5 lg:h-6 lg:w-6" />
            </NavItem>

            <NavItem
              href="/super-admin/admin-management"
              label="Admin Management"
            >
              <Users2 className="h-5 w-5 lg:h-6 lg:w-6" />
            </NavItem>

            <NavItem
              href="/super-admin/roles-and-permissions"
              label="Roles & Permission"
            >
              <Users className="h-5 w-5 lg:h-6 lg:w-6" />
            </NavItem>

            <NavItem
              href="/super-admin/guest-management"
              label="Guest Management"
            >
              <Users className="h-5 w-5 lg:h-6 lg:w-6" />
            </NavItem>

            <NavItem
              href="/super-admin/complaint-management"
              label="Complaint Management"
            >
              <Settings className="h-5 w-5 lg:h-6 lg:w-6" />
            </NavItem>

            <NavItem
              href="/super-admin/payment-management"
              label="Payment Management"
            >
              <Settings className="h-5 w-5 lg:h-6 lg:w-6" />
            </NavItem>

            <NavItem
              href="/super-admin/change-password"
              label="Change Password"
            >
              <Settings className="h-5 w-5 lg:h-6 lg:w-6" />
            </NavItem>

            <div
              className="rounded-lg"
              onClick={() => setOpenNotificationsSubMenu((prev) => !prev)}
            >
              <NavItem
                href="/super-admin/hotel-management"
                label="Hotel Management"
              >
                <Settings className="h-5 w-5 lg:h-6 lg:w-6" />
              </NavItem>
              <div
                onClick={(e) => e.stopPropagation()}
                className={`pl-4 mt-1 overflow-hidden transition-all duration-300 ease-in-out ${
                  openNotificationsSubMenu ? 'h-auto max-h-screen' : 'max-h-0'
                }`}
              >
                <NavItem
                  href="/super-admin/sub_hotel-management"
                  label="Sub-Hotel Management"
                >
                  <div className="h-2 w-2 lg:h-3 lg:w-3 bg-brown rounded-full"></div>
                </NavItem>
              </div>
            </div>

            <NavItem href="/logout" label="Logout">
              <LogOut className="h-5 w-5 lg:h-6 lg:w-6" />
            </NavItem>
          </div>
        </nav>
      </aside>

      {/* Overlay for mobile (only shown when menu is open) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="/"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/orders"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <ShoppingCart className="h-5 w-5" />
            Orders
          </Link>
          <Link
            href="/products"
            className="flex items-center gap-4 px-2.5 text-foreground"
          >
            <Package className="h-5 w-5" />
            Products
          </Link>
          <Link
            href="/customers"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Users2 className="h-5 w-5" />
            Customers
          </Link>
          <Link
            href="/analytics"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <LineChart className="h-5 w-5" />
            Analytics
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
