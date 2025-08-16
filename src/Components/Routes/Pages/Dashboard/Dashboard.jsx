import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiMenu } from 'react-icons/fi';
import Navbar from '../../../sharedFiles/Navbar';

import Loading from '../Loading';

// import AdminSidebar from './sidebar';
// import AgentSidebar from './AgentSidebar';
import useUserRole from '../../../../customHooks/UserRole';


const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { role, isLoading } = useUserRole();
  


  if (isLoading) return <Loading />;

  
 const links = (
  <ul>
    <li>
      <NavLink to="/dashboard" end className={({ isActive }) =>
    `block py-2 px-4 rounded ${
      isActive ? "bg-violet-900 text-white" : "hover:bg-violet-600"
    }`
  }>
       My Profile
      </NavLink>
    </li>

    {role === 'admin' && (
      <>
        <li>
          <NavLink
            to="/dashboard/applications"
            className={({ isActive }) =>
    `block py-2 px-4 rounded ${
      isActive ? "bg-violet-900 text-white" : "hover:bg-violet-600"
    }`
  }
          >
            Manage Applications
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/manageUsers"
             className={({ isActive }) =>
    `block py-2 px-4 rounded ${
      isActive ? "bg-violet-900 text-white" : "hover:bg-violet-600"
    }`
  }
          >
            Manage Users
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/managePolicies"
             className={({ isActive }) =>
    `block py-2 px-4 rounded ${
      isActive ? "bg-violet-900 text-white" : "hover:bg-violet-600"
    }`
  }
          >
            Manage Policies
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/manageAgents"
             className={({ isActive }) =>
    `block py-2 px-4 rounded ${
      isActive ? "bg-violet-900 text-white" : "hover:bg-violet-600"
    }`
  }
          >
            Manage Agents
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/manageTransactions"
             className={({ isActive }) =>
    `block py-2 px-4 rounded ${
      isActive ? "bg-violet-900 text-white" : "hover:bg-violet-600"
    }`
  }
          >
            Manage Transactions
          </NavLink>
          
        </li>

        <li>
          <NavLink to="/dashboard/postBlogs"  className={({ isActive }) =>
    `block py-2 px-4 rounded ${
      isActive ? "bg-violet-900 text-white" : "hover:bg-violet-600"
    }`
  }>
            Post Blogs
          </NavLink>
        </li>

         <li>
          <NavLink to="/dashboard/manageBlogs"  className={({ isActive }) =>
    `block py-2 px-4 rounded ${
      isActive ? "bg-violet-900 text-white" : "hover:bg-violet-600"
    }`
  }>
            Manage Blogs
          </NavLink>
        </li>
      </>
    )}

    {role === 'agent' && (
      <>
        <li>
          <NavLink to="/dashboard/assignedCustomers"  className={({ isActive }) =>
    `block py-2 px-4 rounded ${
      isActive ? "bg-violet-900 text-white" : "hover:bg-violet-600"
    }`
  }>
            Assigned Customers
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/postBlogs"  className={({ isActive }) =>
    `block py-2 px-4 rounded ${
      isActive ? "bg-violet-900 text-white" : "hover:bg-violet-600"
    }`
  }>
            Post Blogs
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/manageBlogs"  className={({ isActive }) =>
    `block py-2 px-4 rounded ${
      isActive ? "bg-violet-900 text-white" : "hover:bg-violet-600"
    }`
  }>
            Manage Blogs
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/policyClearance"  className={({ isActive }) =>
    `block py-2 px-4 rounded ${
      isActive ? "bg-violet-900 text-white" : "hover:bg-violet-600"
    }`
  }>
           Policy Clearance
          </NavLink>
        </li>
      </>
    )}

   {role === 'user'  && (
    <>
     <li>
          <NavLink to="/dashboard/myPolicies" className={({ isActive }) =>
    `block py-2 px-4 rounded ${
      isActive ? "bg-violet-900 text-white" : "hover:bg-violet-600"
    }`
  }>
            My Policies
          </NavLink>
          </li>
     <li>
          <NavLink to="/dashboard/paymentStatus"  className={({ isActive }) =>
    `block py-2 px-4 rounded ${
      isActive ? "bg-violet-900 text-white" : "hover:bg-violet-600"
    }`
  }>
          Payment Status
          </NavLink>
          </li>
     <li>
          <NavLink to="/dashboard/claimRequest"  className={({ isActive }) =>
    `block py-2 px-4 rounded ${
      isActive ? "bg-violet-900 text-white" : "hover:bg-violet-600"
    }`
  }>
         Claim request
          </NavLink>
          </li>
     
    </>
   )}

   {role === 'requested-agent'  && (
    <>
     <li>
          <NavLink to="/dashboard/myPolicies"  className={({ isActive }) =>
    `block py-2 px-4 rounded ${
      isActive ? "bg-violet-900 text-white" : "hover:bg-violet-600"
    }`
  }>
            My Policies
          </NavLink>
          </li>
     <li>
          <NavLink to="/dashboard/paymentStatus"  className={({ isActive }) =>
    `block py-2 px-4 rounded ${
      isActive ? "bg-violet-900 text-white" : "hover:bg-violet-600"
    }`
  }>
          Payment Status
          </NavLink>
          </li>
     <li>
          <NavLink to="/dashboard/claimRequest"  className={({ isActive }) =>
    `block py-2 px-4 rounded ${
      isActive ? "bg-violet-900 text-white" : "hover:bg-violet-600"
    }`
  }>
         Claim request
          </NavLink>
          </li>
     
    </>
   )}
  </ul>
);


    if (isLoading) return <Loading></Loading>
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
        className={`bg-violet-700 text-white text-bold mt-4 w-64 p-4 space-y-4 z-30 h-screen
    ${isOpen ? 'block' : 'hidden'} 
    fixed md:sticky top-0 md:block`}
      >
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        {/* <NavLink to="/dashboard" className="block py-2 px-4 rounded hover:bg-violet-600">
          Home
        </NavLink> */}

      {/* <AdminSidebar></AdminSidebar> */}
      {/* <AgentSidebar /> */}
      {links}

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



