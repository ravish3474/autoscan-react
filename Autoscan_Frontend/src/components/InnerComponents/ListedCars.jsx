import React from 'react'
import { Link } from 'react-router-dom'
function ListedCars({ ListedCarsImg, ListedCarName, ListedCarPriceFrom, ListedCarPriceTo, ListedCarOn }) {
    return (
        <div >
            <Link to="/listedCardDetails" className="ListedSingleItems">
                <div className="items row">
                    <figure>
                        <img src={ListedCarsImg} alt="" />
                    </figure>
                    <div>
                        <h6 className="CarName">{ListedCarName}</h6>
                        <h6 className="CarPrice"><span>{ListedCarPriceFrom}</span> - <span> {ListedCarPriceTo}</span>
                        </h6>
                    </div>
                </div>
                <div className="fetchTotalBids">
                    <h6 className="TotalBidTitle">{ListedCarOn}</h6>
                </div>
            </Link>
        </div>
    )
}

export default ListedCars