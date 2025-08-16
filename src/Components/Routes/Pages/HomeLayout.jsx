// import { Banner } from 'flowbite-react';
import React from 'react';
import Banner from '../../HomeComponents/Banner';
import PopularPolicies from '../../HomeComponents/PopularPolicies';
import ReviewCarousel from '../../HomeComponents/ReviewCarousel';
import LatestBlogs from '../../HomeComponents/LatestBlogs';
import Newsletter from '../../HomeComponents/Newsletter';
import MeetOurAgents from '../../HomeComponents/MeetOurAgents';
import OurPartners from '../../HomeComponents/OurPartners';

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

        {/* nwesletter subscription section */}

        <Newsletter />

        <MeetOurAgents />


        <OurPartners />
        </div>
    );
};

export default HomeLayout;


