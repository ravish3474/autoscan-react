import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Profile.css'; // Import BuyCar.css  
import BiddingComponents from '../components/InnerComponents/BiddingComponents'
import BidReviewStatus from '../components/InnerComponents/BidReviewStatus'
import BidRejectedStatus from '../components/InnerComponents/BidRejectedStatus'
import BidSuccessfulStatus from '../components/InnerComponents/BidSuccessfulStatus'
import ListedCars from '../components/InnerComponents/ListedCars';
import PurchasedCarsComponent from '../components/InnerComponents/PurchasedCarsComponent';
import ProfileSetting from '../components/InnerComponents/ProfileSetting';

// import UserProfileHeader from '../components/InnerComponents/UserProfileHeader';
// import BidReviewStatus from '../components/InnerComponents/BidReviewStatus'

function Profile() {

    return (
        <div >

            <section className="ProfileTopBanner m-0">
            </section>
            <section className="UserProfileData">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card bg-none border-none ">
                                <figure className="m-0">
                                    <img src={"https://th.bing.com/th/id/OIP.f4yU98L6tCRS86CuxTQ2SQAAAA?rs=1&pid=ImgDetMain"}
                                        alt="" />
                                </figure>
                                <div>
                                    <h1>AVIRAL BAHUGUNA</h1>
                                    <Link to="/"><p><ion-icon name="call-outline"></ion-icon> +91 989 699 8989</p> </Link>
                                    <Link to="/"><p><ion-icon name="mail-unread-outline"></ion-icon> Aviralbahuguna@gmail.com </p></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="MainProfileContainer">

                <div className="container ">
                    <div className="row">
                        <div className="col-md-4 ProfileLeftSide">
                            <div className="card  border-none">

                                <div className="UserAllData">

                                    <ul className="nav nav-tabs tabs-left sideways">
                                        <li className="active"><a href="#Bidding" data-toggle="tab">Bidding <ion-icon
                                            name="chevron-forward-outline"></ion-icon></a> </li>
                                        <li><a href="#ListedCars" data-toggle="tab">Listed Cars <ion-icon
                                            name="chevron-forward-outline"></ion-icon></a></li>
                                        <li><a href="#PurchasedCars" data-toggle="tab">Purchased Cars <ion-icon
                                            name="chevron-forward-outline"></ion-icon></a></li>
                                        <li><a href="#ProfileSetting" data-toggle="tab">Profile Setting <ion-icon
                                            name="chevron-forward-outline"></ion-icon></a></li>
                                    </ul>
                                    <button> <ion-icon name="log-out-outline"></ion-icon> LOGOUT</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 ProfileRightSide">
                            <div className="card bg-none border-none">
                                <div className="tab-content">
                                    <div className="tab-pane active" id="Bidding">
                                        <div class="row">
                                            <div className="head">
                                                <h5>Total Bids <span>(03)</span> : Discover Real-time Insights and Trends in Car Auctions.</h5>
                                            </div>
                                            <div className="defaultListedItems">
                                                <BiddingComponents
                                                    biddingCarImage={require('../images/cars/trending1.png')}
                                                    CarName="Hyundai Creta"
                                                    CarPriceFrom="₹6.37"
                                                    CarPriceTo="₹7.54 Lakh"
                                                    CarBid="Your Bid/Offer"
                                                    CarDemandPrice="₹6lakh"
                                                >
                                                    <BidReviewStatus statusTitle="Bid in Review" />
                                                </BiddingComponents>
                                                <BiddingComponents
                                                    biddingCarImage={require('../images/cars/trending1.png')}
                                                    CarName="Hyundai Creta"
                                                    CarPriceFrom="₹6.37"
                                                    CarPriceTo="₹7.54 Lakh"
                                                    CarBid="Your Bid/Offer"
                                                    CarDemandPrice="₹6lakh"
                                                >
                                                    <BidRejectedStatus statusTitle="Bid Rejected" />
                                                </BiddingComponents>
                                                <BiddingComponents
                                                    biddingCarImage={require('../images/cars/trending1.png')}
                                                    CarName="Hyundai Creta"
                                                    CarPriceFrom="₹6.37"
                                                    CarPriceTo="₹7.54 Lakh"
                                                    CarBid="Your Bid/Offer"
                                                    CarDemandPrice="₹6lakh"
                                                >
                                                    <BidSuccessfulStatus statusTitle="Bid Successful" />
                                                </BiddingComponents>
                                                <BiddingComponents
                                                    biddingCarImage={require('../images/cars/trending1.png')}
                                                    CarName="Hyundai Creta"
                                                    CarPriceFrom="₹6.37"
                                                    CarPriceTo="₹7.54 Lakh"
                                                    CarBid="Your Bid/Offer"
                                                    CarDemandPrice="₹6lakh"
                                                >
                                                    <BidSuccessfulStatus statusTitle="Bid Successful" />
                                                </BiddingComponents>
                                            </div>


                                        </div>

                                    </div>
                                    <div class="tab-pane" id="ListedCars">
                                        <div class="row">
                                            <div className="head">
                                                <h5>Total Listed Cars <span>(07)</span> : Explore the Thriving Marketplace of Auctioned Vehicles
                                                    in Car Auctions.</h5>
                                            </div>
                                            <div className="listingDetails defaultListedItems">
                                                <ListedCars
                                                    ListedCarsImg={require('../images/cars/trending1.png')}
                                                    ListedCarName="Hyundai Creta"
                                                    ListedCarPriceFrom="₹6.37"
                                                    ListedCarPriceTo="₹7.54 Lakh"
                                                    ListedCarOn="You have  5 bids for this car"
                                                />
                                                <ListedCars
                                                    ListedCarsImg={require('../images/cars/trending1.png')}
                                                    ListedCarName="Hyundai Creta"
                                                    ListedCarPriceFrom="₹6.37"
                                                    ListedCarPriceTo="₹7.54 Lakh"
                                                    ListedCarOn="You have 12 bids for this car"
                                                />
                                                <ListedCars
                                                    ListedCarsImg={require('../images/cars/trending1.png')}
                                                    ListedCarName="Hyundai Creta"
                                                    ListedCarPriceFrom="₹6.37"
                                                    ListedCarPriceTo="₹7.54 Lakh"
                                                    ListedCarOn="You have 15 bids for this car"
                                                />
                                                <ListedCars
                                                    ListedCarsImg={require('../images/cars/trending1.png')}
                                                    ListedCarName="Hyundai Creta"
                                                    ListedCarPriceFrom="₹6.37"
                                                    ListedCarPriceTo="₹7.54 Lakh"
                                                    ListedCarOn="You have 45 bids for this car"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane" id="PurchasedCars">
                                        <div className="head">
                                            <h5>Total Purchased Cars <span>(02)</span> :Total Cars Acquired in Auctions Revealed!
                                                in
                                                Car Auctions.</h5>
                                        </div>
                                        <div className="PurchasedDetails defaultListedItems">

                                            <PurchasedCarsComponent
                                                PurchasedCarsImg={require('../images/cars/trending2.png')}
                                                PurchasedCarName="Hyundai Creta"
                                                PurchasedCarPriceFrom="₹6.37"
                                                PurchasedCarPriceTo="₹7.54 Lakh"
                                                PurchasedCarBid="Your Bid/Offer"
                                                PurchasedCarDemandPric e="₹6lakh"
                                                PurchasedOn="Approved on 9-May-2024"
                                            />
                                            <PurchasedCarsComponent
                                                PurchasedCarsImg={require('../images/cars/trending2.png')}
                                                PurchasedCarName="Hyundai Creta"
                                                PurchasedCarPriceFrom="₹6.37"
                                                PurchasedCarPriceTo="₹7.54 Lakh"
                                                PurchasedCarBid="Your Bid/Offer"
                                                PurchasedCarDemandPric e="₹6lakh"
                                                PurchasedOn="Approved on 23-May-2024"
                                            />

                                        </div>
                                    </div>
                                    <div class="tab-pane" id="ProfileSetting">
                                        <div className="row ProfileSettingForm">
                                            <ProfileSetting />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )

}
export default Profile;