import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CourseCard from "./CourseCardPlan";
import QuizCard from "./QuizCard";
import logoImage from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const categories = [
  { key: "Aqeedah", label: "Aqeedah - Core Beliefs" },
  { key: "Fiqh", label: "Fiqh - Jurisprudence" },
  { key: "Tafsir", label: "Tafsir - Quran explanations" },
  { key: "Arabic", label: "Arabic" },
];

const ExplorerPlan = () => {
  const [modules, setModules] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/modules?filters[plan][$eq]=Existing&populate=*"
        );
        const modulesWithImages = response.data.data.map((module) => {
          const imageUrl = module.attributes.Image.data
            ? `http://localhost:1337${module.attributes.Image.data[0].attributes.url}`
            : logoImage;
          return { ...module, imageUrl };
        });
        setModules(modulesWithImages);
      } catch (error) {
        console.error("Failed to fetch modules:", error);
      }
    };

    const fetchUserProgress = async () => {
      try {
        const { data: progressData } = await axios.get(
          "http://localhost:5000/api/user/progress",
          { withCredentials: true }
        );
        // Convert progressData array to an object for easier access
        const progressMap = progressData.reduce((acc, cur) => {
          acc[cur.moduleId] = cur; // Assuming cur.moduleId is the module's ID
          return acc;
        }, {});
        setUserProgress(progressMap);
      } catch (error) {
        console.error("Failed to fetch user progress:", error);
      }
    };

    fetchModules();
    fetchUserProgress();
  }, []);

  const renderSliderForCategory = (categoryKey, label) => {
    const filteredModules = modules.filter(
      (module) => module.attributes.Category === categoryKey
    );

    const sliderSettings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: Math.min(4, filteredModules.length),
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1280, // For screens up to 1024px
          settings: {
            slidesToShow: 3, // Show 3 items if the screen size is less than or equal to 1024px
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1000, // For screens up to 768px
          settings: {
            slidesToShow: 2, // Show 2 items if the screen size is less than or equal to 768px
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480, // For screens up to 480px
          settings: {
            slidesToShow: 1, // Show 1 item if the screen size is less than or equal to 480px
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
      <div className="category-slider" key={categoryKey}>
        <h3 className="text-xl font-semibold mb-4">{label}</h3>
        <Slider {...sliderSettings}>
          {filteredModules.map((module) => (
            <CourseCard
              key={module.id}
              id={module.id}
              title={module.attributes.Title}
              description={module.attributes.description}
              image={module.imageUrl}
              progress={userProgress[module.id]?.progress}
              returnPath="/plans/existing"
            />
          ))}
          <QuizCard
            categoryKey={categoryKey}
            categoryName={label}
            returnPath="/plans/existing" // This ensures the return path is dynamic
          />
        </Slider>
      </div>
    );
  };

  const goToDashboard = () => {
    navigate("/dashboard"); // Adjust the route as necessary for your dashboard
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
      {categories.map(({ key, label }) =>
        renderSliderForCategory(key, label, userProgress)
      )}
    </div>
  );
};

export default ExplorerPlan;
