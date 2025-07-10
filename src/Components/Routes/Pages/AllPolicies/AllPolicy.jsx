import React, { useMemo, useState } from 'react';
import useAxios from '../../../../customHooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const AllPolicy = () => {
  const fetch = useAxios();

  const [categoryFilter, setCategoryFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: policies = [], isLoading, isError, error } = useQuery({
    queryKey: ['policies'],
    queryFn: async () => {
      const res = await fetch.get('/policies');
      return res.data;
    }
  });

  // Unique categories
  const categories = useMemo(() => {
    const cats = policies.map(p => p.category);
    return ['All', ...new Set(cats)];
  }, [policies]);

  // Filter by category
  const filteredPolicies = useMemo(() => {
    return categoryFilter === 'All'
      ? policies
      : policies.filter(p => p.category === categoryFilter);
  }, [policies, categoryFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPolicies.length / itemsPerPage);
  const paginatedPolicies = filteredPolicies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    setCurrentPage(1); // reset to page 1 when category changes
  };

  if (isLoading) return <p className="text-center py-10">Loading policies...</p>;
  if (isError) return <p className="text-red-500 text-center py-10">Error: {error.message}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Helmet>
        <title>All Insurance Policies | InsuranceApp</title>
        <meta name="description" content="Browse all available insurance policies by category with filters and pagination." />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6 text-center">Available Insurance Policies</h1>

      {/* Filter dropdown */}
      <div className="mb-6 flex justify-end">
        <label className="mr-2 font-semibold">Filter by Category:</label>
        <select
          value={categoryFilter}
          onChange={handleCategoryChange}
          className="px-2 py-1 border rounded"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Policy Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedPolicies.map(policy => (
          <div key={policy._id} className="border rounded-lg shadow p-4 bg-white hover:shadow-lg transition">
            <img src={policy.image} alt={policy.title} className="w-full h-48 object-contain mb-4" />
            <h2 className="text-xl font-semibold mb-2">{policy.title}</h2>
            <span className="text-sm px-2 py-1 bg-violet-100 text-violet-700 rounded">{policy.category}</span>
            <p className="mt-2 text-gray-700">{policy.shortDescription}</p>
            <Link
              to={`/policy/${policy._id}`}
              className="inline-block mt-4 text-violet-600 font-semibold hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map(num => (
          <button
            key={num}
            className={`px-3 py-1 border rounded ${currentPage === num + 1 ? 'bg-violet-600 text-white' : ''}`}
            onClick={() => setCurrentPage(num + 1)}
          >
            {num + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllPolicy;
