import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/PopularBrands.css"; 

// Initialize Swiper core components
 

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
            breakpoints={{
              // When window width is <= 320
              320: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              // When window width is <= 768px
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              // When window width is <= 1024px
              1024: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            className="mySwiper"
          >
            {brands.map((brand, index) => (
              <SwiperSlide key={index}>
                <div className="item">
                  <img
                    src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${brand.brand_img}`}
                    alt={brand.brand_name}
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
