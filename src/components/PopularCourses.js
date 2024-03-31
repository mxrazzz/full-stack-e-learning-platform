import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CourseCard from "./CourseCard"; // Ensure this path is correct
import CourseInfoModal from "./CourseInfoModal";
import logoImage from "../assets/logo.png";

const PopularCourses = () => {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const openModal = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };
  //used chatGTP to debug why image was not being fetched from Strapi
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:1337/api/courses?populate=*"
        ); // Adjust URL as needed
        const coursesWithImages = data.data.map((course) => {
          const imageUrl = course.attributes.image.data
            ? `http://localhost:1337${course.attributes.image.data.attributes.url}`
            : logoImage; // Fallback to a default image if no image is found
          return { ...course, imageUrl };
        });
        setCourses(coursesWithImages);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
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
              title={course.attributes.Title}
              description={course.attributes.description}
              image={course.imageUrl}
              onLearnMore={() => openModal(course)}
            />
          ))}
        </Slider>
      </div>
      {isModalOpen && selectedCourse && (
        <CourseInfoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          course={selectedCourse}
        />
      )}
    </div>
  );
};

export default PopularCourses;
