import React from 'react';
import img1 from '../../assets/bcblogo2.png'
import img5 from '../../assets/freshN.png'
import img2 from '../../assets/rfl2.png'
import img3 from '../../assets/usBangfla.png'
import img4 from '../../assets/primeBabnk.png'
import Marquee from "react-fast-marquee";
const OurPartners = () => {
      return (
    <div className="py-10 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-6 text-violet-700">
        Our Collaborators
      </h2>

      <Marquee pauseOnHover={true} speed={50} gradient={false}>
        <div className="flex items-center gap-12">
          <img src={img1} alt="Partner 1" className="h-16 object-contain" />
          <img src={img2} alt="Partner 2" className="h-16 object-contain" />
          <img src={img3} alt="Partner 3" className="h-16 object-contain" />
          <img src={img4} alt="Partner 4" className="h-16 object-contain" />
          <img src={img5} alt="Partner 5" className="h-16 object-contain" />
        </div>
      </Marquee>
    </div>
  );
};

export default OurPartners;