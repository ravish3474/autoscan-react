import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

function TrendingSingleCard({ img, title, description }) {
    return (
        <div className="col-md-4">
            <Link to="/car-details" className="link-color">
                <div className="card">
                    <div className="card-body p-0">
                        <figure className="m-0"><img src={img} alt="" className="arrow-img W100" />
                        </figure>
                        <div className="card-content">
                            <h5 className="card-title">{title}</h5>
                            <a href="sellCarDetails" className="btn p-0 ">{description}</a>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
export default TrendingSingleCard;