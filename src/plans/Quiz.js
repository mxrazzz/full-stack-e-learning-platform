// Full Quiz component implementation
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useTimer } from "react-timer-hook";
import { useDispatch } from "react-redux";
import { showNotification } from "../redux/notificationSlice";

const Quiz = () => {
  const { quizId } = useParams(); //retrieving quiz id from url params
  const navigate = useNavigate();
  const location = useLocation();
  const returnPath = location.state?.returnPath || "/";
  const [quiz, setQuiz] = useState(null); //storing quiz data
  const [currentQuestion, setCurrentQuestion] = useState(0); //track current question position
  const [userAnswers, setUserAnswers] = useState([]); //store user answers
  const [showScore, setShowScore] = useState(false); //toggle score visibility
  const [error, setError] = useState("");
  const dispatch = useDispatch(); //function for redux actions like showing the notification text

  //fetching quiz from server
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/quizzes/quiz/${quizId}`)
      .then((response) => {
        setQuiz(response.data); //updating state with fetched quiz data
        setUserAnswers(new Array(response.data.questions.length).fill(null)); //initialising array
      })
      .catch((err) => {
        setError("Failed to fetch quiz data");
        console.error("Error fetching quiz data:", err);
      });
  }, [quizId]); //dependency array, will fetch data whenever a different quiz is clicked on

  //function to submit answer to server
  const submitQuizAnswers = async (quizId, answers) => {
    try {
      // No need to include userId if backend uses session or token authentication
      const response = await axios.post(
        `http://localhost:5000/api/quizzes/submit/${quizId}`,
        { answers },
        { withCredentials: true } // Ensures cookies are included with the request
      );
      const { xpAwarded, score } = response.data;
      // displaying notification text
      dispatch(
        showNotification({
          message: `Quiz completed! XP Awarded: ${xpAwarded}`,
        })
      );
    } catch (error) {
      console.error("Error submitting quiz:", error.message);
      alert("Failed to submit quiz.");
    }
  };

  // setting up a timer with react-timer-hook
  const { seconds, minutes, pause } = useTimer({
    expiryTimestamp: new Date(
      new Date().setSeconds(new Date().getSeconds() + 300) // sets a 5-minute timer
    ),
    onExpire: () => {
      setShowScore(true); //score now visible after timer expires
      submitQuizAnswers(quizId, userAnswers); // Submit answers when the timer expires
      pause(); // timer pauses when quiz ends
    },
  });

  //function to handle users answer selection
  //AI generated code to make it smoother for user experience
  const handleAnswer = (option, index) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = option;
    setUserAnswers(updatedAnswers);

    const nextQuestion = index + 1;
    if (nextQuestion < quiz.questions.length) {
      setTimeout(() => setCurrentQuestion(nextQuestion), 300);
    } else {
      setShowScore(true);
      pause(); //timer paused
      submitQuizAnswers(quizId, updatedAnswers); //submits quiz answers
    }
  };

  //function to navigate between questions
  const navigateToNextPrev = (index) => {
    if (index >= 0 && index < quiz.questions.length) {
      setCurrentQuestion(index);
    }
  };

  //function to show correct/incorrect answers at the end
  //Help of AI generation to debug
  const renderAnswers = () =>
    quiz.questions.map((question, index) => (
      <div key={index} className="text-lg my-2">
        <h3 className="font-semibold">{question.question}</h3>
        {question.options.map((option, idx) => (
          <div
            key={idx}
            className={`pl-4 ${
              option === question.answer
                ? "text-green-500"
                : userAnswers[index] === option
                ? "text-red-500"
                : "text-gray-500"
            }`}
          >
            {option}
          </div>
        ))}
      </div>
    ));

  if (error) return <div>Error: {error}</div>;
  //if quiz is still being fetched will display a loading spinner
  if (!quiz)
    return (
      <div
        className="w-16 h-16 border-4 border-dashed rounded-full animate-spin "
        style={{ borderColor: "goldenrod transparent" }}
      ></div>
    );

  //AI helped create the divs as usual
  return (
    <div className="bg-[#FFF7E0] min-h-screen flex flex-col items-center justify-center p-6">
      {/* At end of Quiz */}
      {showScore ? (
        <>
          <h1 className="text-4xl font-bold text-[#5C3D2E] my-8">
            {quiz.title}
          </h1>
          <div className="text-3xl text-[#C9A567]">
            You scored{" "}
            {
              userAnswers.filter(
                (answer, idx) => answer === quiz.questions[idx].answer
              ).length
            }{" "}
            out of {quiz.questions.length}
          </div>
          <div className="review-answers">{renderAnswers()}</div>
          <button
            onClick={() => navigate(returnPath)}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Return to Plan
          </button>
        </>
      ) : (
        <>
          {/* During Quiz */}
          <div className="text-center text-2xl font-bold py-2">
            Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </div>
          <h1 className="text-4xl font-bold text-[#5C3D2E] mt-10 mb-8">
            {quiz.title}
          </h1>
          <div className="text-2xl text-[#5C3D2E] mb-4">
            {quiz.questions[currentQuestion].question}
            <div className="flex flex-col">
              {quiz.questions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option, currentQuestion)}
                  className="text-lg font-semibold py-2 px-4 rounded bg-[#D4AF37] hover:bg-[#C9A567] text-[#1A365D] my-2"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            {currentQuestion > 0 && (
              <button
                onClick={() => navigateToNextPrev(currentQuestion - 1)}
                className="bg-[#D4AF37] text-white py-2 px-6 rounded hover:bg-[#C9A567] mx-2 transition-colors"
              >
                Previous
              </button>
            )}
            {currentQuestion < quiz.questions.length - 1 ? (
              <button
                onClick={() => navigateToNextPrev(currentQuestion + 1)}
                className="bg-[#D4AF37] text-white py-2 px-6 rounded hover:bg-[#C9A567] mx-2 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowScore(true);
                  pause();
                }}
                className="bg-[#D4AF37] text-white py-2 px-6 rounded hover:bg-[#C9A567] mx-2 transition-colors"
              >
                Complete Quiz
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
