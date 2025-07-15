import { useForm } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../customHooks/AxiosSecure';

const Newsletter = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post('/newsletter', data);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Subscribed!', 'You have successfully subscribed to our newsletter.', 'success');
      reset();
    },
    onError: (error) => {
      Swal.fire('Oops!', error.response?.data?.error || 'Something went wrong.', 'error');
    }
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="bg-gray-100 p-6 rounded max-w-md mx-auto text-center mt-10 shadow">
      <h2 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          {...register('name', { required: true })}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="email"
          placeholder="Your Email"
          {...register('email', { required: true })}
          className="w-full px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="bg-violet-600 text-white px-6 py-2 rounded hover:bg-violet-700"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
