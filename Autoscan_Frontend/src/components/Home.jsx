// Home.js
import React from 'react';
import Banner from './Banner';
import HighLights from './HighLights';
import RecentSearch from './RecentSearch';
import PopularBrands from './PopularBrands';
import Testimonial from './Testimonial';
import TrendingSearches from './TrendingSearches';

function Home() {
    return (

        <div>

            <Banner />
            <HighLights />
            <RecentSearch />
            <TrendingSearches />
            <PopularBrands />
            <Testimonial />

        </div>

    );
}

export default Home;