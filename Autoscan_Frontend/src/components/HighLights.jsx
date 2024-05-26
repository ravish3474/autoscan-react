// HighLights.js

import React from 'react';
import HighlightCard from './HighlightCard'; // Import the HighlightCard component
import '../style/Highlights.css'; // Import Highlights.css

function HighLights() {
    return (
        <section className="highlightsServes">
            <div className="container">
                <div className="row">
                    <HighlightCard
                        title="50000+ Cars Inspected"
                        description="We will conduct a thorough inspection to ensure the genuine value of your car."
                    />
                    <HighlightCard
                        title="Pan India Services"
                        description="We offer nationwide car inspection services across India, ensuring
                        convenience and accessibility for all."
                    />
                    <HighlightCard
                        title="500+ Inspectors"
                        description="With a team of over 500 inspectors, we provide professional car
                        inspections nationwide, ensuring thorough assessments and peace of mind for every customer."
                    />
                    <HighlightCard
                        title="Precise Value Accuracy"
                        description="Rest assured of precise value accuracy with our inspections, delivering
                        confidence and transparency in every assessment."
                    />
                </div>
            </div>
        </section>
    );
}

export default HighLights;
