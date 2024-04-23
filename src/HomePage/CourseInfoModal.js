// When clicking on PopularCourses in homepage, this displays more information
import React from "react";
import ReactDOM from "react-dom";

const CourseInfoModal = ({ isOpen, onClose, course }) => {
  if (!isOpen) return null;

  //setting up modal styling here instead of inside return block, as sizing was not fixed and varied across each module
  const modalStyle = {
    width: "600px",
    maxHeight: "90vh",
    overflow: "auto",
    position: "relative",
    border: "1px solid #C9A567",
  };

  const imageStyle = {
    height: "auto",
    maxWidth: "100%",
    borderRadius: "8px",
  };

  //rendered outside usual DOM hierarchy - wanted to experiment with this with a modal
  //pulling data from course object, which is stored in Strapi backend
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4">
      <div className="bg-white rounded-lg shadow-lg" style={modalStyle}>
        <div className="flex justify-between items-start p-4 border-b border-[#C9A567]">
          <h3 className="text-2xl font-semibold text-[#5C3D2E]">
            {course.attributes.Title}
          </h3>
          <button
            onClick={onClose}
            className="text-[#5C3D2E] font-bold text-xl leading-none p-1"
          >
            ×
          </button>
        </div>
        <div className="p-4">
          <img
            src={course.imageUrl || "/images/not_found.png"}
            alt="Course"
            style={imageStyle}
          />
          <p className="text-lg text-[#5C3D2E] mt-2">
            {course.attributes.description}
          </p>
          <p className="text-md mt-4 text-[#5C3D2E]">
            Approximately takes: {course.attributes.Duration} minutes
          </p>
          <p className="text-md text-[#5C3D2E]">
            Available in the {course.attributes.PlanName} Plan
          </p>
        </div>
        <div className="flex justify-end p-4 border-t border-[#C9A567]">
          <button
            onClick={onClose}
            className="bg-transparent text-red-500 font-semibold uppercase text-sm px-6 py-2 border border-red-500 rounded hover:bg-red-500 hover:text-white transition-colors duration-150 ease-linear"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default CourseInfoModal;
