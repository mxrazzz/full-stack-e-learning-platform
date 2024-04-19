import React, { useState } from "react";
import { useTimer } from "react-timer-hook";
import { useParams } from "react-router-dom";

const Quiz = () => {
  const { quizId } = useParams();
  console.log("Quiz ID:", quizId);

  const quizzes = [
    {
      id: "EssentialsOfIslam",
      title: "Essentials of Islam",
      questions: [
        {
          question: "What is the pillar of Islam?",
          options: ["Charity", "Prayer", "Fasting"],
          answer: "Prayer",
        },
        {
          question: "How many times is Salah performed daily?",
          options: ["3", "5", "6"],
          answer: "5",
        },
        // More questions...
      ],
    },
    {
      id: "historyOfIslam",
      title: "History of Islam",
      questions: [
        {
          question: "Who was the first prophet of Islam?",
          options: ["Moses", "Jesus", "Muhammad"],
          answer: "Muhammad",
        },
        {
          question:
            "Which city was the first capital of the Islamic Caliphate?",
          options: ["Mecca", "Medina", "Baghdad"],
          answer: "Medina",
        },
        // More questions...
      ],
    },
    // More quizzes...
  ];

  const quiz = quizzes.find((q) => q.id === quizId);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp: getExpiryTimestamp(),
    onExpire: () => handleQuizEnd(),
  });

  function getExpiryTimestamp() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 300); // 300 seconds for each quiz
    return time;
  }

  function handleAnswer(option) {
    if (option === quiz.questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quiz.questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      restart(getExpiryTimestamp(), true); // Resetting timer when showing the score
    }
  }

  function handleQuizEnd() {
    setShowScore(true);
    restart(getExpiryTimestamp(), true); // Resetting timer when quiz ends
  }

  return (
    <div className="bg-[#FFF7E0] min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-[#5C3D2E] mb-8">{quiz.title}</h1>
      {showScore ? (
        <div className="text-3xl text-[#C9A567]">
          You scored {score} out of {quiz.questions.length}
        </div>
      ) : (
        <>
          <div className="text-2xl text-[#5C3D2E] mb-4">
            {quiz.questions[currentQuestion].question}
          </div>
          <div className="flex flex-col">
            {quiz.questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="text-lg font-semibold py-2 px-4 rounded bg-[#D4AF37] hover:bg-[#C9A567] text-[#1A365D] my-2"
              >
                {option}
              </button>
            ))}
          </div>
          <div className="text-[#5C3D2E] mt-4">
            Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
