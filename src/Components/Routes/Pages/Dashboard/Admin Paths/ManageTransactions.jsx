import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../../customHooks/AxiosSecure';


const ManageTransactions = () => {
  const axiosSecure = useAxiosSecure();

  // Filters state
  const [filters, setFilters] = useState({
    user: '',
    policy: '',
    startDate: '',
    endDate: '',
  });

  // Fetch transactions with filters
  const { data: transactions = [], isLoading, error } = useQuery({
  queryKey: ['transactions', filters],
  queryFn: async () => {
    const params = new URLSearchParams();
    if (filters.user) params.append('user', filters.user);
    if (filters.policy) params.append('policy', filters.policy);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);

    const res = await axiosSecure.get(`/transactions?${params.toString()}`);
    return res.data;
  },
  keepPreviousData: true,
});


  // Calculate total income
  const totalIncome = transactions.reduce(
    (sum, txn) => sum + parseFloat(txn.amount || 0),
    0
  );

  if (isLoading) return <p>Loading transactions...</p>;
  if (error) return <p>Error loading transactions</p>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Manage Transactions</h2>

      <div className="mb-4 space-y-2 md:flex md:space-x-4 md:space-y-0">
        <input
          type="text"
          placeholder="Filter by User Email"
          className="border p-2 rounded w-full md:w-1/4"
          value={filters.user}
          onChange={(e) => setFilters((f) => ({ ...f, user: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Filter by Policy Name"
          className="border p-2 rounded w-full md:w-1/4"
          value={filters.policy}
          onChange={(e) => setFilters((f) => ({ ...f, policy: e.target.value }))}
        />
        <input
          type="date"
          className="border p-2 rounded w-full md:w-1/5"
          value={filters.startDate}
          onChange={(e) => setFilters((f) => ({ ...f, startDate: e.target.value }))}
        />
        <input
          type="date"
          className="border p-2 rounded w-full md:w-1/5"
          value={filters.endDate}
          onChange={(e) => setFilters((f) => ({ ...f, endDate: e.target.value }))}
        />
      </div>

      <div className="mb-4 font-semibold text-lg">
        Total Income: ${totalIncome.toFixed(2)}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border border-gray-300">Customer Email</th>
              <th className="p-2 border border-gray-300">Policy Name</th>
              <th className="p-2 border border-gray-300">Paid Amount ($)</th>
              <th className="p-2 border border-gray-300">Date</th>
              <th className="p-2 border border-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  No transactions found.
                </td>
              </tr>
            )}
            {transactions.map((txn) => (
              <tr key={txn._id}>
                <td className="p-2 border border-gray-300">{txn.email}</td>
                <td className="p-2 border border-gray-300">{txn.policyName}</td>
                <td className="p-2 border border-gray-300">${parseFloat(txn.amount).toFixed(2)}</td>
                <td className="p-2 border border-gray-300">
                  {new Date(txn.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 border border-gray-300 capitalize">{txn.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTransactions;
