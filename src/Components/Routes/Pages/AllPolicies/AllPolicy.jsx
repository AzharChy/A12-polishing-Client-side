import React, { useMemo, useState } from 'react';
import useAxios from '../../../../customHooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const AllPolicy = () => {

    const fetch = useAxios();

    const [categoryFilter, setCategoryFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const {data : policies = [], isLoading, isError, error} = useQuery({
        queryKey: ['policies'],
        queryFn: async () =>{
            const res = await fetch.get('/policies');
            return res.data;
        }
    });

    // unique categories 

    const categories = useMemo(()=>{
        const cats = policies.map(cat => cat.categories);
        return['All', ...new Set(cats)]
    }, [policies])
    // filter 

     if (isLoading) return <p className="text-center py-10">Loading policies...</p>;
  if (isError) return <p className="text-red-500 text-center py-10">Error: {error.message}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Insurance Policies</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {policies.map(policy => (
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
    </div>
  );
};

export default AllPolicy;