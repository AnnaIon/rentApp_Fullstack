import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

const Swiper = () => {
  return (
    <div className="relative h-screen w-full">
      <Swiper
        effect="fade"
        loop={true}
        autoplay={{ delay: 4000 }}
        modules={[EffectFade, Autoplay]}
        className="absolute top-0 left-0 w-full h-full z-0"
      >
        <SwiperSlide>
          <img
            src="/images/bg1.jpg"
            alt="Slide 1"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/images/bg2.jpg"
            alt="Slide 2"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/images/bg3.jpg"
            alt="Slide 3"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      </Swiper>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        <h1 className="text-4xl font-bold drop-shadow-lg">Welcome to RentApp</h1>
        <p className="text-lg mt-4 max-w-lg drop-shadow">
          Explore premium flats in your area. Search. Save. Rent with ease.
        </p>
      </div>
    </div>
  );
};

export default Swiper;
