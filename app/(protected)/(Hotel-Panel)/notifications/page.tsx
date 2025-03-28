import Navbar from '@/components/Navbar';
import { NotificationsTable } from '@/components/tables/notifications-table/client';
import React from 'react';

const NotificationsPage = () => {
  return (
    <div className="w-full py-4">
      <NotificationsTable />
    </div>
  );
};

export default NotificationsPage;
