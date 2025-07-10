import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../../customHooks/useAxios';
import { Helmet } from 'react-helmet-async';

const PolicyDetails = () => {
  const { id } = useParams();
  const fetch = useAxios();
  const navigate = useNavigate();

  const { data: policy, isLoading, isError, error } = useQuery({
    queryKey: ['policy', id],
    queryFn: async () => {
      const res = await fetch.get(`/policies/${id}`);
      return res.data;
    }
  });

  if (isLoading) return <p className="text-center py-10">Loading policy...</p>;
  if (isError) return <p className="text-red-500 text-center py-10">Error: {error.message}</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Helmet>
        <title>{policy.title} | Insurance Details</title>
        <meta name="description" content={`Details of ${policy.title} - eligibility, benefits, premium and more.`} />
      </Helmet>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Image */}
        <div className="flex-shrink-0 w-full md:w-1/2">
          <img src={policy.image} alt={policy.title} className="w-full h-auto object-contain rounded-lg" />
        </div>

        {/* Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{policy.title}</h1>
          <span className="inline-block mb-4 px-3 py-1 bg-violet-200 text-violet-700 rounded text-sm">{policy.category}</span>
          
          <p className="mb-4 text-gray-700">{policy.shortDescription}</p>

          <ul className="space-y-2 text-gray-800">
            <li><strong>Eligibility:</strong> {policy.eligibility}</li>
            <li><strong>Benefits:</strong> {policy.benefits}</li>
            <li><strong>Premium:</strong> {policy.premium}</li>
            <li><strong>Term Length:</strong> {policy.termLength}</li>
          </ul>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => navigate('/get-quote')}
              className="bg-violet-600 text-white px-6 py-2 rounded hover:bg-violet-700 transition"
            >
              Get Quote
            </button>

            <button
              onClick={() => navigate('/book-agent')}
              className="border border-violet-600 text-violet-600 px-6 py-2 rounded hover:bg-violet-50 transition"
            >
              Book Agent Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetails;
