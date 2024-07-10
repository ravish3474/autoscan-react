<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import "../style/BuyCar.css";
import { Link } from "react-router-dom";
import "../js/main.js";
import axios from "axios";
function ExploreCar() {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filterData, setFilterData] = useState({});
  const handleSelect = (e, name) => {
    if (e.target.checked) {
      setFilterData({
        ...filterData,
        [name]: [...(filterData[name] || []), e.target.value],
      });
    } else {
      setFilterData({
        ...filterData,
        [name]: (filterData[name] || []).filter(
          (value) => value !== e.target.value
        ),
      });
    }
  };
  const handleFilterSubmit = async () => {
    fetchData(filterData);
    window.scrollTo({ top: 550, behavior: "smooth" });
  };

  const resetFilters = () => {
    const emptyFilterData = {};
    setFilterData(emptyFilterData);
    fetchData(emptyFilterData);
    Array.from(document.querySelectorAll('input[type="checkbox"]')).forEach(
      (checkbox) => {
        checkbox.checked = false;
      }
    );
  };

  useEffect(() => {
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
    fetchData(filterData);
  }, []);
  const fetchData = async (filterDataObj) => {
    // let queryParams = new URLSearchParams(filterDataObj).toString();
    // if (queryParams) {
    //   queryParams = `&${queryParams.toString()}`;
    // }

    let queryParams = new URLSearchParams();
    Object.keys(filterDataObj).forEach((key) => {
      queryParams.append(key, filterDataObj[key].join(","));
    });

    if (queryParams) {
      queryParams = `&${queryParams.toString()}`;
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/car/car-list?${queryParams}`
      );
      const { car } = response?.data;
      // console.log(data.car);
      setCars(car);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };
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
                      <input
                        type="text"
                        name="price_range"
                        id="amount"
                        value=""
                      />
                    </p>
                    <div id="slider-range" className="range-bar"></div>
                  </div>
                </div>
                <div className="filterSubCategory search-box d-paddinng">
                  <h5 className="card-title">Brand and Models</h5>
                  {/* <input
                    className="search"
                    type="search"
                    placeholder="Search..."
                  /> */}

                  <div className=" bodyType">
                    <ul className="p-0 m-0">
                      {brands.map((brand) => (
                        <li key={brand.brand_id}>
                          <input
                            type="checkbox"
                            name={brand.brand_name}
                            id={brand.brand_name}
                            value={brand.id}
                            onChange={(e) => handleSelect(e, "brand")}
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
                <div className="d-flex justify-content-center gap-2 mt-3">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleFilterSubmit}
                  >
                    Search
                  </button>
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={resetFilters}
                  >
                    Reset
                  </button>
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
                          <p className="card-text badge">usedcarwale ASSURED </p>
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
=======
import React, { useEffect, useState } from "react";
import "../style/BuyCar.css";
import { Link } from "react-router-dom";
import "../js/main.js";
import axios from "axios";
function ExploreCar() {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filterData, setFilterData] = useState({});
  const handleSelect = (e, name) => {
    if (e.target.checked) {
      setFilterData({
        ...filterData,
        [name]: [...(filterData[name] || []), e.target.value],
      });
    } else {
      setFilterData({
        ...filterData,
        [name]: (filterData[name] || []).filter(
          (value) => value !== e.target.value
        ),
      });
    }
  };
  const handleFilterSubmit = async () => {
    fetchData(filterData);
    window.scrollTo({ top: 550, behavior: "smooth" });
  };

  const resetFilters = () => {
    const emptyFilterData = {};
    setFilterData(emptyFilterData);
    fetchData(emptyFilterData);
    Array.from(document.querySelectorAll('input[type="checkbox"]')).forEach(
      (checkbox) => {
        checkbox.checked = false;
      }
    );
  };

  useEffect(() => {
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
    fetchData(filterData);
  }, []);
  const fetchData = async (filterDataObj) => {
    // let queryParams = new URLSearchParams(filterDataObj).toString();
    // if (queryParams) {
    //   queryParams = `&${queryParams.toString()}`;
    // }

    let queryParams = new URLSearchParams();
    Object.keys(filterDataObj).forEach((key) => {
      queryParams.append(key, filterDataObj[key].join(","));
    });

    if (queryParams) {
      queryParams = `&${queryParams.toString()}`;
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/car/car-list?${queryParams}`
      );
      const { car } = response?.data;
      // console.log(data.car);
      setCars(car);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };
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
                      <input
                        type="text"
                        name="price_range"
                        id="amount"
                        value=""
                      />
                    </p>
                    <div id="slider-range" className="range-bar"></div>
                  </div>
                </div>
                <div className="filterSubCategory search-box d-paddinng">
                  <h5 className="card-title">Brand and Models</h5>
                  {/* <input
                    className="search"
                    type="search"
                    placeholder="Search..."
                  /> */}

                  <div className=" bodyType">
                    <ul className="p-0 m-0">
                      {brands.map((brand) => (
                        <li key={brand.brand_id}>
                          <input
                            type="checkbox"
                            name={brand.brand_name}
                            id={brand.brand_name}
                            value={brand.id}
                            onChange={(e) => handleSelect(e, "brand")}
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
                <div className="d-flex justify-content-center gap-2 mt-3">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleFilterSubmit}
                  >
                    Search
                  </button>
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={resetFilters}
                  >
                    Reset
                  </button>
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
                          <p className="card-text badge">usedcarwale ASSURED </p>
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
>>>>>>> 58d9d4567d085e43404dfcc6763df284c8ffea58
