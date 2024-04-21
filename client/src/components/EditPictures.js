import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const EditPictures = ({ props }) => {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      className="mySwiper"
      slidesPerView={2}
      spaceBetween={30}
      centeredSlides={true}
    >
      {props.map((image) => (
        <SwiperSlide>
          <img
            src={image}
            key={image}
            alt="Test img"
            style={{ width: "75%", height: "75%" }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default EditPictures;
