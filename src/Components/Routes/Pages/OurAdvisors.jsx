import React from 'react';
import putin from '../../../assets/Putin.webp'
import trump from '../../../assets/Trump.webp'
import jinping from '../../../assets/jinping.webp'

const OurAdvisors = () => {
  const advisors = [
    {
      id: 1,
      name: "Vladimir Putin",
      role: "Risk & Security Advisor",
      image: putin,
    },
    {
      id: 2,
      name: "Donald Trump",
      role: "Financial Growth Advisor",
      image: trump,
    },
    {
      id: 3,
      name: "Xi Jinping",
      role: "Global Strategy Advisor",
      image: jinping,
    },
  ];

  return (
    <div className="py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10 text-violet-700">
        Our Advisors
      </h2>

      {/* Responsive grid */}
      <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 container mx-auto px-6">
        {advisors.map((advisor) => (
          <div
            key={advisor.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Image */}
            <img
              src={advisor.image}
              alt={advisor.name}
              className="w-full h-56 object-cover"
            />

            {/* Details */}
            <div className="p-5 text-center">
              <h3 className="text-xl font-semibold text-gray-800">
                {advisor.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{advisor.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurAdvisors;