import { useForm } from 'react-hook-form';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../../../../customHooks/useAuth';
import useAxiosSecure from '../../../../../customHooks/AxiosSecure';

const ClaimRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Fetch approved policies for the logged-in user
  const { data: approvedPolicies = [], isLoading } = useQuery({
    queryKey: ['approvedPolicies', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/myPolicies/user/${user.email}`);
      return res.data.filter(policy => policy.status === 'approved');
    }
  });

  // ✅ Form setup
  const { register, handleSubmit, reset } = useForm();

  // ✅ Submit claim
  const claimMutation = useMutation({
    mutationFn: async (formData) => {
      return await axiosSecure.post('/claims', formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['approvedPolicies']);
      Swal.fire('Success', 'Claim submitted successfully!', 'success');
      reset();
    },
    onError: () => {
      Swal.fire('Error', 'You already Submitted the claim', 'error');
    }
  });

  const handleClaimSubmit = async (data, quote) => {
    const formData = new FormData();
    formData.append('quoteId', quote._id);
    formData.append('policyName', quote.policyName);
    formData.append('email', user.email);
    formData.append('reason', data.reason);
    formData.append('status', 'pending');
    formData.append('document', data.document[0]);

    claimMutation.mutate(formData);
  };

  if (isLoading) return <p className="text-center py-10">Loading your approved policies...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-6">📝 Claim Request</h2>

      <div className="space-y-8">
        {approvedPolicies.map((quote) => (
          <div key={quote._id} className="border rounded-lg p-4 shadow-md space-y-2">
            <p><strong>Policy Name:</strong> {quote.policyName}</p>
            <p><strong>Claim Status:</strong> 
              {quote.claimStatus === 'approved' ? (
                <button
                  onClick={() => Swal.fire('✅ Approved', 'Your claim has been approved!', 'success')}
                  className="ml-2 text-green-600 font-semibold underline"
                >
                  Approved
                </button>
              ) : quote.status === 'pending' ? (
                <span className="ml-2 text-yellow-600 font-semibold">Claimed</span>
              ) : (
                <span className="ml-2 text-gray-500"> Pending</span>
              )}
            </p>

            {/* Conditional Claim Form */}
            {quote.status === 'approved' && (
              <form
                className="space-y-4"
                onSubmit={handleSubmit((data) => handleClaimSubmit(data, quote))}
              >
                <div>
                  <label className="block font-medium">Reason for Claim</label>
                  <input
                    type="text"
                    {...register('reason', { required: true })}
                    className="w-full border p-2 rounded"
                    placeholder="Describe your claim reason..."
                  />
                </div>

                <div>
                  <label className="block font-medium">Upload Document (PDF/Image)</label>
                  <input
                    type="file"
                    accept=".pdf, image/*"
                    {...register('document', { required: true })}
                    className="w-full border p-2 rounded"
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
                >
                  Submit Claim
                </button>
              </form>
            )}
          </div>
        ))}
      </div>

      {approvedPolicies.length === 0 && (
        <p className="text-center py-10 text-gray-500">No approved policies available for claims.</p>
      )}
    </div>
  );
};

export default ClaimRequest;
