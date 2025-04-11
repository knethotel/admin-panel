'use client';
import '../globals.css';
import Link from 'next/link';
import {
  LogOut,
  Users,
  Landmark
} from 'lucide-react';
import Providers from '../providers';
import { NavItem } from '../nav-item';
import logo from '../../public/assets/logo.svg';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { RiAdminLine } from 'react-icons/ri';
import { BsPersonWorkspace } from 'react-icons/bs';
import { RiMoneyRupeeCircleLine } from 'react-icons/ri';
import { VscSettings } from 'react-icons/vsc';
import { TbPasswordUser } from 'react-icons/tb';
import { MdDashboardCustomize } from 'react-icons/md';
import { IoIosPeople } from 'react-icons/io';
import { ImManWoman } from 'react-icons/im';
import { MdManageAccounts } from 'react-icons/md';
import { IoMdNotificationsOutline } from 'react-icons/io';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSuperAdminRoute = pathname.startsWith('/super-admin');

  return (
    <Providers>
      <div className="flex w-full min-h-screen">
        <div className="w-[20%]">
          {isSuperAdminRoute ? (
            <SuperAdminPanelSideNav />
          ) : (
            <HotelPanelSideNav />
          )}
        </div>
        <div className="w-[80%] flex flex-col h-screen overflow-hidden">
          <main className="overflow-y-auto flex items-start w-full md:gap-4 hide-scrollbar">
            {children}
          </main>
        </div>
      </div>
    </Providers>
  );
}

function SuperAdminPanelSideNav() {
  const [openHotelSubMenu, setOpenHotelSubMenu] = useState(false);

  return (
    <aside className="fixed lg:relative flex flex-col py-14 lg:py-2 2xl:py-4 h-screen p-4 pb-0 bg-coffeeLight z-40">
      <nav className="flex flex-col gap-4 items-center overflow-y-auto hide-scrollbar">
        <Link
          href="/super-admin/dashboard"
          className="flex items-center gap-4 p-2 text-lg lg:text-xl font-semibold"
        >
          <Image loading="lazy" src={logo} alt="HandyMan" />
        </Link>

        <div className="sidebar-menu h-screen w-full p-4 mb-2 rounded-2xl flex flex-col gap-3">
          <NavItem href="/super-admin/dashboard" label="Dashboard">
            <MdDashboardCustomize className="h-5 w-5 lg:h-6 lg:w-6" />
          </NavItem>

          <NavItem
            href="/super-admin/admin-management"
            label="Admin Management"
          >
            <RiAdminLine className="h-5 w-5 lg:h-6 lg:w-6" />
          </NavItem>

          <NavItem
            href="/super-admin/roles-and-permissions"
            label="Roles & Permission"
          >
            <BsPersonWorkspace className="h-4 w-4 lg:h-5 lg:w-5" />
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
            <VscSettings className="h-5 w-5 lg:h-6 lg:w-6" />
          </NavItem>

          <NavItem
            href="/super-admin/payment-management"
            label="Payment Management"
          >
            <RiMoneyRupeeCircleLine className="h-5 w-5 lg:h-6 lg:w-6" />
          </NavItem>

          <NavItem href="/super-admin/change-password" label="Change Password">
            <TbPasswordUser className="h-5 w-5 lg:h-6 lg:w-6" />
          </NavItem>

          <div className="rounded-lg">
            <div onClick={() => setOpenHotelSubMenu((prev) => !prev)}>
              <NavItem
                href="/super-admin/hotel-management"
                label="Hotel Management"
              >
                <Landmark className="h-5 w-5 lg:h-6 lg:w-6" />
              </NavItem>
            </div>
            <div
              className={`pl-4 mt-1 overflow-hidden transition-all duration-300 ease-in-out ${
                openHotelSubMenu ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              <NavItem
                href="/super-admin/sub_hotel-management"
                label="Sub-Hotel Management"
              >
                <div className="h-2 w-2 lg:h-3 lg:w-3 bg-brown rounded-full" />
              </NavItem>
            </div>
          </div>

          <NavItem href="/logout" label="Logout">
            <LogOut className="h-5 w-5 lg:h-6 lg:w-6" />
          </NavItem>
        </div>
      </nav>
    </aside>
  );
}

function HotelPanelSideNav() {
  // const [openHotelSubMenu, setOpenHotelSubMenu] = useState(false);

  return (
    <aside className="fixed lg:relative flex flex-col py-14 lg:py-2 2xl:py-4 h-screen p-4 pb-0 bg-coffeeLight z-40">
      <nav className="flex flex-col gap-4 items-center overflow-y-auto hide-scrollbar">
        <Link
          href="/dashboard"
          className="flex items-center gap-4 p-2 text-lg lg:text-xl font-semibold"
        >
          <Image loading="lazy" src={logo} alt="KNECTHOTEL" />
        </Link>

        <div className="sidebar-menu h-screen w-full p-4 mb-2 rounded-2xl flex flex-col gap-3">
          <NavItem href="/dashboard" label="Dashboard">
            <MdDashboardCustomize className="h-5 w-5 lg:h-6 lg:w-6" />
          </NavItem>

          <NavItem href="/employee-management" label="Employee Management">
            <IoIosPeople className="h-6 w-6 lg:h-7 lg:w-7" />
          </NavItem>

          <NavItem href="/roles-permission" label="Roles & Permission">
            <BsPersonWorkspace className="h-4 w-4 lg:h-5 lg:w-5" />
          </NavItem>

          <NavItem href="/guest-management" label="Guest Management">
            <ImManWoman className="h-5 w-5 lg:h-6 lg:w-6" />
          </NavItem>

          <NavItem href="/service-management" label="Service Management">
            <MdManageAccounts className="h-5 w-5 lg:h-6 lg:w-6" />
          </NavItem>

          <NavItem href="/complaint-management" label="Complaint Management">
            <VscSettings className="h-5 w-5 lg:h-6 lg:w-6" />
          </NavItem>

          <NavItem href="/payment-management" label="Payment Management">
            <RiMoneyRupeeCircleLine className="h-5 w-5 lg:h-6 lg:w-6" />
          </NavItem>

          <NavItem href="/notifications" label="Notifications">
            <IoMdNotificationsOutline className="h-5 w-5 lg:h-7 lg:w-7" />
          </NavItem>

          <NavItem href="/change-password" label="Change Password">
            <TbPasswordUser className="h-5 w-5 lg:h-6 lg:w-6" />
          </NavItem>

          <NavItem href="/hotel-profile" label="Hotel Profile">
            <Landmark className="h-5 w-5 lg:h-6 lg:w-6" />
          </NavItem>

          <NavItem href="/logout" label="Logout">
            <LogOut className="h-5 w-5 lg:h-6 lg:w-6" />
          </NavItem>
        </div>
      </nav>
    </aside>
  );
}
