import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../../../customHooks/AxiosSecure';
import useAuth from '../../../../../customHooks/useAuth';

const ManageCustomers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
 
  const queryClient = useQueryClient();

  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // GET all quotes assigned to this agent
  const { data: quotes = [], isLoading } = useQuery({
    queryKey: ['assignedQuotes', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/quotes/assigned/${user.email}`);
      
      return res.data;
    },
    enabled: !!user?.email,
  });

  // PATCH quote status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status, policyId }) => {
      const statusRes = await axiosSecure.patch(`/quotes/status/${id}`, { status });

      // If approved, increment policy booking count
      if (status === 'approved') {
        await axiosSecure.patch(`/policies/increment/${policyId}`);
      }

      return statusRes;
    },
    onSuccess: () => {
      toast.success('Status updated');
      queryClient.invalidateQueries(['assignedQuotes']);
    },
    onError: () => toast.error('Failed to update status'),
  });

  const handleStatusChange = (quote, newStatus) => {
    updateStatusMutation.mutate({
      id: quote._id,
      status: newStatus,
      policyId: quote.policyId,
    });
  };

  const openModal = (quote) => {
    setSelectedQuote(quote);
    setIsOpen(true);
  };

  if (isLoading) return <div className="text-center py-10">Loading customers...</div>;

  return (
    <div className="container p-4 mx-auto">
      <Helmet>
        <title>Manage Customers | Dashboard</title>
      </Helmet>

      <h2 className="text-2xl font-semibold mb-6 text-center">Customers Assigned to You</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Customer</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Policy</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote) => (
               
              <tr key={quote._id} className="border-t">
                <td className="p-3">{quote.fullName}</td>
                <td className="p-3">{quote.phone}</td>
                <td className="p-3">{quote.policyName}</td>
                <td className="p-3">
                  <select
                    value={quote.status}
                    onChange={(e) => handleStatusChange(quote, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => openModal(quote)}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
            {quotes.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No customers assigned to you yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View Details Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md bg-white p-6 rounded shadow space-y-4">
            <DialogTitle className="text-xl font-bold">Customer Inquiry</DialogTitle>

            <div>
              <p><strong>Name:</strong> {selectedQuote?.fullName}</p>
             
              <p><strong>Phone:</strong> {selectedQuote?.phone || 'N/A'}</p>
              <p><strong>Policy:</strong> {selectedQuote?.policyName}</p>
              <p><strong>Note:</strong> {selectedQuote?.note || 'N/A'}</p>
              <p><strong>Status:</strong> {selectedQuote?.status}</p>
            </div>

            <div className="text-right">
              <button
                className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default ManageCustomers;
