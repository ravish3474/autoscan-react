
import React from 'react'

function PurchasedCarsComponent({ PurchasedCarsImg, PurchasedCarName, PurchasedCarPriceFrom, PurchasedCarPriceTo, PurchasedCarBid, PurchasedCarDemandPrice, PurchasedOn }) {
    return (
        <div>
            <div class="items row ">
                <figure>
                    <img src={PurchasedCarsImg} alt="" />
                </figure>
                <div class="grid2">
                    <div>
                        <h6 class="CarName">{PurchasedCarName}</h6>
                        <h6 class="CarPrice"><span>{PurchasedCarPriceFrom}</span> - <span>{PurchasedCarPriceTo}</span>
                        </h6>
                    </div>
                    <div>
                        <h6 class="CarBid">{PurchasedCarBid}</h6>
                        <h6 class="CarDemandPrice">{PurchasedCarDemandPrice}</h6>
                    </div>
                </div>
            </div>
            <div class="fetchTotalBids">
                <h6 class="TotalBidTitle">{PurchasedOn}</h6>
            </div>
        </div>
    )
}

export default PurchasedCarsComponent;