import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import useAxiosSecure from '../../../../../customHooks/AxiosSecure';
import useAuth from '../../../../../customHooks/useAuth';
import { IoStarSharp } from "react-icons/io5";
import jsPDF from 'jspdf';



const MyPolicies = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [review, setReview] = useState({ rating: '', feedback: '' });

  const { data: myQuotes = [], isLoading } = useQuery({
    queryKey: ['myQuotes', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myPolicies/user/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const reviewMutation = useMutation({
    mutationFn: async (reviewData) => {
      return await axiosSecure.post('/myPolicies/reviews', reviewData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myQuotes']);
      Swal.fire('Success', 'Review submitted successfully!', 'success');
      setReviewModalOpen(false);
      setReview({ rating: '', feedback: '' });
    },
    onError: () => {
      Swal.fire('Error', 'Failed to submit review', 'error');
    },
  });

  const handleReviewSubmit = () => {
    if (!review.rating  || !review.feedback) {
      return Swal.fire('Error', 'Please provide a rating and feedback', 'error');
    }
    if(review.rating > 5 || review.rating <0){
        return Swal.fire('Review cant be greater than 5 or less than 0')
    }
    const reviewData = {
      reviewerName: user?.fullName || 'Anonymous',
      reviewerEmail: user?.email,
      feedback: review.feedback,
      rating: parseInt(review.rating),
      quoteId: selectedQuote?._id,
      policyName: selectedQuote?.policyName,
      createdAt: new Date(),
    };

    reviewMutation.mutate(reviewData);
  };

  if (isLoading) return <p className="text-center py-10">Loading your policies...</p>;

  const groupByFirstLetter = (quotes) => {
    const grouped = {};
    for (let quote of quotes) {
      const firstLetter = quote.policyName[0].toUpperCase();
      if (!grouped[firstLetter]) grouped[firstLetter] = [];
      grouped[firstLetter].push(quote);
    }
    return grouped;
  };

  const groupedQuotes = groupByFirstLetter(myQuotes);

  const handleDownloadPolicyPDF = (quote) => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text('Insurance Policy Details', 14, 20);

  doc.setFontSize(12);
  const userName = user?.fullName || user?.displayName || 'N/A';

  const content = [
    [`Name`, userName],
    [`Email`, user?.email],
    [`Policy Name`, quote.policyName],
    [`Status`, quote.status],
    [`Coverage`, quote.coverage],
    [`Duration`, quote.duration],
    [`Monthly Premium`, quote.monthlyPremium],
    [`Annual Premium`, quote.annualPremium],
    [`Nominee`, quote.nomineeName || 'N/A'],
    [`Agent Email`, quote.agentEmail || 'N/A'],
    [`Downloaded On`, new Date().toLocaleDateString()],
  ];

  content.forEach(([label, value], idx) => {
    doc.text(`${label}: ${value}`, 14, 30 + idx * 8);
  });

  doc.save(`${quote.policyName.replace(/\s+/g, '_')}_Policy.pdf`);
};

  return (
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
      <h2 className="mb-4 text-2xl font-semibold leading-tight text-center">📄 My Applied Policies</h2>
      <div className="overflow-x-auto">
        <table className="w-full p-6 text-xs text-left whitespace-nowrap">
          <colgroup>
            <col className="w-5" />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col className="w-5" />
          </colgroup>
          <thead>
            <tr className="dark:bg-gray-300">
              <th className="p-3">A-Z</th>
              <th className="p-3">Policy Name</th>
              <th className="p-3">Status</th>
              <th className="p-3">Coverage</th>
              <th className="p-3">Premium</th>
              <th className="p-3">Duration</th>
              <th className="p-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          {Object.keys(groupedQuotes)
            .sort()
            .map((letter) => (
              <tbody key={letter} className="border-b dark:bg-gray-50 dark:border-gray-300">
                {groupedQuotes[letter].map((quote, index) => (
                  <tr key={quote._id}>
                    <td className="px-3 text-2xl font-medium dark:text-gray-600">
                      {index === 0 ? letter : ''}
                    </td>
                    <td className="px-3 py-2">
                      <p>{quote.policyName}</p>
                    </td>
                    <td className="px-3 py-2 capitalize">{quote.status}</td>
                    <td className="px-3 py-2">{quote.coverage}</td>
                    <td className="px-3 py-2">
                      <p>Monthly: {quote.monthlyPremium}</p>
                      <p className="dark:text-gray-600">Annual: {quote.annualPremium}</p>
                    </td>
                    <td className="px-3 py-2">{quote.duration}</td>
                    <td className="px-3 py-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            Swal.fire({
                              title: quote.policyName,
                              html: `
                                <p class="p-2"><b>Coverage:</b> ${quote.coverage}</p>
                                <p class="p-2"><b>Duration:</b> ${quote.duration}</p>
                                <p class="p-2"><b>Monthly Premium:</b> ${quote.monthlyPremium}</p>
                                <p class="p-2"><b>Annual Premium:</b> ${quote.annualPremium}</p>
                                <p class="p-2"><b>Nominee:</b> ${quote.nomineeName}</p>
                                <p><b>Agent Contact:</b> ${quote.agentEmail}</p>
                              `,
                              icon: 'info',
                            });
                          }}
                          className="text-blue-600 hover:underline text-xs"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => {
                            setSelectedQuote(quote);
                            setReviewModalOpen(true);
                          }}
                          className="text-violet-600 hover:underline text-xs"
                        >
                          Review
                        </button>
                        {quote.status === 'approved' && (
  <button
    onClick={() => handleDownloadPolicyPDF(quote)}
    className="text-green-600 hover:underline text-xs"
  >
    Download Policy
  </button>
)}

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            ))}
        </table>
        {myQuotes.length === 0 && (
          <p className="text-center py-6 text-gray-500">You haven’t applied to any policies yet.</p>
        )}
      </div>

      {/* ⭐ Review Modal */}
      <Dialog open={reviewModalOpen} onClose={() => setReviewModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md bg-white p-6 rounded shadow space-y-4">
            <DialogTitle className="text-lg font-semibold">Submit Your Review</DialogTitle>

           <div>
  <label className="block text-sm font-medium mb-1">Rating</label>
  <div className="flex items-center space-x-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => setReview({ ...review, rating: star })}
        className="focus:outline-none"
      >
        <span
          className={`text-2xl transition-colors ${
            star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          <IoStarSharp />
        </span>
      </button>
    ))}
  </div>
</div>


            <div>
              <label className="block text-sm font-medium mb-1">Feedback</label>
              <textarea
                rows={4}
                value={review.feedback}
                onChange={(e) => setReview({ ...review, feedback: e.target.value })}
                className="w-full border p-2 rounded"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setReviewModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleReviewSubmit}
                className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
              >
                Submit Review
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default MyPolicies;
