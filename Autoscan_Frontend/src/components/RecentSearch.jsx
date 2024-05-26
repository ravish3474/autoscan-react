import React from 'react';
import SingleRecentCard from './SingleRecentCard'; // Import the HighlightCard component

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
                        img="http://localhost/AutoScan/images/cars/recent1.png"
                        title="Maruti FRONX"
                        description="₹6.37 - ₹7.54 Lakh"
                    />
                    <SingleRecentCard
                        img="http://localhost/AutoScan/images/cars/recent2.png"
                        title="Mahindra Scorpio"
                        description="₹6.37 - ₹7.54 Lakh"
                    />
                    <SingleRecentCard
                        img="http://localhost/AutoScan/images/cars/recent3.png" // Provide the URL of your image here
                        title="BYD Sea"
                        description="₹6.37 - ₹7.54 Lakh"
                    />
                </div>
            </div>
        </section>
    )
}

export default RecentSearch;