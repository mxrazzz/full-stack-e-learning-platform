import React from "react";
import ReactDOM from "react-dom";

const CourseInfoModal = ({ isOpen, onClose, course }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="relative flex flex-col items-center max-w-lg gap-4 p-6 rounded-md shadow-md bg-white text-gray-800">
        <button onClick={onClose} className="absolute top-2 right-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            className="flex-shrink-0 w-6 h-6"
          >
            <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313"></polygon>
          </svg>
        </button>
        {/* Course Image - Example Placeholder */}
        <img
          src={course.image || "path/to/default/image.png"}
          alt="Course"
          className="w-40 h-40 object-cover rounded-full"
        />
        <h2 className="text-2xl font-semibold leading-tight tracking-wide">
          {course.title}
        </h2>
        <p className="flex-1 text-center">{course.description}</p>
        <button
          type="button"
          className="px-8 py-3 font-semibold rounded-full bg-blue-600 text-white"
          onClick={() => alert("Enroll functionality to be implemented")}
        >
          Enroll Now
        </button>
      </div>
    </div>,
    document.getElementById("modal-root") // Ensure you have a div with this id in your index.html
  );
};

export default CourseInfoModal;
