import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/PopularCourses.css"; // Adjust the path if needed
import CourseCard from "./CourseCard";
import AuthModal from "./AuthModal";
import axios from "axios";

function PopularCourses() {
  const courses = [
    { id: 1, title: "Foundations of Islamic Faith", image: "bookicon.png" },
    {
      id: 2,
      title: "Principles of Islamic Jurisprudence",
      image: "bookicon.png",
    },
    {
      id: 3,
      title: "The Life of the Prophet Muhammad",
      description: "A timeline of the prophets life",
      image: "bookicon.png",
    },
    { id: 4, title: "Introduction to the Quran", image: "bookicon.png" },
    { id: 5, title: "History of the Islamic Caliphate", image: "bookicon.png" },
    { id: 6, title: "Islamic Ethics and Morality", image: "bookicon.png" },
    { id: 7, title: "The Art of Islamic Calligraphy", image: "bookicon.png" },
    { id: 8, title: "Shariah: Good or Bad?", image: "bookicon.png" },
    { id: 9, title: "Contemporary Issues in Islam", image: "bookicon.png" },
    {
      id: 10,
      title: "Islamic Architecture Through the Ages",
      image: "masjidNabawi.jpg",
    },
  ];

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,

    responsive: [
      {
        breakpoint: 1280, // Adjusted breakpoint for larger screens
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // This now applies for screens between 1024px and 1279px
        settings: {
          slidesToShow: 3, // Show 2 cards for medium screens
        },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },

      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCourseStart = (isAuthenticated) => {
    if (isAuthenticated) {
      console.log("Course started");
    } else {
      openModal();
    }
  };

  return (
    <div className="bg-[#FFF9EC] text-[#5D5D5A]">
      <div className="text-center p-6">
        <h2 className="text-4xl font-semibold text-[#1A365D] mb-4">
          Popular Courses
        </h2>
        <Slider {...settings}>
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              description={course.description}
              image={course.image} // Using the same image for all courses
              onCourseStart={() => handleCourseStart(true)} // Temporarily treating all clicks as authenticated
            />
          ))}
        </Slider>
      </div>
      <AuthModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default PopularCourses;
