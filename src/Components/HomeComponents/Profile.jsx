import { useForm } from 'react-hook-form';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import React from 'react';
import useAuth from '../../customHooks/useAuth';
import useAxiosSecure from '../../customHooks/AxiosSecure';

const UserProfile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 1️⃣ Fetch user data from DB
  const { data: dbUser = {}, isLoading } = useQuery({
    queryKey: ['dbUser', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  // 2️⃣ react-hook-form setup
  const { register, handleSubmit, reset } = useForm();

  // 3️⃣ Mutation to update profile
  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.patch(`/users/${user.email}`, data);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Updated!', 'Your profile has been updated.', 'success');
      queryClient.invalidateQueries(['dbUser']);
    },
  });

  // 4️⃣ On submit handler
  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  // 5️⃣ Auto-fill form when dbUser is ready
  React.useEffect(() => {
    if (dbUser) {
      reset({
        name: dbUser.name,
        photo: dbUser.photo,
      });
    }
  }, [dbUser, reset]);

  if (isLoading || loading) return <p className="text-center py-10">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="max-w-xl w-full mx-auto px-6 py-8 bg-white shadow-lg rounded-xl transform transition-all duration-300 hover:scale-[1.01]">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">My Profile</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-semibold text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              {...register('name')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
              placeholder="Your full name"
            />
          </div>

          {/* Email (non-editable) */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={user?.email || ''}
              disabled
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 cursor-not-allowed text-gray-500"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label htmlFor="photo" className="block mb-2 text-sm font-semibold text-gray-700">Photo URL</label>
            <input
              type="text"
              id="photo"
              {...register('photo')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
              placeholder="URL to your profile picture"
            />
          </div>

          {/* Role Badge */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Your Role</label>
            <span
              className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide
                ${dbUser?.role === 'admin' ? 'bg-red-600 text-white shadow-md' :
                 dbUser?.role === 'agent' ? 'bg-blue-600 text-white shadow-md' :
                 'bg-green-600 text-white shadow-md'}`
              }
            >
              {dbUser?.role || 'user'}
            </span>
          </div>

          {/* Last Login Info (Firebase) */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Last Login</label>
            <p className="text-sm text-gray-500">
              {user?.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleString() : 'N/A'}
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100 transition duration-300 ease-in-out
              disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-500"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Saving Profile...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
