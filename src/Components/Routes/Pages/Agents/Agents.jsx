import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useMutation } from '@tanstack/react-query';

import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../customHooks/AxiosSecure';
import useAuth from '../../../../customHooks/useAuth';

const Agents = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    location: '',
    insuranceType: '',
    nationalId: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.patch(`/users/${user.email}`, {
        ...data,
        activeStatus: 'pending',
        role: 'requested-agent',
      });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Success!', 'Agent request submitted.', 'success');
    },
    onError: () => {
      Swal.fire('Error', 'Something went wrong.', 'error');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <Helmet><title>Request to Become an Agent</title></Helmet>

      <h2 className="text-2xl font-bold text-center mb-4 text-violet-700">Become an Insurance Agent</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          disabled
          className="input input-bordered w-full bg-gray-100"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <select
          name="insuranceType"
          value={formData.insuranceType}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Insurance Type</option>
          <option>Term Life</option>
          <option>Senior Plan</option>
          <option>Child Plan</option>
          <option>Health Insurance</option>
          <option>Auto Insurance</option>
          <option>Homeowners Insurance</option>
          <option>Travel Insurance</option>
          <option>Business Insurance</option>
          <option>Family Insurance</option>
        </select>
        <input
          type="text"
          name="nationalId"
          placeholder="NID or Passport Number"
          value={formData.nationalId}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <button
          type="submit"
          className="btn w-full bg-violet-600 text-white hover:bg-violet-700"
          disabled={isPending}
        >
          {isPending ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default Agents;
