import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import testimonial1 from '../images/testimonial/testimonial1.jpg';
import { FreeMode, Pagination } from 'swiper/modules';

function Testimonial() {
    return (
        <section className="testimoial-sect">
            <div className="container">
                <div className="row">
                    <div className="testimonial-slider  ">
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={2}
                            freeMode={true}
                            watchSlidesProgress={true}
                            breakpoints={{
                                // When window width is <= 320
                                320: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                // When window width is <= 768px
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 40,
                                },
                                // When window width is <= 1024px
                                1024: {
                                    slidesPerView: 2,
                                    spaceBetween: 50,
                                },
                            }}
                            modules={[FreeMode, Pagination]}
                            className="TestMySwiper" >
                            <SwiperSlide> <div className="item">
                                <img src={testimonial1} alt="" className="W100" />
                                <div class="reviews">
                                    <p class="clientReviews">Delighted with AS! The finance and sales teams provided
                                        fantastic support. I
                                        received the car within a day, and I'm extremely happy.</p>
                                    <h4 class="clientName">Himanshu Pagare</h4>
                                </div>
                            </div>
                            </SwiperSlide>
                            <SwiperSlide> <div className="item">
                                <img src={testimonial1} alt="" className="W100" />
                                <div class="reviews">
                                    <p class="clientReviews">Delighted with AS! The finance and sales teams provided
                                        fantastic support. I
                                        received the car within a day, and I'm extremely happy.</p>
                                    <h4 class="clientName">Himanshu Pagare</h4>
                                </div>
                            </div>
                            </SwiperSlide>
                            <SwiperSlide> <div className="item">
                                <img src={testimonial1} alt="" className="W100" />
                                <div class="reviews">
                                    <p class="clientReviews">Delighted with AS! The finance and sales teams provided
                                        fantastic support. I
                                        received the car within a day, and I'm extremely happy.</p>
                                    <h4 class="clientName">Himanshu Pagare</h4>
                                </div>
                            </div>
                            </SwiperSlide>

                        </Swiper>
                    </div>
                </div>
            </div >
        </section >


    )
}

export default Testimonial