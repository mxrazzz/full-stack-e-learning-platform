import React from "react";
import { useNavigate } from "react-router-dom";

const QuizCard = ({ categoryKey, categoryName, returnPath }) => {
  const navigate = useNavigate();

  // Function to navigate to the quiz with dynamic return path
  const takeQuiz = () => {
    navigate(`/quiz/${categoryKey}`, { state: { returnPath } });
  };

  return (
    <div
      className="flex flex-col rounded-md shadow-md bg-[#004080] m-2" // Navy blue background
      style={{ width: "300px", height: "350px" }}
    >
      <img
        src="/images/quizLogo.png"
        alt={`Take the ${categoryName} Quiz`}
        className="object-cover w-full h-48" // Use Tailwind's height class
      />
      <div className="flex flex-col p-4 justify-between flex-grow">
        <h3 className="text-lg font-semibold text-white">
          Take the {categoryName} Quiz
        </h3>
        <button
          className="text-lg font-semibold py-2 px-4 rounded bg-white hover:bg-gray-800 text-black my-2"
          onClick={takeQuiz}
        >
          Take Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
