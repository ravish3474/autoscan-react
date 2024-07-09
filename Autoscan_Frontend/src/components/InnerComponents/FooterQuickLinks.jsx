import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
// import Frame from '../images/vector/Frame.png'; // Import image for left side

function FooterQuickLinks() {
    return (
        <div className="quickLinks">
            <ul className="p-0">
                <Link to="/"> About Us</Link> <br />
                <Link to="/"> Register as a dealers</Link>  <br />
                <Link to="/">Privacy policy and agreement</Link>  <br />
            </ul>
            {/* <figure><img src={Frame} alt="" /></figure> */}
        </div>
    )
}
export default FooterQuickLinks