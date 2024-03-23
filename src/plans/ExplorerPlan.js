import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CourseCard from "./CourseCardPlan"; // Adjust the import path as necessary
import logoImage from "../assets/logo.png";

const categories = [
  { key: "EssentialsOfIslam", label: "Essentials of Islam" },
  { key: "AddressingMisconceptions", label: "Addressing Misconceptions" },
  { key: "IslamVsOthers", label: "Islam vs. Others" },
  { key: "ProofsForIslam", label: "Proofs For Islam" },
];

const ExplorerPlan = () => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/modules?populate=*"
        );
        const modulesWithImages = response.data.data.map((module) => {
          const imageUrl = module.attributes.Image.data
            ? `http://localhost:1337${module.attributes.Image.data[0].attributes.url}`
            : undefined;
          return { ...module, imageUrl };
        });
        setModules(modulesWithImages);
      } catch (error) {
        console.error("Failed to fetch modules:", error);
      }
    };

    fetchModules();
  }, []);

  const renderSliderForCategory = (categoryKey, label) => {
    const filteredModules = modules.filter(
      (module) => module.attributes.Category === categoryKey
    );

    const sliderSettings = {
      dots: true,
      infinite: filteredModules.length > 3,
      speed: 500,
      slidesToShow: Math.min(3, filteredModules.length),
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: Math.min(2, filteredModules.length),
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
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
        <Slider {...sliderSettings}>
          {filteredModules.map((module) => (
            <CourseCard
              key={module.id}
              title={module.attributes.Title}
              description={module.attributes.description}
              image={module.imageUrl}
            />
          ))}
        </Slider>
      </div>
    );
  };

  return (
    <div className="bg-[#FFF9EC] text-[#5D5D5A] p-6">
      <h2 className="text-2xl font-semibold text-[#5C3D2E] mb-4">
        Explorer Plan
      </h2>
      {categories.map(({ key, label }) => renderSliderForCategory(key, label))}
    </div>
  );
};

export default ExplorerPlan;
