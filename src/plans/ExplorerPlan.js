import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CourseCard from "../components/CourseCard";

const ExplorerPlan = () => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get("http://localhost:1337/api/modules");
        setModules(response.data.data); // Adjust based on your actual API response structure
      } catch (error) {
        console.error("Failed to fetch modules:", error);
      }
    };

    fetchModules();
  }, []);

  const categories = [
    { key: "EssentialsOfIslam", label: "Essentials of Islam" },
    { key: "AddressingMisconceptions", label: "Addressing Misconceptions" },
    { key: "IslamVsOthers", label: "Islam vs. Others" },
    { key: "ProofsForIslam", label: "Proofs For Islam" },
  ];

  const filterModulesByCategory = (category) =>
    modules.filter((module) => module.attributes.Category === category);

  const settings = {
    // Start with 1 and let variableWidth adjust as needed
    slidesToScroll: 1,
    variableWidth: true,
  };

  return (
    <div className="bg-[#FFF7E0] p-6">
      <h2 className="text-2xl font-semibold text-[#5C3D2E] mb-4">
        Explorer Plan
      </h2>
      {categories.map((category) => (
        <div key={category.key} className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{category.label}</h3>
          <Slider {...settings}>
            {filterModulesByCategory(category.key).map((module) => (
              <CourseCard
                key={module.id}
                title={module.attributes.Title} // Note the capitalization
                description={module.attributes.description} // Assuming this matches your structure
                // You need to adjust the image path if your API provides a direct URL or relative path
              />
            ))}
          </Slider>
        </div>
      ))}
    </div>
  );
};

export default ExplorerPlan;
