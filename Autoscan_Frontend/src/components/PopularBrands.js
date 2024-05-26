import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel2";
import "react-owl-carousel2/src/owl.carousel.css";
import "react-owl-carousel2/src/owl.theme.default.css";
import axios from "axios";
import "../style/PopularBrands.css"; // Import your component-specific CSS file

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

  const options = {
    items: 5,
    loop: true,
    autoplay: true,
    margin: 10,
    nav: true,
    dots: false,
  };

  return (
    <section className="popular-brands">
      <div className="container">
        <div className="row">
          <div className="head">
            <h2>Popular Brands</h2>
            <a href={brands} className="btn p-0 ">
              VIEW ALL BRANDS
            </a>
          </div>
          <OwlCarousel options={options}>
            {brands.map((brand) => (
              <div className="item text-center" key={brand.id}>
                <figure>
                  <img
                    src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${brand.brand_img}`}
                    alt={brand.brand_name}
                  />
                </figure>
                <h4>{brand.brand_name}</h4>
              </div>
            ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
}

export default PopularBrands;
