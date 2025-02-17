import React from "react";

const Scoreboard = ({ score }) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl mb-4">Quiz Completed</h2>
      <p className="text-xl mb-4">Your Score: {score}</p>
      <button
        onClick={() => window.location.reload()}
        className="bg-green-500 text-white p-3 rounded-lg"
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default Scoreboard;
