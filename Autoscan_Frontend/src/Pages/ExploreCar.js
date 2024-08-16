import React, { useEffect, useState } from "react";
import "../style/BuyCar.css";
import { Link } from "react-router-dom";
import "../js/main.js";
import defaultCarImage from "../images/cars/carValuation.png";
import axios from "axios";
function ExploreCar() {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [noCarsFound, setNoCarsFound] = useState(false);
  const [filterData, setFilterData] = useState({
    min_price: "",
    max_price: "",
    kms_driven: "",
  });
  const handleSelect = (e, name) => {
    if (e.target.checked) {
      setFilterData({
        ...filterData,
        [name]: [...(filterData[name] || []), e.target.value],
      });
    }
    else if (name === 'min_price' || name === 'max_price' || name === 'kms_driven') {
      setFilterData({
        ...filterData,
        [name]: e.target.value
      });
    }
    else {
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

  // const resetFilters = () => {
  //   const emptyFilterData = {};
  //   setFilterData(emptyFilterData);
  //   fetchData(emptyFilterData);
  //   Array.from(document.querySelectorAll('input[type="checkbox"]')).forEach(
  //     (checkbox) => {
  //       checkbox.checked = false;
  //     }
  //   );
  // };


  const resetFilters = () => {
    const emptyFilterData = {
      min_price: "",
      max_price: "",
      kms_driven: "",
    };
    setFilterData(emptyFilterData);
    fetchData(emptyFilterData);

    // Reset checkbox inputs
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    // Reset input values for min_price, max_price, and kms_driven
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach((input) => {
      input.value = "";
    });
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
  
  if (filterDataObj.min_price) {
    queryParams.append('min_price', filterDataObj.min_price);
  }
  if (filterDataObj.max_price) {
    queryParams.append('max_price', filterDataObj.max_price);
  }
  if (filterDataObj.kms_driven) {
    queryParams.append('kms_driven', filterDataObj.kms_driven);
  }

  Object.keys(filterDataObj).forEach((key) => {
    if (key !== 'min_price' && key !== 'max_price' && key !== 'kms_driven') {
      queryParams.append(key, filterDataObj[key].join(","));
    }
  });
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/car/car-list?${queryParams}`
      );
      const { car } = response?.data;
      // console.log(data.car);
      setCars(car);
      setCars(car);
      if (car.length === 0) {
        setNoCarsFound(true);
      } else {
        setNoCarsFound(false);
      }
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
                  <div className="row pr-5">
                    <div className="col-md-6 form-group">
                      <input
                        type="number"
                        name="min_price"
                        min="0"
                        className="form-control"
                        placeholder="Min Price"
                       
                        onChange={(e) => handleSelect(e, "min_price")}
                      />
                    </div>
                    <div className="col-md-6 form-group">
                      <input
                        type="number"
                        name="max_price"
                         min="0"
                        className="form-control"
                        placeholder="Max Price"
                        onChange={(e) => handleSelect(e, "max_price")}
                      />
                    </div>
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
                  <div className="form-group">
                    <input
                   type="number"
                      name="kms_driven"
                      className="form-control"
                      placeholder="KM Driven"
                      
                      onChange={(e) => handleSelect(e, "kms_driven")}
                    />
                  </div>
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
              {noCarsFound ? (
                <div className="col-12 text-center">
                  <h3>No cars found matching the filters.</h3>
                </div>
              ) : (
                cars.map((car) => (
                  <Link to={`/car-details/${car.id}`} key={car.id}>
                    <div className="singleCarItems">
                      <div className="card">
                        <div className="card-body p-0">
                          <figure className="m-0">
                            <img
                              src={
                                car.front_view
                                  ? `https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${car.front_view}`
                                  : defaultCarImage
                              }
                              alt=""
                              className="arrow-img W100"
                            />
                            <p className="card-text badge">
                              usedcarwale ASSURED{" "}
                            </p>
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
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExploreCar;
