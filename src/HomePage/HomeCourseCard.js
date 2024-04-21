// CourseCard.js
import React from "react";

const HomeCourseCard = ({ title, description, image, onLearnMore }) => {
  return (
    <div
      className="flex flex-col rounded-md shadow-md bg-[#C9A567] m-2"
      style={{ width: "300px", height: "350px" }}
    >
      {" "}
      <img
        src={image}
        alt="Course"
        style={{ height: "150px", objectFit: "cover" }}
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
          onClick={onLearnMore}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default HomeCourseCard;
