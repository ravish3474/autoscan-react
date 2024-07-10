<<<<<<< HEAD
import React from "react";
import "../style/thankYou.css";
import { Link } from "react-router-dom";
import bannerRightCarImage from "../images/main/banner-right-car.png";
const InspectionThankYou = () => {
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
              <p>Your Inspection has been Scheduled successfully.</p>
              <p>Our representative will contact you shortly!</p>
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

export default InspectionThankYou;
=======
import React from "react";
import "../style/thankYou.css";
import { Link } from "react-router-dom";
import bannerRightCarImage from "../images/main/banner-right-car.png";
const InspectionThankYou = () => {
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
              <p>Your Inspection has been Scheduled successfully.</p>
              <p>Our representative will contact you shortly!</p>
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

export default InspectionThankYou;
>>>>>>> 58d9d4567d085e43404dfcc6763df284c8ffea58
