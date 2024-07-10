import React from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

SwiperCore.use([Navigation, Pagination]);

function MySwiper() {
  const swiperStyles = {
    '--swiper-navigation-color': '#fff',
    '--swiper-pagination-color': '#fff'
  };

  return (
    <Swiper style={swiperStyles} className="swiper mySwiper2">
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
    </Swiper>
  );
}

export default MySwiper;
