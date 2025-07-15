// import { Banner } from 'flowbite-react';
import React from 'react';
import Banner from '../../HomeComponents/Banner';
import PopularPolicies from '../../HomeComponents/PopularPolicies';
import ReviewCarousel from '../../HomeComponents/ReviewCarousel';
import LatestBlogs from '../../HomeComponents/LatestBlogs';

const HomeLayout = () => {
    return (
        <div>
           {/* <Banner /> */}

        <Banner />
        {/* popular policies */}

        <PopularPolicies />

        {/* review carousel */}
        <ReviewCarousel />

        {/* blogs */}

        <LatestBlogs />
        </div>
    );
};

export default HomeLayout;