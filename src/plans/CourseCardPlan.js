// CourseCard.js
import React from "react";

const CourseCard = ({ title, description, image, onCourseStart }) => {
  return (
    <div
      className="flex flex-col rounded-md shadow-md bg-[#C9A567] m-2"
      style={{ width: "300px", height: "350px" }}
    >
      {" "}
      {/* Fixed size but you can adjust */}
      <img
        src={image}
        alt="Course"
        style={{ height: "150px", objectFit: "cover" }} // Adjust height as needed
      />
      <div
        className="flex flex-col p-4 justify-between"
        style={{ flexGrow: 1 }}
      >
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-white text-sm mt-2">{description}</p>
        </div>
        <button
          className="py-2 px-4 bg-white text-[#C9A567] font-semibold rounded self-center mt-2"
          onClick={onCourseStart}
        >
          Start Course
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
