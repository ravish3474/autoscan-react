import React from 'react';
import OwlCarousel from 'react-owl-carousel2';
import Client1 from '../images/testimonial/testimonial1.jpg';
import 'react-owl-carousel2/src/owl.carousel.css';
import 'react-owl-carousel2/src/owl.theme.default.css';
import '../style/PopularBrands.css'; // Import your component-specific CSS file

function Testimonial() {
    const options = {
        items: 2,
        loop: true,
        autoplay: true,
        margin: 10,
        nav: true,
        dots: false
    };

    return (

        <section className="testimoial-sect">
            <div className="container">
                <div className="row">
                    <div className="testimonial-slider owl-carousel owl-theme owl-loaded owl-drag">

                        <OwlCarousel options={options}>
                            <div className="item">
                                <figure className="m-0"><img src={Client1} alt="" /></figure>
                                <div className="reviews">
                                    <p className="clientReviews">Delighted with AS! The finance and sales teams provided
                                        fantastic support. I
                                        received the car within a day, and I'm extremely happy.</p>
                                    <h4 className="clientName">Himanshu Pagare</h4>
                                </div>
                            </div>
                            <div className="item">
                                <figure className="m-0"><img src={Client1} alt="" /></figure>
                                <div className="reviews">
                                    <p className="clientReviews">Delighted with AS! The finance and sales teams provided
                                        fantastic support. I
                                        received the car within a day, and I'm extremely happy.</p>
                                    <h4 className="clientName">Rachana Singh</h4>
                                </div>
                            </div></OwlCarousel>
                    </div>
                </div>
            </div>
        </section >
    );
}

export default Testimonial;
