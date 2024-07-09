import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import bannerLeftImage from "../images/main/banner-left-side.png";
import bannerRightCarImage from "../images/main/banner-right-car.png";
import RightArrow from "../images/vector/RightArrow.png";
import "../style/Banner.css";

function Banner() {
  return (
    <section className="banner-section">
      <div className="container">
        <div className="row">
          <div className="col-md-6 left-bio-side">
            <Link to="/inspection-car">
              <div className="card">
                <figure className="m-0">
                  <img src={bannerLeftImage} alt="" className="W100" />
                </figure>
                <div className="bio-content">
                  <h2 className="l-title">
                    GET THE BEST PRICE OF YOUR CAR WITH USED CAR WALE
                  </h2>
                  <h2 className="l-title theme-color">UsedCarwale</h2>
                  <div className="button">Schedule a Car Inspection Now!</div>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-6 RightServicesSide">
            <div className="row RightTop">
              <div className="col-md-12 span-item1">
                <Link to="/sell-car">
                  {" "}
                  {/* Update anchor tag to Link */}
                  <div className="card">
                    <div className="card-body">
                      <figure>
                        <img
                          src={RightArrow}
                          alt=""
                          className="arrow-img arrow-img1"
                        />
                      </figure>
                      <h5 className="card-title">
                        Know the value make the deal with used car wale
                      </h5>
                      <p className="card-text badge">Sell car</p>
                      <h6 className="btn">SELL CAR NOW</h6>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-12 span-item2">
                <Link to="/ExploreCar">
                  {" "}
                  {/* Update anchor tag to Link */}
                  <div className="card">
                    <div className="card-body">
                      <figure>
                        <img
                          src={RightArrow}
                          alt=""
                          className="arrow-img arrow-img2"
                        />
                      </figure>
                      <h5 className="card-title">Your Dream Car starts here</h5>
                      <p className="card-text badge">Buy</p>
                      <h6 className="btn">EXPLORE CAR</h6>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-12 span-item3">
                <Link to="/car-valuation">
                  {" "}
                  {/* Update anchor tag to Link */}
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        Online Car value in seconds
                      </h5>
                      <figure>
                        <img src={bannerRightCarImage} alt="" />
                      </figure>
                      <h6 className="btn">CHECK ONLINE VALUE</h6>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
