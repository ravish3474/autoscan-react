import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

function MyCarousel({ img, title, description }) {
    return (
        <div className="item text-center">
            <figure><img src={maruti} alt="" /></figure>
            <h4>maruti</h4>
        </div>
    );
}
export default MyCarousel;
