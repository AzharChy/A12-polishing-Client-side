import { Tab } from '@headlessui/react';
import { Helmet } from 'react-helmet-async';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';

import useAxiosSecure from '../../../../../customHooks/AxiosSecure';

const ManageAgents = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: pendingAgents = [],
    isLoading: loadingPending,
  } = useQuery({
    queryKey: ['pendingAgents'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users?activeStatus=pending');
      return res.data;
    },
  });

  const {
    data: currentAgents = [],
    isLoading: loadingAgents,
  } = useQuery({
    queryKey: ['agents'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users?role=agent');
      return res.data;
    },
  });

  const updateUser = useMutation({
    mutationFn: async ({ email, data }) =>
      await axiosSecure.patch(`/users/${email}`, data),
    onSuccess: () => {
      toast.success('Updated successfully');
      queryClient.invalidateQueries(['pendingAgents']);
      queryClient.invalidateQueries(['agents']);
    },
    onError: () => toast.error('Failed to update'),
  });

  const handleApprove = (email) =>
    updateUser.mutate({ email, data: { role: 'agent', activeStatus: 'approved' } });

  const handleReject = (email) =>
    updateUser.mutate({ email, data: { activeStatus: 'rejected' } });

  const handleDemote = (email) =>
    updateUser.mutate({ email, data: { role: 'user', activeStatus: null } });

  if (loadingPending || loadingAgents) return <p className="text-center py-6">Loading...</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <Helmet>
        <title>Manage Agents | Dashboard</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Agents</h2>

      <Tab.Group>
        <Tab.List className="flex space-x-4 mb-4">
          {['Pending Applications', 'All Current Agents'].map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                `px-4 py-2 font-medium rounded ${
                  selected ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-700'
                }`
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {/* Pending Applications */}
          <Tab.Panel>
            <div className="overflow-x-auto rounded shadow">
              {pendingAgents.length === 0 ? (
                <p className="text-center text-gray-500">No pending applications</p>
              ) : (
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 text-left">
                    <tr>
                      <th className="p-3">Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Location</th>
                      <th className="p-3">Insurance Type</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingAgents.map((user) => (
                      <tr key={user.email} className="border-b">
                        <td className="p-3">{user.name}</td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3">{user.location || 'N/A'}</td>
                        <td className="p-3">{user.insuranceType || 'N/A'}</td>
                        <td className="p-3 capitalize">{user.activeStatus}</td>
                        <td className="p-3 space-x-2">
                          <button
                            onClick={() => handleApprove(user.email)}
                            className="px-2 py-1 bg-green-600 text-white rounded text-xs"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(user.email)}
                            className="px-2 py-1 bg-red-600 text-white rounded text-xs"
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </Tab.Panel>

          {/* Current Agents */}
          <Tab.Panel>
            <div className="overflow-x-auto rounded shadow">
              {currentAgents.length === 0 ? (
                <p className="text-center text-gray-500">No active agents</p>
              ) : (
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 text-left">
                    <tr>
                      <th className="p-3">Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Location</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentAgents.map((user) => (
                      <tr key={user.email} className="border-b">
                        <td className="p-3">{user.name}</td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3">{user.location || 'N/A'}</td>
                        <td className="p-3 capitalize">{user.activeStatus || 'approved'}</td>
                        <td className="p-3">
                          <button
                            onClick={() => handleDemote(user.email)}
                            className="px-2 py-1 bg-yellow-500 text-white rounded text-xs"
                          >
                            Demote to User
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ManageAgents;
