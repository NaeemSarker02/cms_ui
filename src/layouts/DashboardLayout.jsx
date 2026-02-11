import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
// Import the pieces from your components folder
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Mobile drawer logic handled via props */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header - Receives the toggle function for mobile */}
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* This is where SuperAdminDashboard or CustomerDashboard will render */}
            <Outlet />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;