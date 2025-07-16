import React from 'react';

const faqs = [
  {
    question: "Who can apply for an insurance policy on this platform?",
    answer: "Anyone with a registered account can apply for available insurance policies. Users must be logged in to submit an application."
  },
  {
    question: "How do I submit a claim for an approved policy?",
    answer: "After your policy is approved, go to the Claim Request page and fill out the form with a reason and supporting document. Your claim status will be marked as pending until reviewed by an agent."
  },
  {
    question: "What payment methods are supported?",
    answer: "We support secure payments through Stripe. You can pay your premiums monthly or annually based on the selected policy."
  },
  {
    question: "Can I become an agent on this platform?",
    answer: "Yes! You can apply to become an agent by submitting the agent request form from your dashboard. Once approved by an admin, your status will be upgraded."
  },
  {
    question: "How can I leave a review on a policy?",
    answer: "After a policy is approved, go to 'My Policies' and click the 'Review' button next to the policy. You can submit a rating and feedback to help others."
  },
];

const Faq = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 p-4 rounded shadow-sm bg-white">
            <h3 className="text-lg font-semibold text-violet-700">{faq.question}</h3>
            <p className="mt-2 text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
