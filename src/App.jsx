import React, { useState, useEffect } from "react";
import Quiz from "./components/Quiz.jsx";
import Scoreboard from "./components/Scoreboard.jsx";
import { getQuizHistory, saveQuizResult } from "./components/IndexedDB.js";

const App = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);

  const startQuiz = () => {
    setQuizStarted(true);
    setQuizFinished(false);
    setScore(0);
  };

  const finishQuiz = (finalScore) => {
    setScore(finalScore);
    setQuizFinished(true);
    saveQuizResult(finalScore);
    loadQuizHistory();
  };

  const loadQuizHistory = async () => {
    try {
      const historyData = await getQuizHistory();
      setHistory(historyData);
    } catch (error) {
      console.error("Failed to load quiz history:", error);
    }
  };

  useEffect(() => {
    loadQuizHistory(); // Load history when component mounts
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {!quizStarted && !quizFinished ? (
          <div className="text-center">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to the Quiz Platform</h1>
            <p className="text-lg text-gray-700 mb-6">Test your knowledge with a fun quiz!</p>
            <button
              onClick={startQuiz}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg transition duration-300 hover:bg-blue-700 focus:outline-none"
            >
              Start Quiz
            </button>
          </div>
        ) : quizFinished ? (
          <Scoreboard score={score} />
        ) : (
          <Quiz finishQuiz={finishQuiz} />
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quiz Attempt History</h2>
        <div className="bg-white rounded-lg shadow p-4">
          {history.length > 0 ? (
            <ul className="space-y-2">
              {history.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span className="text-gray-700">Attempt {index + 1}:</span>
                  <span className="text-blue-500 font-semibold">Score: {item.score}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No quiz history available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
