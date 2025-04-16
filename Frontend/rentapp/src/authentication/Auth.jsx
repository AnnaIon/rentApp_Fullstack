import { Outlet, useOutletContext, Navigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Auth = () => {
  const context = useOutletContext() || {};
  const { currentUser } = context;

  return currentUser ? (
    <Navigate to="/homepage" />
  ) : (
    <>
          <Swiper
        effect="fade"
        speed={1200}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        allowTouchMove={false}
        modules={[Autoplay, EffectFade]}
        className="absolute inset-0 w-full h-full z-0"
      >
        {[
          "flat1.jpg",
          "flat2.jpg",
          "flat3.jpg",
          "flat4.jpg",
          "flat5.jpg",
          "flat6.jpg",
        ].map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={`/${img}`}
              alt={`Background ${idx}`}
              className="w-full h-full object-cover filter brightness-75"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-0 z-10 flex items-center justify-center pb-40">
        <div className="w-full max-w-md p-6 bg-white/20 backdrop-blur-lg rounded-lg shadow-lg">
          <Outlet />
        </div>
      </div>

    </>
    
  );
};

export default Auth;
