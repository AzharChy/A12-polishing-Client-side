import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import useAxiosSecure from '../../../../../customHooks/AxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ManagePolicies = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [formState, setFormState] = useState({ title: '', category: '', description: '', eligibility: '', premium: '', timeLength: '' });

  const { data: policies = [], isLoading } = useQuery({
    queryKey: ['policies'],
    queryFn: async () => {
      const res = await axiosSecure.get('/policies');
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/policies/${id}`),
    onSuccess: () => {
      Swal.fire('Policy deleted');
      queryClient.invalidateQueries(['policies']);
    },
    onError: () => toast.error('Failed to delete'),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updateData }) =>
      await axiosSecure.patch(`/policies/${id}`, updateData),
    onSuccess: () => {
      Swal.fire('Policy updated');
      setIsOpen(false);
      queryClient.invalidateQueries(['policies']);
    },
    onError: () => toast.error('Failed to update'),
  });

  const openEditModal = (policy) => {
    setEditingPolicy(policy);
    setFormState({
  title: policy.title,
  category: policy.category,
  description: policy.shortDescription, // fix name mismatch
  eligibility: policy.eligibility,
  premium: policy.premium,
  timeLength: policy.termLength,
});

    setIsOpen(true);
  };

  const handleUpdate = () => {
    updateMutation.mutate({
      id: editingPolicy._id,
      updateData: formState,
    });
  };

  if (isLoading) return <p className="text-center py-10">Loading policies...</p>;

  return (
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
      <Helmet>
        <title>Manage Policies | Dashboard</title>
      </Helmet>

      <div className='text-center text-bold'>
        <Link to='/dashboard/addPolicies'>
       <button className='text-center text-bold bg-gray-900 p-4 text-white'> Add Policy</button>
        </Link>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-center">Manage Insurance Policies</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead className="dark:bg-gray-300 text-left">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Total Bookings</th>
              <th className="p-3">Created</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => (
              <tr key={policy._id} className="border-b dark:border-gray-300 dark:bg-gray-50">
                <td className="p-3 font-medium">{policy.title}</td>
                <td className="p-3">{policy.category}</td>
                <td className="p-3">{policy.totalCount}</td>
                <td className="p-3">{new Date(policy.createdAt).toLocaleDateString()}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => openEditModal(policy)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(policy._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {policies.length === 0 && (
          <p className="text-center py-4 text-gray-500">No policies found.</p>
        )}
      </div>

      {/* Edit Modal */}
    {/* Edit Modal */}
<Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
  <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
  <div className="fixed inset-0 flex items-center justify-center p-4">
    <DialogPanel className="w-full max-w-md rounded bg-white p-6 shadow-lg space-y-4">
      <DialogTitle className="text-lg font-semibold">Edit Policy</DialogTitle>

      <div>
        <label className="block text-sm font-medium mb-1">Policy Title</label>
        <input
          type="text"
          value={formState.title}
          onChange={(e) => setFormState({ ...formState, title: e.target.value })}
          placeholder="Policy Title"
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Policy Category</label>
        <input
          type="text"
          value={formState.category}
          onChange={(e) => setFormState({ ...formState, category: e.target.value })}
          placeholder="Policy Category"
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Short Description</label>
        <textarea
          value={formState.description}
          onChange={(e) => setFormState({ ...formState, description: e.target.value })}
          placeholder="Short Description"
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Eligibility</label>
        <input
          type="text"
          value={formState.eligibility}
          onChange={(e) => setFormState({ ...formState, eligibility: e.target.value })}
          placeholder="Eligibility"
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Premium</label>
        <input
          type="text"
          value={formState.premium}
          onChange={(e) => setFormState({ ...formState, premium: e.target.value })}
          placeholder="Premium"
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Term Length</label>
        <input
          type="text"
          value={formState.timeLength}
          onChange={(e) => setFormState({ ...formState, timeLength: e.target.value })}
          placeholder="Term Length"
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
        >
          Save Changes
        </button>
      </div>
    </DialogPanel>
  </div>
</Dialog>

    </div>
  );
};

export default ManagePolicies;
