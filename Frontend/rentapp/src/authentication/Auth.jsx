import { Outlet, useOutletContext, Navigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Auth = () => {
  // Access the context from parent (typically contains user authentication data)
  const context = useOutletContext() || {};
  const { currentUser } = context;

  // If user is already authenticated, redirect to homepage
  return currentUser ? (
    <Navigate to="/homepage" />
  ) : (
    <>
      {/* Fullscreen background slideshow using Swiper */}
      <Swiper
        effect="fade" // Smooth fade transition between slides
        speed={1200} // Transition speed in milliseconds
        autoplay={{ delay: 5000, disableOnInteraction: false }} // Auto slide every 5s
        allowTouchMove={false} // Disable swipe interaction
        modules={[Autoplay, EffectFade]} // Load required Swiper modules
        className="absolute inset-0 w-full h-full z-0"
      >
        {/* Slide through background images */}
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
              src={`/${img}`} // Images should be in the public folder
              alt={`Background ${idx}`}
              className="w-full h-full object-cover filter brightness-75"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Foreground container holding the login/register form */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pb-40">
        <div className="w-full max-w-md p-6 bg-white/20 backdrop-blur-lg rounded-lg shadow-lg">
          <Outlet /> {/* Renders either Login or Register page depending on the route */}
        </div>
      </div>
    </>
  );
};

export default Auth;
