import React from 'react';
import SingleRecentCard from './SingleRecentCard'; // Import the HighlightCard component
import trending2 from  "../images/cars/trending2.png"
function RecentSearch() {
    return (
        <section className="recent-searches default-cars-advertise">
            <div className="container">
                <div className="row">
                    <div className="head">
                        <h2>RECENT SEARCHES</h2>
                        <a href="buyCar.php" className="btn p-0 ">VIEW ALL</a>

                    </div>
                    <SingleRecentCard
                     img={trending2}
                        title="Maruti FRONX"
                        description="₹6.37 - ₹7.54 Lakh"
                    />
                    <SingleRecentCard
                        img={trending2}
                        title="Mahindra Scorpio"
                        description="₹6.37 - ₹7.54 Lakh"
                    />
                    <SingleRecentCard
                         img={trending2}
                        title="BYD Sea"
                        description="₹6.37 - ₹7.54 Lakh"
                    />
                </div>
            </div>
        </section>
    )
}

export default RecentSearch;