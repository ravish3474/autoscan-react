import React from 'react';
import TrendingSingleCard from './TrendingSingleCard'; // Import the HighlightCard component
import trending2 from  "../images/cars/trending2.png"
function TrendingSearches() {
    return (
        <section className="trendingSearches default-cars-advertise">
            <div className="container">
                <div className="row">
                    <div className="head">
                        <h2>TRENDING SEARCHES NEW YOU</h2>
                        <a href="buyCar.php" className="btn p-0 ">VIEW ALL</a>
                    </div>
                    <TrendingSingleCard
                        img={trending2}
                        title="Hyundai Creta"
                        description="₹6.37 - ₹7.54 Lakh"
                    />
                    <TrendingSingleCard
                         img={trending2}
                        title="Mahindra Scorpio"
                        description="₹6.37 - ₹7.54 Lakh"
                    />
                    <TrendingSingleCard
                        img={trending2}
                        title="BYD Seal"
                        description="₹6.37 - ₹7.54 Lakh"
                    />
                </div>
            </div>
        </section>
    );
}

export default TrendingSearches;
