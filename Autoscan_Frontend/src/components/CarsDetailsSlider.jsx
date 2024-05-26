import React, {  useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
// import './styles.css';
function CarsDetailsSlider() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                <SwiperSlide>
                    <img src="https://www.grcorollaforum.com/attachments/19785/" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://autoimage.capitalone.com/cms/Auto/assets/images/2721-hero-2023-toyota-gr86.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://static1.hotcarsimages.com/wordpress/wp-content/uploads/2023/01/2023-toyota-gr-86-special-edition-side-view.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://cdn-fastly.thetruthaboutcars.com/media/2022/11/29/11263/toyotas-output-makes-like-a-yo-yo-in-october.jpg?size=720x845&nocrop=1" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://images.topgear.com.ph/topgear/images/2022/06/02/86-5-1654155957.jpg" />
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
                    <img src="https://www.grcorollaforum.com/attachments/19785/" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://autoimage.capitalone.com/cms/Auto/assets/images/2721-hero-2023-toyota-gr86.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://static1.hotcarsimages.com/wordpress/wp-content/uploads/2023/01/2023-toyota-gr-86-special-edition-side-view.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://cdn-fastly.thetruthaboutcars.com/media/2022/11/29/11263/toyotas-output-makes-like-a-yo-yo-in-october.jpg?size=720x845&nocrop=1" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://images.topgear.com.ph/topgear/images/2022/06/02/86-5-1654155957.jpg" />
                </SwiperSlide>

            </Swiper>
        </>
    )
}
export default CarsDetailsSlider;