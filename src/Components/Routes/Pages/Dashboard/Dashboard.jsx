import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiMenu } from 'react-icons/fi';
import Navbar from '../../../sharedFiles/Navbar';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on overlay click
  const handleOverlayClick = () => {
    if (isOpen) setIsOpen(false);
  };

  return (
    <div className="min-h-screen flex relative">
      <Helmet>
        <title>Dashboard | Insurance App</title>
      </Helmet>

      {/* Sidebar */}
      <aside
        className={`bg-violet-700 text-black w-64 mt-3 p-4 space-y-4 md:block ${
          isOpen ? 'block' : 'hidden'
        } fixed md:relative z-30 h-full`}
      >
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <NavLink to="/dashboard" className="block py-2 px-4 rounded hover:bg-violet-600">
          Home
        </NavLink>
        <NavLink
          to="/dashboard/applications"
          className="block py-2 px-4 rounded hover:bg-violet-600"
        >
          Manage Applications
        </NavLink>
        <NavLink
          to="/dashboard/manageUSers"
          className="block py-2 px-4 rounded hover:bg-violet-600"
        >
          Manage Users
        </NavLink>
      </aside>

      {/* Overlay for small devices */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={handleOverlayClick}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 ml-20 max-w-full flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow px-4 py-3 flex items-center justify-between sticky top-0 z-10 w-full">
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <FiMenu className="text-2xl text-violet-700" />
          </button>
          <Navbar />
        </header>

        {/* Content */}
        <main className="p-6 bg-gray-50 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;



