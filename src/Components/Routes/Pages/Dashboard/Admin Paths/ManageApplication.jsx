import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';

import useAxiosSecure from '../../../../../customHooks/AxiosSecure';

const ManageApplication = () => {
 
  const axiosSecure = useAxiosSecure();
  const [selectedQuote, setSelectedQuote] = useState(null);

  const { data: applications = [], refetch } = useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const res = await axiosSecure.get('/quotes');
      return res.data;
    }
  });

  const { data: agents = [] } = useQuery({
    queryKey: ['agents'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users?role=agent');
      return res.data;
    }
  });

  const handleStatusChange = async (id, status) => {
    try {
      await axiosSecure.patch(`/quotes/status/${id}`, { status });
      refetch();
      Swal.fire('Success', `Application ${status}`, 'success');
    } catch (err) {
      Swal.fire('Error', 'Something went wrong', 'error');
    }
  };

  const handleAssignAgent = async (id, agentEmail) => {
    try {
      await axiosSecure.patch(`/quotes/assign-agent/${id}`, { agentEmail });
      refetch();
      Swal.fire('Assigned', 'Agent assigned successfully', 'success');
    } catch (err) {
      console.log(err);
      Swal.fire('Error', 'Failed to assign agent', 'error');
    }
  };

  return (
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
      <Helmet>
        <title>Manage Applications | Dashboard</title>
      </Helmet>

      <h2 className="mb-4 text-2xl font-semibold leading-tight">Manage Insurance Applications</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col className="w-24" />
          </colgroup>
          <thead className="dark:bg-gray-300">
            <tr className="text-left">
              <th className="p-3">Applicant</th>
              <th className="p-3">Policy</th>
              <th className="p-3">Submitted On</th>
              <th className="p-3">Status</th>
              <th className="p-3">Assign Agent</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr
                key={app._id}
                className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
              >
                <td className="p-3">
                  <p>{app.fullName}</p>
                  <p className="text-gray-500 text-xs">{app.email}</p>
                </td>
                <td className="p-3">{app.policyName}</td>
                <td className="p-3">
                  <p>{new Date(app.appliedAt).toLocaleDateString()}</p>
                </td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 font-semibold rounded-md text-white ${
                      app.status === 'approved'
                        ? 'bg-green-600'
                        : app.status === 'rejected'
                        ? 'bg-red-500'
                        : 'bg-yellow-500'
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="p-3">
                  <select
                    onChange={e => handleAssignAgent(app._id, e.target.value)}
                    className="w-full border border-gray-300 text-xs p-1 rounded-md"
                    defaultValue=""
                  >
                    <option disabled value="">
                      Assign Agent
                    </option>
                    {agents.map(agent => (
                      <option key={agent._id} value={agent.email}>
                        {agent.name || agent.email}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => setSelectedQuote(app)}
                    className="px-2 py-1 bg-blue-300 text-xs rounded"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleStatusChange(app._id, 'approved')}
                    className="px-2 py-1 bg-green-400 text-xs rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusChange(app._id, 'rejected')}
                    className="px-2 py-1 bg-red-400 text-xs rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Viewing Application Details */}
      {selectedQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded max-w-lg w-full shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4">Application Details</h2>
            <p><strong>Name:</strong> {selectedQuote.fullName}</p>
            <p><strong>Phone:</strong> {selectedQuote.phone}</p>
            <p><strong>Address:</strong> {selectedQuote.address}</p>
            <p><strong>Nominee:</strong> {selectedQuote.nomineeName} ({selectedQuote.nomineeRelation})</p>
            <p><strong>Premium:</strong> ৳{selectedQuote.monthlyPremium} / ৳{selectedQuote.annualPremium}</p>
            <p><strong>Status:</strong> {selectedQuote.status}</p>

            <button onClick={() => setSelectedQuote(null)} className="mt-4 btn btn-sm">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageApplication;