import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/PopularBrands.css";

function PopularBrands() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/brand/brand-list`
        );
        setBrands(response.data.allBrands);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <section className="popular-brands">
      <div className="container">
        <div className="row">
          <div className="head">
            <h2>Popular Brands</h2>
            <a href="/" className="btn p-0 ">
              VIEW ALL BRANDS
            </a>
          </div>
          <Swiper
            spaceBetween={10}
            slidesPerView={5}
            freeMode={true}
            watchSlidesProgress={true}
            className="mySwiper"
          >
            {brands.map((brand) => (
              <SwiperSlide>
                {" "}
                <div className="item">
                  <img
                    src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${brand.brand_img}`}
                    alt="{brand.brand_name}"
                    className="W100"
                  />
                  <h5>{brand.brand_name}</h5>
                </div>
              </SwiperSlide>
            ))}
            {brands.map((brand) => (
              <SwiperSlide>
                {" "}
                <div className="item">
                  <img
                    src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${brand.brand_img}`}
                    alt="{brand.brand_name}"
                    className="W100"
                  />
                  <h5>{brand.brand_name}</h5>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default PopularBrands;
