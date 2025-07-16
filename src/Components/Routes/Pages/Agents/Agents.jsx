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

      <form onSubmit={handleSubmit} className="space-y-6"> {/* Increased space-y for better form field separation */}
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g., John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              required
            />
          </div>

          {/* Email (Disabled) */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your.email@example.com"
              value={formData.email}
              disabled
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 cursor-not-allowed text-gray-500"
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="e.g., Sylhet, Bangladesh"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              required
            />
          </div>

          {/* Insurance Type Select */}
          <div>
            <label htmlFor="insuranceType" className="block text-sm font-medium text-gray-700 mb-1">Insurance Type</label>
            <div className="relative">
              <select
                id="insuranceType"
                name="insuranceType"
                value={formData.insuranceType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white pr-10"
                required
              >
                <option value="" disabled>Select Insurance Type</option>
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
              {/* Custom arrow for select */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15 9.707l-1.414-1.414L10 12.086l-3.586-3.586L5 9.707z"/></svg>
              </div>
            </div>
          </div>

          {/* NID or Passport Number */}
          <div>
            <label htmlFor="nationalId" className="block text-sm font-medium text-gray-700 mb-1">NID or Passport Number</label>
            <input
              type="text"
              id="nationalId"
              name="nationalId"
              placeholder="e.g., 1234567890 (NID) or AB1234567 (Passport)"
              value={formData.nationalId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="e.g., +8801XXXXXXXXX"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-violet-600 text-white font-bold rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-400"
            disabled={isPending}
          >
            {isPending ? 'Submitting Request...' : 'Submit Request'}
          </button>
        </form>
    </div>
  );
};

export default Agents;
