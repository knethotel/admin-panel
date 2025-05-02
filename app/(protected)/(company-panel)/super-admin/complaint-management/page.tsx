'use client';
import Navbar from '@/components/Navbar';
import ComplaintDashboard from '@/components/shared/complaint-dashboard/ComplaintDashboard';
import { ComplaintTable } from '@/components/shared/complaint-table/client';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ComplaintManagementPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const handleOnClick = (actionName: string) => {
    if (actionName === 'add_admin') {
      router.push(`complaint-management/add`);
    }
  };

  return (
    <div className="w-full h-screen flex-col justify-center items-center">
      <Navbar search className="relative w-full lg:w-full" />
      <div className="py-4 px-6">
        <div className="flex justify-end">
          <Button
            className="text-xs 2xl:text-sm md:text-sm btn-primary mb-4"
            onClick={() => handleOnClick('add_admin')}
          >
            <Plus className="mr-2 h-4 w-4" />
            <span className="text-white group-hover:text-black">
              New Complaint
            </span>
          </Button>
        </div>
        <ComplaintDashboard
          title="COMPLAINT OVERVIEW"
          closedCases={276}
          openCases={124}
          inProgressCases={105}
        />
      </div>
      <ComplaintTable />
    </div>
  );
};

export default ComplaintManagementPage;
