import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../customHooks/AxiosSecure';

const MeetOurAgents = () => {
  const axiosSecure = useAxiosSecure();

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ['approvedAgents'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users?role=agent&activeStatus=approved');
      return res.data.slice(0, 3);
    }
  });

  if (isLoading) return <p className="text-center py-10">Loading agents...</p>;

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Meet Our Featured Agents</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Increased gap for better spacing */}
        {agents.map((agent, idx) => (
          <div
            key={idx}
            className="group relative bg-white shadow-lg rounded-xl p-8 text-center border border-gray-200
                       hover:shadow-xl hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Agent Photo */}
            <div className="relative w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-md
                            group-hover:border-blue-300 transition-all duration-300">
              <img
                src={agent.photo ? agent.photo : 'https://i.ibb.co/tmZXZBc/placeholder.jpg'}
                alt={agent.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Agent Name */}
            <h3 className="text-xl font-extrabold text-gray-800 mb-2">{agent.name}</h3>

            {/* Agent Location */}
            <p className="text-sm text-gray-500 mb-3 flex items-center justify-center">
              <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
              {agent.location || 'Location not set'}
            </p>

            {/* Agent Details */}
            <div className="space-y-2 text-gray-700 mt-4">
              <p className="flex items-center justify-center text-sm">
                <strong className="text-blue-600 mr-1">Specialty:</strong> {agent.insuranceType || 'General Insurance'}
              </p>
              <p className="flex items-center justify-center text-sm">
                <strong className="text-blue-600 mr-1">Email:</strong> {agent.email}
              </p>
              <p className="flex items-center justify-center text-sm">
                <strong className="text-blue-600 mr-1">Phone:</strong> {agent.phone}
              </p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default MeetOurAgents;
