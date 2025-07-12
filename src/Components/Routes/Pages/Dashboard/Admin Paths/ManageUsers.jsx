import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../../customHooks/AxiosSecure';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [roleFilter, setRoleFilter] = useState('all');

  // Fetch users
  const { data: users = [], refetch } = useQuery({
    queryKey: ['users', roleFilter],
    queryFn: async () => {
      let url = '/users';
      if (roleFilter !== 'all') {
        url += `?role=${roleFilter}`;
      }
      const res = await axiosSecure.get(url);
      return res.data;
    }
  });

  const handleRoleUpdate = async (email, newRole) => {
    try {
      const res = await axiosSecure.patch(`/users/${email}`, { role: newRole });
      if (res.data.modifiedCount > 0) {
        Swal.fire('Success!', `User role changed to ${newRole}`, 'success');
        refetch();
      }
    } catch (err) {
      Swal.fire('Error', 'Failed to update role', 'error');
    }
  };

  const handleDelete = async (email) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: `This will delete the user with email: ${email}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/users/${email}`);
        if (res.data.message) {
          Swal.fire('Deleted!', 'User has been deleted.', 'success');
          refetch();
        }
      } catch (err) {
        Swal.fire('Error', 'Failed to delete user', 'error');
      }
    }
  };

  return (
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
      <Helmet>
        <title>Manage Users | Admin Dashboard</title>
      </Helmet>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold leading-tight">Manage Users</h2>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="select select-bordered select-sm"
        >
          <option value="all">All Roles</option>
          <option value="user">Customers</option>
          <option value="agent">Agents</option>
          <option value="admin">Admins</option>
        </select>
      </div> 

       <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <colgroup>
            <col className="w-10" />
            <col />
            <col />
            <col />
            <col className="w-64" />
          </colgroup>
          <thead className="dark:bg-gray-300 text-left">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Name & Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Registered</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, idx) => (
                <tr
                  key={user._id}
                  className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
                >
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </td>
                  <td className="p-3 capitalize">{user.role || 'user'}</td>
                  <td className="p-3">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-2">
                      {user.role === 'user' && (
                        <button
                          onClick={() => handleRoleUpdate(user.email, 'agent')}
                          className="px-2 py-1 text-xs rounded bg-green-500 text-white"
                        >
                          Promote to Agent
                        </button>
                      )}
                      {user.role === 'agent' && (
                        <button
                          onClick={() => handleRoleUpdate(user.email, 'user')}
                          className="px-2 py-1 text-xs rounded bg-yellow-400 text-black"
                        >
                          Demote to Customer
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(user.email)}
                        className="px-2 py-1 text-xs rounded bg-red-500 text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
