import React from 'react';
import { NavLink } from 'react-router-dom';
import useUserRole from '../../../../customHooks/UserRole';

const AdminSidebar = () => {
  const { role, isLoading } = useUserRole();

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="space-y-2">
      {role === 'admin' && (
        <>
          <NavLink
            to="/dashboard/applications"
            className="block py-2 px-4 rounded hover:bg-violet-600"
          >
            Manage Applications
          </NavLink>
          <NavLink
            to="/dashboard/manageUsers"
            className="block py-2 px-4 rounded hover:bg-violet-600"
          >
            Manage Users
          </NavLink>
          <NavLink
            to="/dashboard/managePolicies"
            className="block py-2 px-4 rounded hover:bg-violet-600"
          >
            Manage Policies
          </NavLink>
          <NavLink
            to="/dashboard/manageAgents"
            className="block py-2 px-4 rounded hover:bg-violet-600"
          >
            Manage Agents
          </NavLink>
          <NavLink
            to="/dashboard/manageTransactions"
            className="block py-2 px-4 rounded hover:bg-violet-600"
          >
            Manage Transactions
          </NavLink>
        </>
      )}
    </div>
  );
};

export default AdminSidebar;
