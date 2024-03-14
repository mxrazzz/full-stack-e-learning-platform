import React from "react";
import HeroSection from "../components/HeroSection";
import PopularCourses from "../components/PopularCourses";
import TopCategories from "../components/TopCategories";
import RoadmapPlans from "../components/RoadmapPlans";

function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />
      <RoadmapPlans />
      <PopularCourses />
      <TopCategories />
    </div>
  );
}

export default HomePage;
