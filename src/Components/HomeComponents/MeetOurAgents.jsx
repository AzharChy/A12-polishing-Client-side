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

        <div className="grid md:grid-cols-3 gap-6">
          {agents.map((agent, idx) => (
            <div key={idx} className="bg-white shadow rounded-lg p-6 text-center border">
              <img
                src={
                  agent.photo
                    ? agent.photo
                    : 'https://i.ibb.co/tmZXZBc/placeholder.jpg'
                }
                alt={agent.name}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="text-lg font-bold">{agent.name}</h3>
              <p className="text-sm text-gray-500">{agent.location || 'Location not set'}</p>
              <p className="text-sm mt-2">
                <strong>Specialty:</strong> {agent.insuranceType || 'General Insurance'}
              </p>
              <p className="text-sm">
                <strong>Contact:</strong> {agent.email}
              </p>
              <p className="text-sm text-gray-600">📞 {agent.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurAgents;
