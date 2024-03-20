import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CourseCard from "./CourseCard"; // Adjust import path as needed

const ExplorerPlan = () => {
  const essentialsOfIslamCourses = [
    // Example courses for "Essentials of Islam"
    { id: 1, title: "Five Pillars of Islam", progress: 50 },
    { id: 2, title: "Prophet Muhammad (PBUH)", progress: 20 },
    // Add more courses
  ];

  const commonMisconceptionsCourses = [
    // Example courses for "Common Misconceptions"
    { id: 1, title: "Misconception 1", progress: 75 },
    { id: 2, title: "Misconception 2", progress: 30 },
    // Add more courses
  ];

  // Slider settings (shared between both sliders)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <div className="bg-[#FFF7E0] p-6">
      <h2 className="text-2xl font-semibold text-[#5C3D2E] mb-4">
        Explorer Plan
      </h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Essentials of Islam</h3>
        <Slider {...settings}>
          {essentialsOfIslamCourses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              progress={course.progress}
            />
          ))}
        </Slider>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Common Misconceptions</h3>
        <Slider {...settings}>
          {commonMisconceptionsCourses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              progress={course.progress}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ExplorerPlan;
