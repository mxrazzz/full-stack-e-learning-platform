import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCardPlan = ({ id, title, description, image, progress }) => {
  const navigate = useNavigate();

  const startCourse = () => {
    navigate(`/course-content/${id}`);
  };

  return (
    <div
      className="flex flex-col rounded-md shadow-md bg-[#C9A567] m-2"
      style={{ width: "300px", height: "350px" }}
    >
      <img
        src={image}
        alt="Course"
        style={{ height: "150px", width: "100%", objectFit: "cover" }}
      />
      <div className="flex flex-col p-4 justify-between flex-grow">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-white text-sm mt-2">{description}</p>
        </div>
        <button
          className="py-2 px-4 bg-white text-[#C9A567] font-semibold rounded self-center mt-auto"
          onClick={startCourse}
        >
          Start Course
        </button>
      </div>
      {typeof progress === "number" && (
        <div
          className="w-full rounded-full mt-2"
          style={{ backgroundColor: "#f5f5dc" }}
        >
          {" "}
          {/* Adjusted to cream color */}
          <div
            className="bg-[#D4AF37] text-xs font-medium text-[#5C3D2E] text-center p-0.5 leading-none rounded-full" // Gold shade for progress, adjusted text color for better contrast
            style={{ width: `${Math.round(progress)}%` }} // Round progress to nearest whole number
          >
            {Math.round(progress)}% {/* Display rounded progress */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCardPlan;
