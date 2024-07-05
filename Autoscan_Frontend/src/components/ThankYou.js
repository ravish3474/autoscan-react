import React from "react";
import "../style/thankYou.css";
import { Link } from "react-router-dom";
import bannerRightCarImage from "../images/main/banner-right-car.png";
const ThankYouPage = () => {
  return (
    <div className="thank-you-page">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-12 col-lg-12 col-xl-12">
            <div className="thank-you-content">
              <figure>
                <img src={bannerRightCarImage} alt="" />
              </figure>
              <h1>Thank You!</h1>
              <p>Your Listing has been uploaded successfully.</p>
              <p>It will be live shortly.</p>
              <Link to="/" className="btn btn-primary btn-lg btn-block">
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
