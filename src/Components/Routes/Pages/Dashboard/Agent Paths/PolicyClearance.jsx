import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../../customHooks/AxiosSecure';

const PolicyClearance = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch all claims
  const { data: claims = [], isLoading } = useQuery({
    queryKey: ['claims'],
    queryFn: async () => {
      const res = await axiosSecure.get('/claims');
      return res.data;
    }
  });

  // Mutation to approve claim
  const approveMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/claims/claims/approve/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['claims']);
      Swal.fire('Success', 'Claim approved successfully!', 'success');
      setIsOpen(false);
    },
    onError: () => {
      Swal.fire('Error', 'Failed to approve claim', 'error');
    }
  });

  const handleApprove = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are approving this claim.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve it!',
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p className="text-center py-10">Loading claims...</p>;

  return (
    <div className="container p-4 mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">🛡️ Policy Claim Clearance</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Policy</th>
              <th className="p-2">Email</th>
              <th className="p-2">Status</th>
              <th className="p-2">Date</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim) => (
              <tr key={claim._id} className="border-b">
                <td className="p-2">{claim.policyName}</td>
                <td className="p-2">{claim.email}</td>
                <td className="p-2 capitalize">{claim.status}</td>
                <td className="p-2">{new Date(claim.createdAt).toLocaleDateString()}</td>
                <td className="p-2">
                  <button
                    className="text-blue-600 text-sm hover:underline"
                    onClick={() => {
                      setSelectedClaim(claim);
                      setIsOpen(true);
                    }}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {claims.length === 0 && (
          <p className="text-center py-6 text-gray-500">No claims found.</p>
        )}
      </div>

      {/* Modal for claim details */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg bg-white p-6 rounded shadow space-y-4">
            <DialogTitle className="text-lg font-semibold">Claim Details</DialogTitle>
            {selectedClaim && (
              <div className="space-y-2">
                <p><strong>Policy Name:</strong> {selectedClaim.policyName}</p>
                <p><strong>Email:</strong> {selectedClaim.email}</p>
                <p><strong>Reason:</strong> {selectedClaim.reason}</p>
                <p><strong>Status:</strong> {selectedClaim.status}</p>
                <p><strong>Submitted At:</strong> {new Date(selectedClaim.createdAt).toLocaleString()}</p>

                {selectedClaim.document && (
                  <a
                    href={`data:${selectedClaim.document.mimetype};base64,${btoa(
                      new Uint8Array(selectedClaim.document.buffer.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
                    )}`}
                    download={selectedClaim.document.name}
                    className="text-blue-600 underline"
                  >
                    Download Document
                  </a>
                )}
              </div>
            )}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Close
              </button>
              {selectedClaim?.status === 'pending' && (
                <button
                  onClick={() => handleApprove(selectedClaim._id)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Approve
                </button>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default PolicyClearance;
