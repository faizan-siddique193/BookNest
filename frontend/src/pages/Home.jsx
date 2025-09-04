import React from "react";
import {
  Categories,
  FeaturedBooks,
  HeroSection,
  LatestBooks,
  Testimonial,
} from "../Component/index";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Categories />
      <FeaturedBooks />
      <LatestBooks />
      <Testimonial/>
    </div>
  );
};

export default Home;
