import React, { useState, useEffect } from "react";

// Sample quiz questions
const questions = [
  {
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    answer: "Mercury",
  },
  {
    question: "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: "Queue",
  },
  {
    question: "Which of the following is primarily used for structuring web pages?",
    options: ["Python", "Java", "HTML", "C++"],
    answer: "HTML",
  },
  {
    question: "Which chemical symbol stands for Gold?",
    options: ["Au", "Gd", "Ag", "Pt"],
    answer: "Au",
  },
  {
    question: "Which of these processes is not typically involved in refining petroleum?",
    options: ["Fractional distillation", "Cracking", "Polymerization", "Filtration"],
    answer: "Filtration",
  },
  {
    question: "What is the value of 12 + 28?",
    answer: 40,
    inputType: "number"
  },
  {
    question: "How many states are there in the United States?",
    answer: 50,
    inputType: "number"
  },
  {
    question: "In which year was the Declaration of Independence signed?",
    answer: 1776,
    inputType: "number"
  },
  {
    question: "What is the value of pi rounded to the nearest integer?",
    answer: 3,
    inputType: "number"
  },
  {
    question: "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
    answer: 120,
    inputType: "number"
  }
];

const Quiz = ({ finishQuiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0 && !answerSubmitted) {
        setTimeLeft(timeLeft - 1);
      } else if (timeLeft === 0 && !answerSubmitted) {
        handleNextQuestion();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, answerSubmitted]);

  const handleNextQuestion = () => {
    const correctAnswer = questions[currentQuestionIndex].answer;
    
    let isAnswerCorrect = false;
  
    // Handle number-type answers
    if (questions[currentQuestionIndex].inputType === "number") {
      const numericAnswer = parseFloat(selectedAnswer); // Convert input to a number
      
      // Check if input is a valid number and compare
      if (!isNaN(numericAnswer)) {
        isAnswerCorrect = numericAnswer === correctAnswer; // Compare as numbers
      } else {
        isAnswerCorrect = false; // Invalid input should be treated as incorrect
      }
    } else {
      // For MCQ, compare as string (normal behavior for options)
      isAnswerCorrect = selectedAnswer === correctAnswer;
    }
  
    if (isAnswerCorrect) {
      setScore(score + 1); // Increment score on correct answer
    }
  
    setAnswerSubmitted(true); // Disable the button after submitting the answer
  
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to next question
        setTimeLeft(30); // Reset timer for next question
        setSelectedAnswer(""); // Reset selected answer
        setAnswerSubmitted(false); // Enable answering for the next question
      } else {
        finishQuiz(score); // Finish quiz when all questions are answered
      }
    }, 1000); // Wait before moving to the next question
  };
  

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
      {currentQuestionIndex < questions.length ? (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">{questions[currentQuestionIndex].question}</h2>
          <div className="mb-6">
            {questions[currentQuestionIndex].inputType === "number" ? (
              <input
                type="number"
                value={selectedAnswer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg text-xl mb-4"
                placeholder="Enter your answer"
              />
            ) : (
              questions[currentQuestionIndex].options.map((option, index) => (
                <div key={index} className="mb-4 flex items-center">
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    checked={selectedAnswer === option}
                    className="mr-4"
                  />
                  <label className="text-lg">{option}</label>
                </div>
              ))
            )}
          </div>

          <div className="mb-4 flex justify-between items-center">
            <p className="text-xl text-gray-600">Time left: {timeLeft}s</p>
            <button
              onClick={handleNextQuestion}
              disabled={!selectedAnswer || answerSubmitted}
              className={`bg-blue-500 text-white py-2 px-6 rounded-lg ${!selectedAnswer || answerSubmitted ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            </button>
          </div>

          {answerSubmitted && (
            <div className="mt-4 text-center">
              {selectedAnswer == questions[currentQuestionIndex].answer ? (
                <p className="text-green-500 font-semibold">Correct!</p>
              ) : (
                <p className="text-red-500 font-semibold">Incorrect! The correct answer was: {questions[currentQuestionIndex].answer}</p>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Quiz Finished!</h2>
          <p className="text-2xl mb-6">Your score: <span className="text-green-500">{score} / {questions.length}</span></p>
          <button
            onClick={() => finishQuiz(score)}
            className="bg-green-500 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-green-600"
          >
            Finish Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
