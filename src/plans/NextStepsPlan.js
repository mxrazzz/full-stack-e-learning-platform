//Component to display the Next Steps plan page with carousel sliders of all its modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CourseCard from "./CourseCardPlan";
import QuizCard from "./QuizCard";
import { useNavigate } from "react-router-dom";

//defining all categories in the plan
const categories = [
  { key: "Aqeedah", label: "Aqeedah - Core Beliefs" },
  { key: "Fiqh", label: "Fiqh - Jurisprudence" },
  { key: "Tafsir", label: "Tafsir - Quran explanations" },
  { key: "Arabic", label: "Arabic" },
];

const ExplorerPlan = () => {
  const [modules, setModules] = useState([]); //storing module data
  const [userProgress, setUserProgress] = useState({}); //storing user progress
  const navigate = useNavigate();

  //function to take user to dashboard after button is pressed
  const goToDashboard = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    //function for fetching module from Strapi
    const fetchModules = async () => {
      try {
        //fetching modules filtered by category from Strapi backend
        const response = await axios.get(
          "http://localhost:1337/api/modules?filters[plan][$eq]=Existing&populate=*"
        );
        //For all Strapi image fetching, used AI as no documentation could be found to resolve image fetching issues
        const modulesWithImages = response.data.data.map((module) => {
          const imageUrl = module.attributes.Image.data
            ? `http://localhost:1337${module.attributes.Image.data[0].attributes.url}`
            : "/images/not_found.png";
          return { ...module, imageUrl };
        });
        setModules(modulesWithImages); //updates module state
      } catch (error) {
        console.error("Failed to fetch modules:", error);
      }
    };

    //function for fetching user progress for a module on MongoDB
    const fetchUserProgress = async () => {
      try {
        const { data: progressData } = await axios.get(
          "http://localhost:5000/api/user/progress",
          { withCredentials: true }
        );
        // Convert progressData array to an object for easier access
        //AI used here
        const progressMap = progressData.reduce((acc, cur) => {
          acc[cur.moduleId] = cur;
          return acc;
        }, {});
        setUserProgress(progressMap); //updates progress state
      } catch (error) {
        console.error("Failed to fetch user progress:", error);
      }
    };

    //both functions called
    fetchModules();
    fetchUserProgress();
  }, []); //empty so that effect only runs once

  // renders the slider for each of the categories from the categories array
  const renderSliderForCategory = (categoryKey, label) => {
    const filteredModules = modules.filter(
      (module) => module.attributes.Category === categoryKey
    );

    //setup for the slider
    const sliderSettings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: Math.min(4, filteredModules.length), //will display 4 slides, scales down as size of screen decreases
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1280, // For screens up to 1280px
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1000, // For screens up to 1000px
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480, // For screens up to 480px
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
      <div className="category-slider" key={categoryKey}>
        <h3 className="text-xl font-semibold mb-4">{label}</h3>
        {/* mapping through the filtered modules, placing a CourseCard component for each module*/}
        <Slider {...sliderSettings}>
          {filteredModules.map((module) => (
            <CourseCard
              key={module.id}
              id={module.id}
              title={module.attributes.Title}
              description={module.attributes.description}
              image={module.imageUrl}
              progress={userProgress[module.id]?.progress} //AI used to display progress
              returnPath="/plans/existing"
            />
          ))}
          {/* At the end of the modules, a QuizCard component is placed for each category */}
          <QuizCard
            categoryKey={categoryKey}
            categoryName={label}
            returnPath="/plans/existing" // will always return to this plan once quiz is done
          />
        </Slider>
      </div>
    );
  };

  return (
    <div className="bg-[#FFF9EC] text-[#5D5D5A] p-6">
      <div className="flex justify-center items-center mb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold text-[#5C3D2E]">
            Next Steps Plan
          </h2>
          <button
            type="button"
            onClick={goToDashboard}
            className="px-4 py-3 text-sm font-semibold rounded text-white bg-[#1A365D] hover:bg-[#162945] focus:outline-none focus:ring-2 focus:ring-[#1A365D] focus:ring-opacity-50"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
      {/* Map through categories and render slider for each */}
      {categories.map(({ key, label }) =>
        renderSliderForCategory(key, label, userProgress)
      )}
    </div>
  );
};

export default ExplorerPlan;
