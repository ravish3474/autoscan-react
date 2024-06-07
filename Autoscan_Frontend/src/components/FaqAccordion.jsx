import React, { useState } from "react";
// import faqImg from '../images/main/faq'
function FaqAccordion() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="specificationDiv faq">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="card border-none">
                            <h2 className="l-title">Faq's</h2>
                            <div className="accordion">
                                <div className="heading" onClick={() => toggleAccordion(0)}>
                                    What is Used car valuation?
                                </div>
                                <div className={`contents ${activeIndex === 0 ? 'active' : ''}`}>
                                    Used car valuation is the process of finding used car price at present
                                    time at a given place. With OBV user can easily check used car price just by selecting make,
                                    model, year, trim and KMs driven. The Used car valuation depends on various factors such as
                                    current condition, year of purchase etc. Valuation of Used car cannot have a correct price
                                    tag; it will always be a fair range of price.
                                </div>

                                <div className="heading" onClick={() => toggleAccordion(1)}>
                                    What is Used car valuation?
                                </div>
                                <div className={`contents ${activeIndex === 1 ? 'active' : ''}`}>
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </div>

                                <div className="heading" onClick={() => toggleAccordion(2)}>
                                    How Used car price impacts the insurance of my car?
                                </div>
                                <div className={`contents ${activeIndex === 2 ? 'active' : ''}`}>
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </div>

                                <div className="heading" onClick={() => toggleAccordion(3)}>
                                    Is buying Used car is a good idea? Are second-hand cars worth it?
                                </div>
                                <div className={`contents ${activeIndex === 3 ? 'active' : ''}`}>
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 desktop-view">
                        <div class="card bg-none border-none">
                            {/* <figure><img src={faqImg} alt="" class="W100" /></figure> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FaqAccordion;
