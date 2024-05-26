import React from 'react';
function BiddingComponents({ biddingCarImage, CarName, CarPriceFrom, CarPriceTo, CarBid, CarDemandPrice, children }) {
    return (
        <div>
            <div className="items row">
                <figure>
                    <img src={biddingCarImage} alt="" />
                </figure>
                <div className="grid2">
                    <div>
                        <h6 className="CarName">{CarName}</h6>
                        <h6 className="CarPrice"><span>{CarPriceFrom}</span> - <span> {CarPriceTo}</span>
                        </h6>
                    </div>
                    <div>
                        <h6 className="CarBid">{CarBid}</h6>
                        <h6 className="CarDemandPrice">{CarDemandPrice}</h6>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default BiddingComponents;
