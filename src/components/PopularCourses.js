import React from "react";
import Slider from "react-slick";
import "../styles/PopularCourses.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bookIcon from "../assets/bookicon.png";

function PopularCourses() {
  const courses = [
    { id: 1, title: "Foundations of Islamic Faith", imageUrl: bookIcon },
    { id: 2, title: "Principles of Islamic Jurisprudence", imageUrl: bookIcon },
    { id: 3, title: "The Life of the Prophet Muhammad", imageUrl: bookIcon },
    { id: 4, title: "Introduction to the Quran", imageUrl: bookIcon },
    { id: 5, title: "History of the Islamic Caliphate", imageUrl: bookIcon },
    { id: 6, title: "Islamic Ethics and Morality", imageUrl: bookIcon },
    { id: 7, title: "The Art of Islamic Calligraphy", imageUrl: bookIcon },
    { id: 8, title: "Shariah: Good or Bad?", imageUrl: bookIcon },
    { id: 9, title: "Contemporary Issues in Islam", imageUrl: bookIcon },
    {
      id: 10,
      title: "Islamic Architecture Through the Ages",
      imageUrl: bookIcon,
    },
  ];

  // Settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 5, // Consider reducing this number if too tight
    slidesToScroll: 5, // Ensure this matches slidesToShow or adjust as needed
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // Adjust based on available space
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2, // Less space means fewer slides
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // Single slide for very small devices
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Function to handle clicking a course card
  const handleCardClick = (course, event) => {
    // Prevent the slider from cancelling the event
    event.stopPropagation();
    console.log(`Course clicked: ${course.title}`);
    // Replace with your own click handling logic, e.g., navigation
  };

  // Inside the render method, update the onClick handler to pass the event as well
  return (
    <section className="popular-courses">
      <h2>Popular Courses</h2>
      <Slider {...settings}>
        {courses.map((course) => (
          <div
            key={course.id}
            className="course-card"
            onClick={(e) => handleCardClick(course, e)} // Pass the event to the handler
            tabIndex={0} // Make the div focusable
          >
            <img src={course.imageUrl} alt={course.title} />
            <h3>{course.title}</h3>
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default PopularCourses;
