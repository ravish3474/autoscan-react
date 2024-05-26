// CarDetails.js
import React, { useState } from 'react';
import '../style/ExploreCarDetails.css'; // Import BuyCar.css
import RecentSearch from '../components/RecentSearch';
import { Link } from 'react-router-dom';
import SwiperSlider from '../components/CarsDetailsSlider';
import PopularBrands from "../components/PopularBrands";

function ListedCarsDetails() {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleText = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>

            <section className="ActivePageHeader">
                <div className="container">
                    <div className="row">

                        <div className="d-flex align-items-center">
                            <Link to="/" className="active">Home</Link>
                            <span><ion-icon name="chevron-forward-outline"></ion-icon></span>
                            <Link to="/ExploreCar" className="active"> Explore Cars</Link>
                            <span><ion-icon name="chevron-forward-outline"></ion-icon></span>
                            <Link to="/listedCardDetails"> MG Aster Savvy</Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="singleCarMain">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 leftSide carAllDetails">
                            <div className="card border-none bg-none">
                                <SwiperSlider />
                            </div>
                        </div>
                        <div className="col-md-4 rightSide carhighlightsDetails">
                            <div className="card bg-none  border-none UpperTopCard">
                                <div>
                                    <h5 className="card-title">
                                        2022 MG Motors Astor Savvy CVT
                                    </h5>
                                    <ul className="p-0">
                                        <li>Year<span class="year"> : 2015</span></li>
                                        <li>Location<span class="Location"> : Delhi</span></li>
                                        <li>KM Driven <span class="KMDriven"> : 7000</span></li>
                                    </ul>
                                    <div id="desc">
                                        <div className="article">
                                            <p className="s-para">Bacon ipsum dolor amet sirloin jowl turducken pork loin pig
                                                pork
                                                belly, chuck
                                                cupim tongue beef doner tri-tip pancetta spare ribs porchetta.
                                            </p>
                                            <p className="moretext s-para" style={{ display: isExpanded ? 'block' : 'none' }}>
                                                Brisket ball tip cow sirloin. Chuck porchetta kielbasa pork chop doner
                                                sirloin,
                                                bacon beef brisket ball tip short ribs.
                                            </p>
                                        </div>
                                        <div>
                                            <span className="moreless-button" onClick={toggleText}>
                                                {isExpanded ? 'Read less' : 'Read more'}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="priceFrom"><span>₹1,37,40,307</span> - <span>₹1,45,90,223</span></p>

                                </div>
                                <div>


                                </div>
                            </div>
                            <div className="card TotalListedBids">
                                <div className="">
                                    <h6 className="fetchTotalBids TotalBidTitle">You have 45 bids for this car</h6>
                                    <div className="listedBidsItems">
                                        <div className="ListedItems">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <td>Mr Manoj Bajpaaye</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Number</th>
                                                        <td>9898989494</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Bid in INR</th>
                                                        <td>345345</td>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                        <div className="ListedItems">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <td>Mr Manoj Bajpaaye</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Number</th>
                                                        <td>9898989494</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Bid in INR</th>
                                                        <td>345345</td>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                        <div className="ListedItems">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <td>Mr Manoj Bajpaaye</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Number</th>
                                                        <td>9898989494</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Bid in INR</th>
                                                        <td>345345</td>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="DetailTable">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card border-none">
                                <table className="combined">
                                    <tbody>
                                        <tr className="FirstRow" style={{ borderRadius: '20px 20px 0' }}>
                                            <td>
                                                <strong>Make year</strong><br />
                                                <span style={{ fontSize: 'smaller' }}>2014</span>
                                            </td>
                                            <td>
                                                <strong>Brand Name</strong><br />
                                                <span style={{ fontSize: 'smaller' }}>MG</span>
                                            </td>
                                            <td>
                                                <strong>Model</strong><br />
                                                <span style={{ fontSize: 'smaller' }}>MG</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Insurancer</strong><br />
                                                <span style={{ fontSize: 'smaller' }}>2014</span>
                                            </td>
                                            <td>
                                                <strong>Number of Owner</strong><br />
                                                <span style={{ fontSize: 'smaller' }}>2014</span>
                                            </td>
                                            <td>
                                                <strong>Kms</strong><br />
                                                <span style={{ fontSize: 'smaller' }}>2014</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Varient</strong><br />
                                                <span style={{ fontSize: 'smaller' }}>Pertrol/Deisel</span>
                                            </td>
                                            <td>
                                                <strong> </strong><br />
                                                <span style={{ fontSize: 'smaller' }}> </span>
                                            </td>
                                            <td>
                                                <strong> </strong><br />
                                                <span style={{ fontSize: 'smaller' }}> </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="specificationDiv">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card border-none">
                                <h2 className="l-title">Specifications</h2>
                                <div className="accordion">
                                    <div className="heading">Engine and Transmission</div>
                                    <div className="contents">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>

                                    <div className="heading">Dimensions & Weight</div>
                                    <div className="contents">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>

                                    <div className="heading">Capacity</div>
                                    <div className="contents">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                                    <div className="heading">Suspensions, Brakes, Steering & Tyres</div>
                                    <div className="contents">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                                </div>
                            </div>
                            <div className="CertificateReports">
                                <div className="card border-none bg-none">
                                    <h4 className="card-title">
                                        Certification Report
                                    </h4>
                                    <p>
                                        This car has been thoroughly inspected on 167 points and certified for quality. Just
                                        5%
                                        of cars get Autoscan Certified.
                                    </p>
                                    <a href="#" data-bs-toggle="modal" data-bs-target="#ReportDoneBYAutoScan">VIEW REPORT
                                        &nbsp;
                                        <ion-icon name="arrow-forward-outline"></ion-icon></a>
                                    <p className="card-text badge">
                                        <img src="images/vector/certificate-icon.png" alt="" /> WARRENTY ELIGIBLE
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <RecentSearch />
            <PopularBrands />
        </div>
    );
}

export default ListedCarsDetails;
