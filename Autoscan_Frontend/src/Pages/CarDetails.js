import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import "../style/ExploreCarDetails.css";
import RecentSearch from "../components/RecentSearch";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
function CarDetails() {
  const [car, setCar] = useState({});
  let { carId } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/car/fetch-Car/${carId}`
        );
        const data = await response.json();
        setCar(data.car);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <section className="ActivePageHeader">
        <div className="container">
          <div className="row">
            <div className="d-flex align-items-center">
              <a href={"/"} className="active">
                Home
              </a>
              <span>
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </span>
              <a href="buyCar.php" className="active">
                {" "}
                Used Cars
              </a>
              <span>
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </span>
              <a href="sellCarDetails.php"> MG Aster Savvy</a>
            </div>
          </div>
        </div>
      </section>
      <section className="singleCarMain">
        <div class="container">
          <div className="row">
            <div className="col-md-8 leftSide carAllDetails">
              <div className="card border-none bg-none">
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                  }}
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2"
                >
                  <SwiperSlide>
                    <img
                      src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${car.front_view}`}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${car.front_right}`}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${car.left_view}`}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${car.rear_view}`}
                    />
                  </SwiperSlide>
                </Swiper>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <img
                      src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${car.front_view}`}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${car.front_right}`}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${car.left_view}`}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${car.rear_view}`}
                    />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
            <div className="col-md-4 rightSide carhighlightsDetails">
              <div className="card bg-none  border-none">
                <div>
                  {car && (
                    <h5 className="card-title">
                      {car.manufacturing_year} {car.brand_id} {car.model_id}{" "}
                      {car.varient_id}
                    </h5>
                  )}
                  <ul className="p-0">
                    <li>
                      Year
                      <span className="year"> : {car.manufacturing_year}</span>
                    </li>
                    <li>
                      Location
                      <span className="Location"> : {car.car_location}</span>
                    </li>
                    <li>
                      KM Driven
                      <span className="KMDriven"> : {car.kms_driven}</span>
                    </li>
                  </ul>
                  <div id="desc">
                    <div className="article">
                      <p className="s-para">{car.car_description}</p>
                      <p className="moretext s-para">
                        Brisket ball tip cow sirloin. Chuck porchetta kielbasa
                        pork chop doner sirloin, bacon beef brisket ball tip
                        short ribs.
                      </p>
                    </div>
                    <a className="moreless-button" href="#">
                      Read more
                    </a>
                  </div>
                  <p className="priceFrom">
                    <span>₹{car.ex_showroom}</span> - <span>₹{car.price}</span>
                  </p>
                </div>
                <div>
                  <div className="ribbon-2">
                    Wohoo!! Congratulations <b>30%</b> OFF
                  </div>
                  <div className="grid">
                    <a
                      href=""
                      data-bs-toggle="modal"
                      data-bs-target="#makeOfferModal"
                      class="MakeOfferModal"
                    >
                      Make Offer
                    </a>
                    <a href="" className="btn">
                      Get Dealer Details
                    </a>
                  </div>
                  <div className="applyForLoanDiv">
                    <div>
                      <figure>
                        <img
                          src="images/main/LoanBAnner.png"
                          alt=""
                          class="W100"
                        />
                      </figure>
                    </div>
                    <div>
                      <div className="content">
                        <h2>Check your eligibility & apply online</h2>

                        <p className="s-para">
                          {" "}
                          Get instant approval. Become a Car owner today!
                        </p>
                      </div>
                      <a target="_blank" href="https://web.whatsapp.com/">
                        <div className="button">Apply For a Loan</div>
                      </a>
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
                    <tr
                      className="FirstRow"
                      style={{ borderRadius: "20px 20px 0" }}
                    >
                      <td>
                        <strong>Make year</strong>
                        <br />
                        <span style={{ fontSize: "smaller" }}>
                          {car.manufacturing_year}
                        </span>
                      </td>
                      <td>
                        <strong>Brand Name</strong>
                        <br />
                        <span style={{ fontSize: "smaller" }}>
                          {car.brand_id}
                        </span>
                      </td>
                      <td>
                        <strong>Model</strong>
                        <br />
                        <span style={{ fontSize: "smaller" }}>
                          {car.model_id}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Insurancer</strong>
                        <br />
                        <span style={{ fontSize: "smaller" }}>
                          {car.insurance_validity}
                        </span>
                      </td>
                      <td>
                        <strong>Number of Owner</strong>
                        <br />
                        <span style={{ fontSize: "smaller" }}>
                          {car.ownership}
                        </span>
                      </td>
                      <td>
                        <strong>Kms</strong>
                        <br />
                        <span style={{ fontSize: "smaller" }}>
                          {car.kms_driven}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Varient</strong>
                        <br />
                        <span style={{ fontSize: "smaller" }}>
                          {car.varient_id}
                        </span>
                      </td>
                      <td>
                        <strong> </strong>
                        <br />
                        <span style={{ fontSize: "smaller" }}> </span>
                      </td>
                      <td>
                        <strong> </strong>
                        <br />
                        <span style={{ fontSize: "smaller" }}> </span>
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
                  <div className="contents">
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </div>

                  <div className="heading">Dimensions & Weight</div>
                  <div className="contents">
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </div>

                  <div className="heading">Capacity</div>
                  <div className="contents">
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </div>
                  <div className="heading">
                    Suspensions, Brakes, Steering & Tyres
                  </div>
                  <div className="contents">
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </div>
                </div>
              </div>
              <div className="CertificateReports">
                <div className="card border-none bg-none">
                  <h4 className="card-title">Certification Report</h4>
                  <p>
                    This car has been thoroughly inspected on 167 points and
                    certified for quality. Just 5% of cars get Autoscan
                    Certified.
                  </p>
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#ReportDoneBYAutoScan"
                  >
                    VIEW REPORT &nbsp;
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                  </a>
                  <p className="card-text badge">
                    <img src="images/vector/certificate-icon.png" alt="" />{" "}
                    WARRENTY ELIGIBLE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <RecentSearch />
    </div>
  );
}

export default CarDetails;
