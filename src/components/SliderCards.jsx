import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderCards = ({ children }) => {
  const sliderSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
  };

  return <Slider {...sliderSettings}>{children}</Slider>;
};

export default SliderCards;
