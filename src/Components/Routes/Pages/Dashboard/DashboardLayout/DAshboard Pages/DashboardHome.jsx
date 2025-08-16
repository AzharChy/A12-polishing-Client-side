
import { FaUsers, FaUserTie, FaFileAlt } from 'react-icons/fa';

const DashboardHome = () => {

  
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto py-10 px-4">
      {/* Total Users */}
      <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg border border-gray-200 transition">
        <div className="flex items-center gap-4">
          <FaUsers className="text-3xl text-blue-500" />
          <div>
            <p className="text-xl font-bold">100+</p>
            <p className="text-gray-600">Total Users</p>
          </div>
        </div>
      </div>

      {/* Total Agents */}
      <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg border border-gray-200 transition">
        <div className="flex items-center gap-4">
          <FaUserTie className="text-3xl text-green-500" />
          <div>
            <p className="text-xl font-bold">10+</p>
            <p className="text-gray-600">Total Agents</p>
          </div>
        </div>
      </div>

      {/* Total Policies */}
      <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg border border-gray-200 transition">
        <div className="flex items-center gap-4">
          <FaFileAlt className="text-3xl text-purple-500" />
          <div>
            <p className="text-xl font-bold">10</p>
            <p className="text-gray-600">Total Policies</p>
          </div>
        </div>
      </div>
    </div>
  
    );
};

export default DashboardHome;

// lets implement a thing in the dashboard home.. we will show number of total users, agents and no of polices dynamically in three cards,,lets do this