import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Slider from "react-slick"; // Make sure to import Slider from react-slick
import "slick-carousel/slick/slick.css"; // Default styling
import "slick-carousel/slick/slick-theme.css"; // Default theming
import CourseCard from "../plans/CourseCardPlan";

const Dashboard = () => {
  const [enrolledPlans, setEnrolledPlans] = useState([]);
  const [recentCourses, setRecentCourses] = useState([]); // State for storing recent courses
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrolledPlans = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user-plans",
          {
            withCredentials: true,
          }
        );
        setEnrolledPlans(response.data.enrolledPlans);
      } catch (error) {
        console.error("Failed to fetch enrolled plans", error);
      }
    };

    const fetchRecentCourses = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/user/recent-modules",
          {
            withCredentials: true,
          }
        );
        setRecentCourses(data);
      } catch (error) {
        console.error("Failed to fetch recent courses", error);
      }
    };

    fetchEnrolledPlans();
    fetchRecentCourses();
  }, []);

  const planDetails = {
    explorer: {
      name: "Explorer Plan",
      description: "Begin your journey with the basics of Islam.",
      imageUrl: "images/explorerPlan.jpg",
    },
    revert: {
      name: "Revert Plan",
      description: "Strengthen your new faith with foundational knowledge.",
      imageUrl: "images/revertPlan.jpg",
    },
    existing: {
      name: "Next Steps Plan",
      description: "Deepen your understanding and practice of Islam.",
      imageUrl: "images/existingPlan.jpg",
    },
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-[#FFF7E0] p-6">
      <h2 className="text-2xl font-semibold text-[#5C3D2E] mb-4">Your Plans</h2>
      {enrolledPlans.length === 0 ? (
        <p>You are not enrolled in any plans.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {enrolledPlans.map((planId) => (
            <div
              key={planId}
              className="flex flex-col max-w-sm rounded-md shadow-md overflow-hidden h-full bg-[#C9A567]"
            >
              <img
                src={
                  planDetails[planId]?.imageUrl ||
                  "https://source.unsplash.com/random/300x300/?islamic"
                }
                alt="Plans"
                className="object-cover object-center w-full h-48"
              />
              <div className="flex flex-col flex-1 p-4 justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {planDetails[planId]?.name}
                  </h3>
                  <p className="text-white text-opacity-90">
                    {planDetails[planId]?.description}
                  </p>
                </div>
                <button
                  className="mt-4 py-2 px-4 bg-white text-[#C9A567] font-semibold rounded self-center"
                  onClick={() => navigate(`/plans/${planId}`)}
                >
                  Start Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {recentCourses.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-[#5C3D2E] mb-4">
            Recent Courses
          </h3>
          <Slider {...sliderSettings}>
            {recentCourses.map((course) => (
              <CourseCard
                key={course.id}
                {...course}
                onClick={() => navigate(`/course/${course.id}`)}
              />
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
