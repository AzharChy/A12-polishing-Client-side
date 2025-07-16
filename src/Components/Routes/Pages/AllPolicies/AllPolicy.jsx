import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../../customHooks/useAxios';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

const AllPolicy = () => {
  const fetch = useAxios();

  const [categoryFilter, setCategoryFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 400);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Fetch policies from backend
  const {
    data: policies = [],
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['policies', debouncedSearch],
    queryFn: async () => {
      const res = await fetch.get(`/policies?search=${debouncedSearch}`);
      return res.data;
    }
  });

  // Extract unique categories
  const categories = useMemo(() => {
    const catList = policies.map(p => p.category);
    return ['All', ...new Set(catList)];
  }, [policies]);

  // Filter policies by category
  const filteredPolicies = useMemo(() => {
    return categoryFilter === 'All'
      ? policies
      : policies.filter(p => p.category === categoryFilter);
  }, [policies, categoryFilter]);

  // Paginate filtered policies
  const totalPages = Math.ceil(filteredPolicies.length / itemsPerPage);
  const paginatedPolicies = filteredPolicies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers
  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    setCurrentPage(1); // reset on filter change
  };

  if (isLoading) return <p className="text-center py-10">Loading policies...</p>;
  if (isError) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Helmet>
        <title>All Insurance Policies | InsuranceApp</title>
      </Helmet>

      <h1 className="text-3xl font-bold text-center mb-6">All Insurance Policies</h1>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border rounded shadow-sm"
        />

        <div className="flex items-center">
          <label className="mr-2 font-semibold">Filter by Category:</label>
          <select
            value={categoryFilter}
            onChange={handleCategoryChange}
            className="px-3 py-2 border rounded"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Increased gap for more breathing room */}
        {paginatedPolicies.map(policy => (
          <div
            key={policy._id}
            className="group relative bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl hover:border-violet-300 transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
          >
            {/* Image Section */}
            <div className="relative w-full h-56 bg-gray-50 flex items-center justify-center rounded-t-xl overflow-hidden">
              <img
                src={policy.image}
                alt={policy.title}
                className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
              {/* Optional: Overlay for subtle effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              <h2 className="text-xl font-extrabold text-gray-800 mb-2 leading-tight">
                {policy.title}
              </h2>
              <span className="inline-block mt-2 px-3 py-1 text-sm font-semibold bg-violet-100 text-violet-700 rounded-full shadow-sm">
                {policy.category}
              </span>
              <p className="text-gray-600 mt-4 line-clamp-3"> {/* Use line-clamp for consistent description height */}
                {policy.shortDescription}
              </p>

              <Link
                to={`/policy/${policy._id}`}
                className="inline-flex items-center mt-5 text-violet-600 hover:text-violet-800 font-bold transition-colors duration-200"
              >
                Policy Details
                <svg
                  className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-10">
        <button
          onClick={() => setCurrentPage(prev => prev - 1)}
          disabled={currentPage === 1}
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
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllPolicy;
