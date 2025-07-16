import { useQuery } from '@tanstack/react-query';

import { Link } from 'react-router-dom';
import useAxiosSecure from '../../customHooks/AxiosSecure';

const PopularPolicies = () => {
  const axiosSecure = useAxiosSecure();

  const { data: policies = [], isLoading } = useQuery({
    queryKey: ['popularPolicies'],
    queryFn: async () => {
      const res = await axiosSecure.get('/policies');
      return res.data
        .sort((a, b) => b.totalCount - a.totalCount) // Sort by popularity
        .slice(0, 6); // Take top 6
    }
  });

  if (isLoading) return <p className="text-center py-10">Loading popular policies...</p>;

  return (
    <div className="py-10 max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8"> Popular Policies</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Increased gap for better spacing */}
        {policies.map((policy) => (
          <div
            key={policy._id}
            className="group relative bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl hover:border-violet-400 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
          >
            <div className="p-6">
              {/* Policy Title */}
              <h3 className="text-2xl font-extrabold text-gray-800 mb-4 leading-tight">
                {policy.title}
              </h3>

              {/* Policy Details */}
              <div className="space-y-2 text-gray-700">
                <p className="flex items-center">
                  <span className="font-semibold text-violet-600 mr-2">💰 Coverage:</span>
                  <span className="text-gray-800">{policy.premium}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-semibold text-violet-600 mr-2">⏳ Term Duration:</span>
                  <span className="text-gray-800">{policy.duration} years</span>
                </p>
                <p className="flex items-center">
                  <span className="font-semibold text-violet-600 mr-2">🛒 Purchased:</span>
                  <span className="text-gray-800">{policy.totalCount} times</span>
                </p>
              </div>

              {/* View Details Button */}
              <Link
                to={`/policy/${policy._id}`}
                className="inline-flex items-center justify-center mt-6 w-full bg-violet-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-white transition-all duration-300"
              >
                View Details
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularPolicies;
