// Carousel to display popular courses, fetching data from Strapi
// using slick carousel to display the courses in a moving carousel
import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CourseCard from "./HomeCourseCard"; // to display the card
import CourseInfoModal from "./CourseInfoModal"; // displays more info about the selected course

const PopularCourses = () => {
  const [courses, setCourses] = useState([]); //stores the list of courses from Strapi
  const [isModalOpen, setIsModalOpen] = useState(false); // toggles visibility of modal i.e when its clicked it should appear
  const [selectedCourse, setSelectedCourse] = useState(null); // state for when clicking on a selected course

  //opens the modal to display more info about the course
  const openModal = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  //Fetching course data from Strapi
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:1337/api/courses?populate=*"
        );
        //AI generated to fetch image and store in a map
        const coursesWithImages = data.data.map((course) => {
          const imageUrl = course.attributes.image.data
            ? `http://localhost:1337${course.attributes.image.data.attributes.url}`
            : "/images/not_found.png"; // Fallback to a default image if no image is found
          return { ...course, imageUrl };
        });
        setCourses(coursesWithImages);
        //End of AI generation
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  //setting up settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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
            <CourseCard //loading fetched data into the card
              key={course.id}
              title={course.attributes.Title}
              description={course.attributes.description}
              image={course.imageUrl}
              onLearnMore={() => openModal(course)}
            />
          ))}
        </Slider>
      </div>
      {/* renders the course info modal if course is selected  */}
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
