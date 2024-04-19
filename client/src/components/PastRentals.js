import React, { useState, useEffect } from 'react'
import { GridColumn, Divider, Grid, Image, Segment } from 'semantic-ui-react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const PastRentals = ({ props }) => {
    return (
    <Swiper
    navigation={true}
    modules={[Navigation]}
    className="mySwiper"
    slidesPerView={4}
    spaceBetween={30}
    centeredSlides={true}
  >
    
    {props.map((product_rental, rental_id) => (
    <SwiperSlide>
        <p key={rental_id}>{product_rental.rental_id}</p>
    </SwiperSlide>
    ))}
    </Swiper>
    );
};

export default PastRentals
