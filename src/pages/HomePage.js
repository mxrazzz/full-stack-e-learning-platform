import React from "react";
import HeroSection from "../components/HeroSection";
import PopularCourses from "../components/PopularCourses";
import RoadmapPlans from "../components/RoadmapPlans";
import TopArticles from "../components/TopArticles";

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
