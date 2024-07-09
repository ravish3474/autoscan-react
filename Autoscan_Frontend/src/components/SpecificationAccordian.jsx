import React, { useState } from "react";

function SpecificationAccordion() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="specificationDiv">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="card border-none">
                            <h2 className="l-title">Specifications</h2>
                            <div className="accordion">
                                <div className="heading" onClick={() => toggleAccordion(0)}>
                                    Engine and Transmission
                                </div>
                                <div className={`contents ${activeIndex === 0 ? 'active' : ''}`}>
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </div>

                                <div className="heading" onClick={() => toggleAccordion(1)}>
                                    Dimensions & Weight
                                </div>
                                <div className={`contents ${activeIndex === 1 ? 'active' : ''}`}>
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </div>

                                <div className="heading" onClick={() => toggleAccordion(2)}>
                                    Capacity
                                </div>
                                <div className={`contents ${activeIndex === 2 ? 'active' : ''}`}>
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </div>

                                <div className="heading" onClick={() => toggleAccordion(3)}>
                                    Suspensions, Brakes, Steering & Tyres
                                </div>
                                <div className={`contents ${activeIndex === 3 ? 'active' : ''}`}>
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SpecificationAccordion;
