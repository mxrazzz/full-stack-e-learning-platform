import React from "react";
import HeroSection from "../HomePage/HeroSection";
import PopularCourses from "../HomePage/PopularCourses";
import RoadmapPlans from "../HomePage/RoadmapPlans";
import TopArticles from "../HomePage/TopArticles";

function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />
      <RoadmapPlans />
      <PopularCourses />
      <TopArticles />
    </div>
  );
}

export default HomePage;
