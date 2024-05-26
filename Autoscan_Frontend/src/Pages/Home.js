// Home.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Banner from './Banner';
import HighLights from './HighLights';
import RecentSearch from './RecentSearch';
import PopularBrands from '../components/PopularBrands';
import Testimonial from './Testimonial';
import TrendingSearches from './TrendingSearches';
import ExploreCar from '../components/ExploreCar'; // Import ExploreCar page
import SellCar from '../Pages/SellCar'; // Import SellCar component
import CarDetails from '../Pages/CarDetails'; // Import CarDetails component

function Home() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/ExploreCar" component={ExploreCar} />
                    <Route path="/sell-car" component={SellCar} />
                    <Route path="/car-details" component={CarDetails} />
                </Switch>
                <Banner />
                <HighLights />
                <RecentSearch />
                <TrendingSearches />
                <PopularBrands />
                <Testimonial />
            </div>
        </Router>
    );
}

export default Home;
