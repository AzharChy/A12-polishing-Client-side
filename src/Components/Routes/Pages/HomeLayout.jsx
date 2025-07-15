// import { Banner } from 'flowbite-react';
import React from 'react';
import Banner from '../../HomeComponents/Banner';
import PopularPolicies from '../../HomeComponents/PopularPolicies';

const HomeLayout = () => {
    return (
        <div>
           {/* <Banner /> */}

        <Banner />
        {/* popular policies */}

        <PopularPolicies />
        </div>
    );
};

export default HomeLayout;