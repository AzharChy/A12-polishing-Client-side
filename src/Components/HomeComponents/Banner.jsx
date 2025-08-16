import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import slider1 from '../../assets/life-insurance.webp';
import slider2 from '../../assets/international-travel-insurance.webp';
import slider3 from '../../assets/five-reasons-why-you-should-buy-a-travel-insurance-online2.webp';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  const slides = [
    {
      img: slider1,
      heading: "Secure Your Tomorrow Today",
      subheading: "Explore reliable insurance solutions for you and your family",
    },
    {
      img: slider2,
      heading: "Travel With Peace of Mind",
      subheading: "Insure your journeys with our global travel policies",
    },
    {
      img: slider3,
      heading: "Turn Miles into Memories",
      subheading: "Comprehensive life insurance for your loved ones",
    },
  ];

  return (
    <div className="w-full h-1/4 relative mt-5">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-7/12"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-[500px] bg-cover bg-center flex items-center justify-start px-10"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              <div className="bg-black bg-opacity-50 p-6 rounded text-white max-w-xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{slide.heading}</h2>
                <p className="mb-4">{slide.subheading}</p>
                <button
                  onClick={() => navigate('/get-quote/6872ad10dc545bde75f119e8')}
                  className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded"
                >
                  Get a Free Quote
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
