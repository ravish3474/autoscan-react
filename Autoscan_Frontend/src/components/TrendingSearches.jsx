import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import defaultCarImage from "../images/cars/carValuation.png";
function TrendingSearches() {
  const [cars, setCars] = useState([]);
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
    fetchData();
  }, []);
  return (
    <section className="trendingSearches default-cars-advertise">
      <div className="container">
        <div className="row">
          <div className="head">
            <h2>TRENDING SEARCHES NEW YOU</h2>
            <a href={"/ExploreCar"} className="btn p-0 ">
              VIEW ALL
            </a>
          </div>
          {cars.slice(1, 4).map((car) => (
            <div className="col-md-4">
              <Link
                to={`/car-details/${car.id}`}
                key={car.id}
                className="link-color"
              >
                <div className="card">
                  <div className="card-body p-0">
                    <figure className="m-0">
                      <img
                         src={
                          car.model.car_img
                            ? `https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${car.model.car_img}`
                            : defaultCarImage
                        }
                        alt=""
                        className="arrow-img W100"
                      />
                    </figure>
                    <div className="card-content">
                      <h5 className="card-title">
                        {" "}
                        {car.Brand ? car.Brand.brand_name : ""}{" "}
                        {car.model ? car.model.model_name : ""}
                      </h5>
                      <a href="sellCarDetails" className="btn p-0 ">
                        {car.price}
                      </a>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrendingSearches;
