import React from "react";
import {
  Categories,
  FeaturedBooks,
  HeroSection,
  LatestBooks,
  Testimonial,
} from "../Component/index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTestimonialReviews } from "../feature/review/reviewAction";
import { toast } from "react-toastify";
import { useState } from "react";
import { getCartItem } from "../feature/cart/cartAction";
const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { testimoniReviews, totalPages } = useSelector((state) => state.review);

  // Function passed to child
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const dispatch = useDispatch();

  // dispatch gettestimonial reviews

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        await dispatch(getTestimonialReviews({ currentPage })).unwrap();
      } catch (error) {
        toast.error(error || "Something went wrong while getting Reviews");
      }
    };

    fetchReviews();
  }, [dispatch, currentPage]);

  return (
    <div>
      <HeroSection />
      <Categories />
      <FeaturedBooks />
      <LatestBooks />
      <Testimonial
        reviews={testimoniReviews}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
