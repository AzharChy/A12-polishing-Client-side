import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../../../customHooks/AxiosSecure';

const Quotes = () => {
    const policyId = useParams();
    
  const { state } = useLocation();
  const navigate = useNavigate();
  const policyName = state?.policyName || 'Unknown Policy';
  const baseRate = state?.baseRate || 15;
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    coverage: '',
    duration: '',
    smoker: false
  });

  const [quote, setQuote] = useState(null);

 const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  setFormData(prev => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value
  }));

  // 👇 Reset quote so user has to re-estimate
  setQuote(null);
};


  const handleSubmit = (e) => {
    e.preventDefault();
    const { age, coverage, duration, smoker } = formData;

    // Simple premium estimation logic
    const monthly = 
      baseRate + 
      Number(age) * 0.5 + 
      (Number(coverage) / 100000) * 10 + 
      Number(duration) * 2 + 
      (smoker ? 20 : 0);

    const annual = monthly * 12;

    setQuote({ monthly: monthly.toFixed(2), annual: annual.toFixed(2) });
  };

  const handleApply = async () => {
  const quoteData = {
    policyId,
    policyName,
    ...formData,
    monthlyPremium: quote.monthly,
    annualPremium: quote.annual,
    createdAt: new Date()
  };

  try {
    const res = await axiosSecure.post('/quotes', quoteData);
    console.log("Quote saved:", res.data);
    
    navigate(`/apply/${res.data.insertedId
}`, {
      state: {
        policyId,
        policyName,
        formData,
        quote
      }
    });
  } catch (error) {
    console.error('Quote submission error:', error);
  }
};



  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow mt-8 rounded">
      <Helmet>
        <title>Get Quote | Insurance App</title>
      </Helmet>

      <h1 className="text-2xl font-bold mb-4 text-center">Get a Quote for: <span className="text-violet-600">{policyName}</span></h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Age</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>

        <div>
          <label className="block font-medium">Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border p-2 rounded" required>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Coverage Amount (BDT)</label>
          <input type="number" name="coverage" value={formData.coverage} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>

        <div>
          <label className="block font-medium">Duration (Years)</label>
          <input type="number" name="duration" value={formData.duration} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>

        <div className="flex items-center">
          <input type="checkbox" name="smoker" checked={formData.smoker} onChange={handleChange} className="mr-2" />
          <label>Smoker?</label>
        </div>

        <button type="submit" className="w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700">Get Premium Estimate</button>
      </form>

      {quote === null && (
  <p className="text-sm text-gray-500 mt-2 text-center">
    Click "Get Premium Estimate" to calculate based on new input.
  </p>
)}


      {quote && (
        <div className="mt-6 border-t pt-4">
          <h2 className="text-lg font-semibold mb-2 text-center text-green-700">Estimated Premium</h2>
          <p className="text-center">Monthly: <span className="font-bold">৳{quote.monthly}</span></p>
          <p className="text-center">Annual: <span className="font-bold">৳{quote.annual}</span></p>
          <button onClick={handleApply} className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Apply for Policy
          </button>
        </div>
      )}
    </div>
  );
};

export default Quotes;
