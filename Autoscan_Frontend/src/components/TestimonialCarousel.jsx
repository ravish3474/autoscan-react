import React from 'react';

function TestimonialCarousel({ img, description, title }) {
    return (

        <div className="item">
            <figure className="m-0"><img src={img} alt="" /></figure>
            <div className="reviews">
                <p className="clientReviews">{description}</p>
                <h4 className="clientName">{title}</h4>
            </div>
        </div>

    )
}
export default TestimonialCarousel;