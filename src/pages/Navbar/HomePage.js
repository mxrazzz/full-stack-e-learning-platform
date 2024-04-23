// Isolated Homepage component
// displays all the related components which only appear in the Homepage and not elsewhere in the app

import React, { Suspense, lazy } from "react";

//importing each section component for the Homepage with Lazy Loading

const HeroSection = lazy(() => import("../../HomePage/HeroSection")); // //displays the header/banner of the homepage
const RoadmapPlans = lazy(() => import("../../HomePage/RoadmapPlans")); //shows the available plans for the user to enroll in
const PopularCourses = lazy(() => import("../../HomePage/PopularCourses")); // shows a list of featured courses that are available inside the plans
const TopArticles = lazy(() => import("../../HomePage/TopArticles")); //shows the top articles available

function HomePage() {
  return (
    // Suspense component to display the loading state of the lazy components. will display the spinner from https://mambaui.com/components/loading
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-full h-screen">
          <div
            className="w-32 h-32 border-8 border-dashed rounded-full animate-spin"
            style={{ borderColor: "goldenrod transparent", borderWidth: "8px" }}
          ></div>
        </div>
      }
    >
      <div className="home-page">
        {/*placed in order of display e.g. HeroSection will be displayed first and TopArticles displayed last*/}
        <HeroSection />
        <RoadmapPlans />
        <PopularCourses />
        <TopArticles />
      </div>
    </Suspense>
  );
}

export default HomePage;
