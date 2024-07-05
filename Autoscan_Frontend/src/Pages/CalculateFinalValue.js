import React, { useState, useEffect } from "react";
import "../style/FinalCarValusation.css";
import MainCarValuation from "../images/cars/carValuation.png";
import carValuationRight from "../images/cars/carValuationRight.png";
import Vector1 from "../images/vector/Vector6.svg";
import Vector2 from "../images/vector/Vector5.svg";
import Vector3 from "../images/vector/Vector4.svg";
import Vector4 from "../images/vector/Vector7.svg";
import { Link } from "react-router-dom";

function CalculateFinalValue() {
  const [selectedCategory, setSelectedCategory] = useState("Good");
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    const storedPayload = localStorage.getItem("payload");
    if (storedPayload) {
      setPayload(JSON.parse(storedPayload));
    }
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <div className="container-fluid ActivePageHeader">
        <div className="d-flex align-items-center">
          <a href="/" className="active">
            Home
          </a>
          <span>
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </span>
          <a href="finalValue">Car Valuation</a>
        </div>
      </div>
      <section className="main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-2 col-md-3 filter-form-div">
              <div className="card border-none">
                <h6>Evaluate Again</h6>
                <div className="form-wrapper">
                  {["Category", "Make", "Model", "Year"].map((label, index) => (
                    <div className="form-sub-division" key={index}>
                      <label>{`Select ${label}`}</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option selected>
                          {label === "Category" ? "Car" : "Select"}
                        </option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  ))}
                  <div className="form-sub-division">
                    <label>Enter KMS Driven</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>8999</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <label htmlFor="site-search">Search a Car</label>
                  <input
                    type="search"
                    id="site-search"
                    placeholder="Search a Car"
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-md-5 booking-details-div">
              <div className="card main-card">
                <figure className="text-center">
                  <img src={MainCarValuation} alt="Main Car Valuation" />
                </figure>
                <div className="row details">
                  <div className="left-side">
                    <div className="box">
                      <h6 className="car-type-name">
                        Bentley Continental GT Convertible
                      </h6>
                      <div className="price-vary-from d-inline-flex align-items-center">
                        <p className="price-from m-2">₹1,37,40,307</p>
                        <span className="d-inline-flex align-items-center">
                          <ion-icon name="remove-outline"></ion-icon>
                        </span>
                        <p className="price-to m-2">₹1,45,90,223</p>
                      </div>
                      <div className="booking-category mt-2">
                        {["Bad", "Fair", "Good", "Very Good", "Excellent"].map(
                          (category, index) => (
                            <span
                              key={index}
                              className={
                                selectedCategory === category ? "active" : ""
                              }
                              onClick={() => handleCategoryClick(category)}
                            >
                              {category}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="right-side">
                    {payload && (
                      <div className="card border-none">
                        <p>Year: {payload.manufacturing_year}</p>
                        <p>Location: {payload.rto_city}</p>
                        <p>KM Driven: {payload.kms_driven}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 booking-side">
              <div className="card bg-none border-none pt-2">
                <h3>Want An Accurate Valuation of your Vehicle?</h3>
                <div className="row car-highlights">
                  <div className="col-md-2 left-side car-info Default">
                    {[
                      { text: "Convenient Scheduling", img: Vector1 },
                      { text: "Expert Evaluation Team", img: Vector2 },
                    ].map((item, index) => (
                      <div key={index}>
                        <p>{item.text}</p>
                        <figure>
                          <img src={item.img} alt={item.text} />
                        </figure>
                      </div>
                    ))}
                  </div>
                  <div className="col-md-12 middle-side d-inline-flex align-items-center">
                    <figure className="text-center yellow-car-img">
                      <img src={carValuationRight} alt="Car Valuation Right" />
                    </figure>
                    <button>
                      <Link to="requestCallBack">BOOK AN INSPECTION</Link>
                    </button>
                  </div>
                  <div className="col-md-2 right-side car-info2 Default">
                    {[
                      { text: "Comprehensive Inspection", img: Vector3 },
                      { text: "Detailed Report", img: Vector4 },
                    ].map((item, index) => (
                      <div key={index}>
                        <p>{item.text}</p>
                        <figure>
                          <img src={item.img} alt={item.text} />
                        </figure>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CalculateFinalValue;
