import '../globals.css';
import { Analytics } from '@vercel/analytics/react';
import Link from 'next/link';
import {
  Home,
  LayoutDashboard,
  LineChart,
  LogOut,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users,
  Users2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Providers from '../providers';
import { NavItem } from '../nav-item';
import logo from '../../public/assets/logo.svg';
import Image from 'next/image';

export const metadata = {
  title: 'Next.js App Router + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
  return (
    <aside className=" flex flex-col  h-screen p-4 pb-0 bg-[#453519]">
      <nav className="flex flex-col gap-4 items-center overflow-y-auto hide-scrollbar">
        <Link href="/" className="flex items-center gap-4 p-2 text-lg font-semibold">

          {/* ------Logo------ */}
          <Image
            loading="lazy"
            className=""
            src={logo}
            alt="HandyMan"
            

          />
        </Link>
        {/* ------ Sidebar Menu Links ------ */}
        <div className="sidebar-menu h-screen p-4 mb-2 rounded-2xl flex flex-col gap-4">
          <NavItem href="/dashboard" label="Dashboard">
            <LayoutDashboard className="h-5 w-5" />
          </NavItem>

          <NavItem href="/employee-management" label="Employee Management">
            <Users2 className="h-5 w-5" />
          </NavItem>

          <NavItem href="/user-management" label="User Management">
            <Users className="h-5 w-5" />
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


          <NavItem href="/notifications" label="Notifications">
            <Settings className="h-5 w-5" />
          </NavItem>

          <NavItem href="/change-password" label="Change Password">
            <Settings className="h-5 w-5" />
          </NavItem>

          <NavItem href="/hotel-profile" label="Hotel Profile">
            <Settings className="h-5 w-5" />
          </NavItem>

          <NavItem href="/logout" label="Logout">
            <LogOut className="h-5 w-5" />
          </NavItem>
        </div>
      </nav>
    </aside>
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
          <Link href="/" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/orders" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
            <ShoppingCart className="h-5 w-5" />
            Orders
          </Link>
          <Link href="/products" className="flex items-center gap-4 px-2.5 text-foreground">
            <Package className="h-5 w-5" />
            Products
          </Link>
          <Link href="/customers" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
            <Users2 className="h-5 w-5" />
            Customers
          </Link>
          <Link href="/analytics" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
            <LineChart className="h-5 w-5" />
            Analytics
          </Link>
          <Link href="/settings" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
