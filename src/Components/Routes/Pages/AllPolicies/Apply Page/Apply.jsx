import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../../../customHooks/AxiosSecure';
import Swal from 'sweetalert2';

const Apply = () => {
  const { quoteId } = useParams();
  const [healthIssues, setHealthIssues] = useState([]);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [applying, setApplying] = useState(false);

  // Fetch quote data by ID
  const { data: quote, isLoading, isError, error } = useQuery({
    queryKey: ['quote', quoteId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/quotes/${quoteId}`);
      return res.data;
    },
    enabled: !!quoteId
  });

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
    nid:'',
    nomineeName: '',
    nomineeRelation: '',
    nomineeNID:''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setApplying(true);

    try {
      // 1. Update quote with applicant data
      const updateQuote = await axiosSecure.patch(`/quotes/${quoteId}`, {
        ...formData,
        appliedAt: new Date(),
         status: 'pending'
      });

      // 2. Increase totalCount in related policy
     await axiosSecure.patch(`/policies/increment/${quote.policyId}`);
     Swal.fire('Your Application has been submitted');

    //   navigate('/dashboard/my-applications'); // Or anywhere you want
    } catch (err) {
      console.error('Application error:', err);
    } finally {
      setApplying(false);
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading quote details...</p>;
  if (isError) return <p className="text-red-500 text-center py-10">Error: {error.message}</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow mt-8 rounded">
      <Helmet>
        <title>Apply | Insurance App</title>
      </Helmet>

      <h1 className="text-2xl font-bold mb-4 text-center text-violet-700">
        Apply for: {quote.policyName}
      </h1>

      <p className="text-center mb-4 text-sm text-gray-600">
        Monthly Premium: ৳{quote.monthlyPremium} | Annual Premium: ৳{quote.annualPremium}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="nid"
          placeholder="NID"
          value={formData.nid}
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

        <input
          type="text"
          name="nomineeName"
          placeholder="Nominee Name"
          value={formData.nomineeName}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          name="nomineeRelation"
          placeholder="Nominee Relation"
          value={formData.nomineeRelation}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="nomineeNID"
          placeholder="Nominee NID"
          value={formData.nomineeNID}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <div>
  <label className="block font-medium mb-1">Health Disclosure</label>
  <div className="grid grid-cols-2 gap-2">
    {['Diabetes', 'High blood pressure', 'Heart disease', 'Smoking', 'Cancer history', 'None'].map(issue => (
      <label key={issue} className="flex items-center">
        <input
          type="checkbox"
          value={issue}
          checked={healthIssues.includes(issue)}
          onChange={e => {
            const value = e.target.value;
            if (e.target.checked) {
              // If "None" is selected, clear others
              if (value === 'None') {
                setHealthIssues(['None']);
              } else {
                setHealthIssues(prev => [...prev.filter(i => i !== 'None'), value]);
              }
            } else {
              setHealthIssues(prev => prev.filter(i => i !== value));
            }
          }}
          className="mr-2"
        />
        {issue}
      </label>
    ))}
  </div>
</div>


        <button
          type="submit"
          disabled={applying}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {applying ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

export default Apply;
