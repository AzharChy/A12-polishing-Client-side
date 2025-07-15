import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import useAxiosSecure from '../../customHooks/AxiosSecure';

const ReviewCarousel = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await axiosSecure.get('/myPolicies/reviews');
      return res.data;
    }
  });

  if (isLoading) return <p className="text-center py-10">Loading reviews...</p>;

  return (
    <div className="my-10 max-w-5xl mx-auto px-4">
      <h2 className="text-3xl font-semibold text-center mb-6">🌟 What Our Customers Say</h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500 }}
        loop
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="bg-white border shadow-sm rounded p-6 h-full flex flex-col justify-between">
              <div className="flex items-center mb-4">
                <img
                  src={review.reviwerImage}
                  alt="Reviewer"
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <p className="font-bold">{review.reviewerName}</p>
                  <p className="text-sm text-gray-500">{review.policyName}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{review.feedback}"</p>
              <div className="mt-4">
                {Array.from({ length: review.rating }).map((_, idx) => (
                  <span key={idx} className="text-yellow-400 text-xl">★</span>
                ))}
                {Array.from({ length: 5 - review.rating }).map((_, idx) => (
                  <span key={idx} className="text-gray-300 text-xl">★</span>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewCarousel;
