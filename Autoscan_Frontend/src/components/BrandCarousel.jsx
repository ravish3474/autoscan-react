import React from 'react';

function BrandCarousel({ img, title }) {
    return (
        <div className="item text-center">
            <figure><img src={img} alt="" /></figure>
            <h4>{title}</h4>
        </div>
    );
}
export default BrandCarousel;