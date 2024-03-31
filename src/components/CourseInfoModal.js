import React from "react";
import ReactDOM from "react-dom";

const CourseInfoModal = ({ isOpen, onClose, course }) => {
  if (!isOpen) return null;

  const modalStyle = {
    width: "600px", // Ensures the modal width is fixed
    maxHeight: "90vh", // Limits the modal height to avoid filling the entire viewport height
    overflow: "auto", // Allows for scrolling within the modal
    position: "relative", // Needed for absolute positioning of the close button
  };

  const imageStyle = {
    height: "auto", // Ensures the height adjusts to maintain aspect ratio without exceeding bounds
    maxWidth: "100%", // Prevents the image from exceeding the modal width
    borderRadius: "8px", // Optional: Adds a slight rounding to the image corners for aesthetics
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4">
      <div className="bg-white rounded-lg shadow-lg" style={modalStyle}>
        <div className="flex justify-between items-start p-4 border-b">
          <h3 className="text-2xl font-semibold">{course.attributes.Title}</h3>
          <button
            onClick={onClose}
            className="text-black font-bold text-xl leading-none p-1"
          >
            ×
          </button>
        </div>
        <div className="p-4">
          <img
            src={course.imageUrl || "path/to/default/image.png"}
            alt="Course"
            style={imageStyle}
          />
          <p className="text-lg text-gray-800 mt-2">
            {course.attributes.description}
          </p>
          <p className="text-md mt-4">
            Approximately takes: {course.attributes.Duration} minutes
          </p>
          <p className="text-md">
            Available in the {course.attributes.PlanName} Plan
          </p>
        </div>
        <div className="flex justify-end p-4 border-t">
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
