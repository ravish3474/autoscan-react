import React, { useEffect, useState } from "react";
import "../style/BuyCar.css";
import { Link } from "react-router-dom";
import "../js/main.js";

function ExploreCar() {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/car/car-list`
        );
        const data = await response.json();
        setCars(data.car);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    const fetchBrandData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/brand/brand-list`
        );
        const data = await response.json();
        setBrands(data.allBrands);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrandData();
    fetchData();
  }, []);

  return (
    <section className="usedCarMainContainer">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-4  leftSide">
            <div className="sidebar">
              <form className="FilterForm">
                <div className="filterSubCategory priceBar">
                  <h5 className="card-title">Price Range</h5>
                  <div className="price-range-slider">
                    <p className="range-value">
                      <input type="text" id="amount" readOnly />
                    </p>
                    <div id="slider-range" className="range-bar"></div>
                  </div>
                </div>
                <div className="filterSubCategory search-box d-paddinng">
                  <h5 className="card-title">Brand and Models</h5>
                  <input
                    className="search"
                    type="search"
                    placeholder="Search..."
                  />

                  <div className=" bodyType">
                    <ul className="p-0 m-0">
                      {brands.map((brand) => (
                        <li key={brand.brand_id}>
                          <input
                            type="checkbox"
                            name={brand.brand_name}
                            id={brand.brand_name}
                          />
                          <label htmlFor={brand.brand_name}>
                            {brand.brand_name}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="filterSubCategory KMsDriven">
                  <h5 className="card-title">KMs Driven</h5>
                  <ul className="p-0 m-0">
                    <li>
                      <label for="radio-1">
                        <input
                          type="radio"
                          name="radios"
                          id="radio-1"
                          checked
                        />
                        <span>Maruti Suzuku</span>
                      </label>
                    </li>
                    <li>
                      <label for="radio-2">
                        <input
                          type="radio"
                          name="radios"
                          id="radio-2"
                          checked
                        />
                        <span>Hyundai</span>
                      </label>
                    </li>
                    <li>
                      <label for="radio-3">
                        <input
                          type="radio"
                          name="radios"
                          id="radio-3"
                          checked
                        />
                        <span>Mahindra</span>
                      </label>
                    </li>
                    <li>
                      <label for="radio-4">
                        <input
                          type="radio"
                          name="radios"
                          id="radio-4"
                          checked
                        />
                        <span>Nissan </span>
                      </label>
                    </li>
                  </ul>
                </div>
                <div className="filterSubCategory bodyType">
                  <h5 className="card-title">Body Type</h5>
                  <ul className="p-0 m-0">
                    <li>
                      <input type="checkbox" name="Hatchback" id="Hatchback" />
                      <label for="Hatchback">Hatchback</label>
                    </li>
                    <li>
                      <input type="checkbox" name="Sedan" id="Sedan" />
                      <label for="Sedan">Sedanr</label>
                    </li>
                    <li>
                      <input type="checkbox" name="SUV" id="SUV" />
                      <label for="SUV">SUV</label>
                    </li>
                    <li>
                      <input type="checkbox" name="MUV" id="MUV" />
                      <label for="MUV">MUV</label>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-9 col-md-8 RightSide default-cars-advertise">
            <div className="ActivePageHeader">
              <div className="d-flex align-items-center">
                <Link to="/" className="active">
                  Home
                </Link>
                <span>
                  <ion-icon name="chevron-forward-outline"></ion-icon>
                </span>
                <a href={"/ExploreCar"}>Used Car</a>
              </div>
              <div className="EmptyBox ">
                <div className="box"></div>
                <div className="onclickFilterShow">
                  <span>Search Manually</span>
                </div>
              </div>
            </div>
            <div className="row filterItems">
              {cars.map((car) => (
                <Link to={`/car-details/${car.id}`} key={car.id}>
                  {" "}
                  {/* Update anchor tag to Link */}
                  <div className="singleCarItems">
                    <div className="card">
                      <div className="card-body p-0">
                        <figure className="m-0">
                          <img
                            src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${car.front_view}`}
                            alt=""
                            className="arrow-img W100"
                          />
                          <p className="card-text badge">AUTOSCAN ASSURED </p>
                        </figure>
                        <div className="card-content">
                          <h5 className="card-title">
                            {car.Brand ? car.Brand.brand_name : ""}{" "}
                            {car.model ? car.model.model_name : ""}
                          </h5>
                          <p className="sPara">
                            <span className="carAverage">
                              {car.kms_driven} Kms
                            </span>{" "}
                            |{" "}
                            <span className="carType">
                              {car.varient ? car.varient.varient_name : ""}
                            </span>
                            |<span className="carType2">Manual</span>
                          </p>
                          <h6 className="btn p-0 carPrice">₹{car.price}</h6>
                          <hr />
                          <p className="pre desc">
                            Get it financed at 40,000 per month
                          </p>

                          <div className="ribbon-2">
                            GET UP TO <b>30%</b> OFF
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExploreCar;
