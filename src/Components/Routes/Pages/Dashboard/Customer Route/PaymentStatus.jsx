import { useQuery } from '@tanstack/react-query';

import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../../../customHooks/useAuth';
import useAxiosSecure from '../../../../../customHooks/AxiosSecure';

const PaymentStatus = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // ✅ Fetch payment-related policies
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['payments', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/quotes/payments/${user.email}`);
      return res.data;
    },
  });

  // ✅ Handle Pay Now
  const handlePayment = async (quote) => {
    const frequency = quote.paymentFrequency || 'monthly';
    const amount = frequency === 'yearly' ? quote.annualPremium : quote.monthlyPremium;

    try {
      const res = await axiosSecure.post('/quotes/create-payment-intent', {
        amount: parseFloat(amount),
      });
      const clientSecret = res.data.clientSecret;

      navigate('/dashboard/paymentForm', {
        state: {
          quote,
          clientSecret,
        },
      });
    } catch (err) {
      Swal.fire('Error', 'Failed to initialize payment', 'error',err);
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading payment status...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-6">💳 Payment Status</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Policy Name</th>
              <th className="p-2">Frequency</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((quote) => {
              const frequency = quote.paymentFrequency || 'monthly';
              const amount =
                frequency === 'yearly'
                  ? quote.annualPremium
                  : quote.monthlyPremium;

              return (
                <tr key={quote._id} className="border-b">
                  <td className="p-2">{quote.policyName}</td>
                  <td className="p-2 capitalize">{frequency}</td>
                  <td className="p-2">${amount}</td>
                  <td className="p-2 capitalize">
                    {quote.paymentStatus === 'paid' ? (
                      <span className="text-green-600 font-semibold">Paid</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Due</span>
                    )}
                  </td>
                  <td className="p-2">
                    {quote.paymentStatus === 'paid' ? (
                      <span className="text-gray-400">✔</span>
                    ) : (
                      <button
                        onClick={() => handlePayment(quote)}
                        className="bg-violet-600 text-white px-3 py-1 rounded hover:bg-violet-700"
                      >
                        Pay Now
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {payments.length === 0 && (
          <p className="text-center py-6 text-gray-500">
            No policies found.
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;
