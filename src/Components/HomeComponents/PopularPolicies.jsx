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
      <h2 className="text-3xl font-bold text-center mb-8">🔥 Popular Policies</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {policies.map((policy) => (
          <div
            key={policy._id}
            className="border p-6 rounded-lg shadow hover:shadow-md transition duration-300"
          >
            <h3 className="text-xl font-semibold mb-2">{policy.title}</h3>
            <p><strong>Coverage:</strong> {policy.premium}</p>
            <p><strong>Term Duration:</strong> {policy.duration} years</p>
            <p><strong>Purchased:</strong> {policy.totalCount} times</p>

            <Link
              to={`/policy/${policy._id}`}
              className="inline-block mt-4 bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularPolicies;
