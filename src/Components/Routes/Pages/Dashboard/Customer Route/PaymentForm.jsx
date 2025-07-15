import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../../../customHooks/AxiosSecure';
import Swal from 'sweetalert2';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { quote, clientSecret } = state || {};

  const [processing, setProcessing] = useState(false);

  // ✅ Update payment status in DB after Stripe payment succeeds
 const updatePayment = useMutation({
  mutationFn: async () => {
    const amount = quote.paymentFrequency === 'yearly' 
      ? parseFloat(quote.annualPremium) 
      : parseFloat(quote.monthlyPremium);

    return await axiosSecure.patch(`/quotes/payment-success/${quote._id}`, { amount });
  },
  onSuccess: () => {
    queryClient.invalidateQueries(['payments']);
    Swal.fire('Success', 'Payment completed successfully!', 'success');
    navigate('/dashboard/paymentStatus');
  },
  onError: () => {
    Swal.fire('Error', 'Failed to update payment status in database', 'error');
  }
});


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setProcessing(true);
    const card = elements.getElement(CardElement);

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: quote.fullName,
          email: quote.email,
        }
      }
    });

    if (error) {
      console.error('Stripe error:', error.message);
      Swal.fire('Error', error.message, 'error');
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      updatePayment.mutate();
    }

    setProcessing(false);
  };

  if (!quote || !clientSecret) {
    return <p className="text-center py-10 text-red-500">⚠ Payment information missing.</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded border">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Pay for: {quote.policyName}
      </h2>

      <p className="text-center mb-4">
        Amount: <strong>${quote.paymentFrequency === 'yearly' ? quote.annualPremium : quote.monthlyPremium}</strong>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement className="p-3 border rounded" />
        <button
          type="submit"
          disabled={!stripe || processing}
          className="w-full px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
        >
          {processing ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
